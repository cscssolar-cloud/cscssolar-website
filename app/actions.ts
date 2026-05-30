"use server";

import { Resend } from "resend";

export type QuoteState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<QuoteField, string>>;
};

type QuoteField =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "address"
  | "systemSize"
  | "message";

type QuoteFields = Record<QuoteField, string>;

const REQUIRED: QuoteField[] = ["name", "email", "phone", "address"];

// Where leads land.
const TO_ADDRESS = "info@cscssolar.com";

// Verified-domain sender.
const DEFAULT_FROM = "CSCS Solar <noreply@cscssolar.com>";

// User-facing copy — kept in one place so success/failure messages are honest.
const MSG_SUCCESS =
  "Thanks — we received your request. A CSCS team member will reply within one business day.";
const MSG_DELIVERY_FAILED =
  "We could not send your request right now. Please call (559) 722-1800 or email info@cscssolar.com so we can help.";
const MSG_UNEXPECTED_ERROR =
  "Something went wrong on our end. Please call (559) 722-1800 or email info@cscssolar.com so we can help.";

// One-shot boot log so we can confirm the running container's env at process start.
// Module-level so it fires exactly once per cold start, not per request.
console.log(
  JSON.stringify({
    tag: "cscs.boot.env_check",
    nodeEnv: process.env.NODE_ENV,
    hasResendApiKey: !!process.env.RESEND_API_KEY,
    hasResendBccEmail: !!process.env.RESEND_BCC_EMAIL,
    bootAt: new Date().toISOString(),
  }),
);

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escapeHtml(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Sensitive-value masking. Logs prefix + length only, never the secret.
function maskApiKey(key: string | undefined): string {
  if (!key) return "(empty)";
  if (key.length < 8) return `(too-short, len=${key.length})`;
  return `${key.slice(0, 4)}…${key.slice(-3)} (len=${key.length})`;
}

function sanitizeDeliveryError(err: unknown) {
  const raw = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
  const apiKey = process.env.RESEND_API_KEY;

  return apiKey ? raw.replaceAll(apiKey, "[redacted]") : raw;
}

function buildEmailContent(fields: QuoteFields) {
  const rows: Array<[string, string]> = [
    ["Name", fields.name],
    ["Company / Agency", fields.company || "—"],
    ["Email", fields.email],
    ["Phone", fields.phone],
    ["Facility address or city", fields.address],
    ["Approximate system size", fields.systemSize || "—"],
    ["Notes", fields.message || "—"],
  ];

  const text = [
    "New quote request from cscssolar.com",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    `Received: ${new Date().toISOString()}`,
    "",
    "Reply directly to this email to respond to the customer.",
  ].join("\n");

  const html = `
<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e8ecf1;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:#0b5ed7;padding:20px 28px;">
              <p style="margin:0;color:#ffe082;font-size:11px;letter-spacing:0.22em;font-weight:700;text-transform:uppercase;">New quote request</p>
              <p style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:700;">cscssolar.com</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${rows
                  .map(
                    ([k, v]) => `
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef1f5;vertical-align:top;width:38%;color:#475569;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">${escapeHtml(k)}</td>
                    <td style="padding:10px 0;border-bottom:1px solid #eef1f5;vertical-align:top;color:#0f172a;font-size:14px;line-height:1.5;">${escapeHtml(v).replace(/\n/g, "<br />")}</td>
                  </tr>`,
                  )
                  .join("")}
              </table>
              <p style="margin:24px 0 0;font-size:12px;color:#475569;">Received ${escapeHtml(new Date().toUTCString())} — reply directly to this email to respond to the customer.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

  return { text, html };
}

type DeliveryResult =
  | { delivered: true; resendId: string | undefined }
  | { delivered: false; reason: string };

async function deliverQuoteEmail(
  fields: QuoteFields,
  auditId: string,
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const bccEnv = process.env.RESEND_BCC_EMAIL;

  console.log(`RESEND_API_KEY present ${!!apiKey}`);

  // Forensic diagnostic — printed for every submission. Safe in production:
  // API key is masked, the other values are non-secret configuration.
  console.log(
    JSON.stringify({
      tag: "cscs.quote.delivery_diagnostic",
      auditId,
      nodeEnv: process.env.NODE_ENV,
      hasApiKey: !!apiKey,
      apiKeyShape: maskApiKey(apiKey),
      from: DEFAULT_FROM,
      to: TO_ADDRESS,
      bccConfigured: !!bccEnv,
    }),
  );

  if (!apiKey) {
    const reason = "RESEND_API_KEY missing at runtime";
    console.log(`CSCS RESEND FAILURE ${reason}`);
    return {
      delivered: false,
      reason,
    };
  }

  const resend = new Resend(apiKey);
  const { text, html } = buildEmailContent(fields);

  console.log("CSCS RESEND START");
  let response;
  try {
    response = await resend.emails.send({
      from: DEFAULT_FROM,
      to: [TO_ADDRESS],
      bcc: bccEnv ? [bccEnv] : undefined,
      replyTo: fields.email,
      subject: `New quote request — ${fields.name}${fields.company ? ` (${fields.company})` : ""}`,
      text,
      html,
    });
  } catch (err) {
    const sanitized = sanitizeDeliveryError(err);
    console.log(`CSCS RESEND FAILURE ${sanitized}`);
    return {
      delivered: false,
      reason: `Resend SDK threw: ${sanitized}`,
    };
  }

  if (response.error) {
    const sanitized = sanitizeDeliveryError(
      `${response.error.name ?? "unknown"} — ${response.error.message ?? "(no message)"}`,
    );
    console.log(`CSCS RESEND FAILURE ${sanitized}`);
    return {
      delivered: false,
      reason: `Resend API error: ${sanitized}`,
    };
  }

  const sendId = response.data?.id ?? "(no id)";
  console.log(`CSCS RESEND SUCCESS id=${sendId}`);

  return {
    delivered: true,
    resendId: response.data?.id,
  };
}

export async function submitQuote(
  _prevState: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  console.log("CSCS FORM START");

  const fields: QuoteFields = {
    name: ((formData.get("name") as string) ?? "").trim(),
    company: ((formData.get("company") as string) ?? "").trim(),
    email: ((formData.get("email") as string) ?? "").trim(),
    phone: ((formData.get("phone") as string) ?? "").trim(),
    address: ((formData.get("address") as string) ?? "").trim(),
    systemSize: ((formData.get("systemSize") as string) ?? "").trim(),
    message: ((formData.get("message") as string) ?? "").trim(),
  };

  const fieldErrors: Partial<Record<QuoteField, string>> = {};
  for (const key of REQUIRED) {
    if (!fields[key]) fieldErrors[key] = "Required";
  }
  if (fields.email && !isValidEmail(fields.email)) {
    fieldErrors.email = "Please enter a valid email";
  }
  if (fields.phone && fields.phone.replace(/\D/g, "").length < 7) {
    fieldErrors.phone = "Please enter a valid phone";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and resubmit.",
      fieldErrors,
    };
  }

  // Correlation ID only; do not log lead details in production.
  const auditId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  console.log(
    JSON.stringify({
      tag: "cscs.quote.received",
      auditId,
      receivedAt: new Date().toISOString(),
    }),
  );

  let result: DeliveryResult;
  try {
    result = await deliverQuoteEmail(fields, auditId);
  } catch (err) {
    // Reserved for genuinely unexpected JS errors (out-of-memory, programming bug,
    // module import failure). Delivery function handles its own known errors.
    console.error(
      JSON.stringify({
        tag: "cscs.quote.delivery_failed",
        auditId,
        error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
        stack: err instanceof Error ? err.stack : undefined,
      }),
    );
    return { status: "error", message: MSG_UNEXPECTED_ERROR };
  }

  if (result.delivered) {
    console.log(
      JSON.stringify({
        tag: "cscs.quote.delivered",
        auditId,
        resendId: result.resendId ?? null,
        to: TO_ADDRESS,
      }),
    );
    return { status: "success", message: MSG_SUCCESS };
  }

  // Delivery did not happen. Tell the customer truthfully.
  console.error(
    JSON.stringify({
      tag: "cscs.quote.undelivered",
      auditId,
      reason: result.reason,
    }),
  );
  return { status: "error", message: MSG_DELIVERY_FAILED };
}
