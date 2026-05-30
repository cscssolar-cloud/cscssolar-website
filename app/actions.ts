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

// Verified-domain sender. Override per-environment with RESEND_FROM_EMAIL if needed.
const DEFAULT_FROM = "CSCS Solar <noreply@cscssolar.com>";

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

async function deliverQuoteEmail(fields: QuoteFields): Promise<{
  delivered: boolean;
  reason?: string;
}> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { delivered: false, reason: "RESEND_API_KEY not set" };
  }

  const from = process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM;
  const bcc = process.env.RESEND_BCC_EMAIL;
  const resend = new Resend(apiKey);
  const { text, html } = buildEmailContent(fields);

  const result = await resend.emails.send({
    from,
    to: [TO_ADDRESS],
    bcc: bcc ? [bcc] : undefined,
    replyTo: fields.email,
    subject: `New quote request — ${fields.name}${fields.company ? ` (${fields.company})` : ""}`,
    text,
    html,
  });

  if (result.error) {
    throw new Error(`Resend send failed: ${result.error.message}`);
  }

  return { delivered: true };
}

export async function submitQuote(
  _prevState: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  // Honeypot — bots tend to fill every field
  const honeypot = (formData.get("website") as string | null)?.trim();
  if (honeypot) {
    return { status: "success", message: "Thanks — we'll be in touch." };
  }

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

  // Structured audit log — printed for EVERY valid submission, before delivery.
  // Captured in Vercel runtime logs. Guarantees the lead is recoverable even
  // if Resend later returns an error, the inbox is misconfigured, or the
  // recipient mailbox bounces.
  const auditId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  console.log(
    JSON.stringify({
      tag: "cscs.quote.received",
      auditId,
      receivedAt: new Date().toISOString(),
      fields,
    }),
  );

  let deliveryReason: string | undefined;
  try {
    const result = await deliverQuoteEmail(fields);
    if (result.delivered) {
      console.log(
        JSON.stringify({
          tag: "cscs.quote.delivered",
          auditId,
          to: TO_ADDRESS,
        }),
      );
    } else {
      deliveryReason = result.reason;
      console.warn(
        JSON.stringify({
          tag: "cscs.quote.undelivered",
          auditId,
          reason: result.reason,
        }),
      );
    }
  } catch (err) {
    console.error(
      JSON.stringify({
        tag: "cscs.quote.delivery_failed",
        auditId,
        error: err instanceof Error ? err.message : String(err),
      }),
    );
    return {
      status: "error",
      message:
        "Something went wrong sending your request. Please call (559) 722-1800 or email info@cscssolar.com — we have your details and will follow up.",
    };
  }

  // Lead is in the audit log even if delivery quietly failed (no API key).
  // We still report success to the customer because the lead is recoverable
  // server-side; failing the UX would just frustrate them.
  if (deliveryReason) {
    // No-op intentional — already logged above.
  }

  return {
    status: "success",
    message:
      "Thanks — we received your request. A CSCS team member will reply within one business day.",
  };
}
