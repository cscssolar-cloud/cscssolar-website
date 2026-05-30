"use client";

import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitQuote, type QuoteState } from "../actions";
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "./icons";

const INITIAL: QuoteState = { status: "idle", message: "" };

export function QuoteForm() {
  const [state, formAction] = useActionState(submitQuote, INITIAL);

  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="relative overflow-hidden bg-white"
    >
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow text-brand-600">Get a quote</p>
            <h2
              id="quote-heading"
              className="font-display mt-3 text-[1.875rem] uppercase leading-[1] text-ink sm:text-[2.25rem] lg:text-[2.625rem]"
            >
              Request a Free Quote
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Tell us about your facility — we&apos;ll reply within one business
              day with a scoped quote and the next available service window.
            </p>

            <ul className="mt-10 space-y-5">
              <ContactRow
                Icon={PhoneIcon}
                label="Phone"
                value="(559) 722-1800"
                href="tel:+15597221800"
              />
              <ContactRow
                Icon={MailIcon}
                label="Email"
                value="info@cscssolar.com"
                href="mailto:info@cscssolar.com"
              />
              <ContactRow
                Icon={MapPinIcon}
                label="Service hub"
                value="Fresno, CA — Central Valley"
              />
              <ContactRow
                Icon={ClockIcon}
                label="Response time"
                value="Within one business day"
              />
            </ul>

            <div className="mt-10 flex items-center gap-4 border-t border-line pt-6">
              <span className="logo-plate h-12 w-12 flex-none rounded-md p-1.5 ring-1 ring-line">
                <Image
                  src="/fcrta-logo.png"
                  alt="Fresno County Rural Transit Agency"
                  width={96}
                  height={96}
                  quality={95}
                  className="h-full w-full"
                  style={{ objectFit: "contain" }}
                />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-600">
                  Trusted by
                </p>
                <p className="mt-0.5 text-sm font-semibold text-ink">
                  Fresno County Rural Transit Agency
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              action={formAction}
              noValidate
              className="rounded-2xl bg-cream p-6 ring-1 ring-line sm:p-9"
            >
              <input
                type="text"
                name="cscs_form_aux_check"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute h-0 w-0 opacity-0"
              />

              <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                <Field
                  label="Full name"
                  name="name"
                  required
                  error={state.fieldErrors?.name}
                  autoComplete="name"
                />
                <Field
                  label="Company / Agency"
                  name="company"
                  autoComplete="organization"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  error={state.fieldErrors?.email}
                  autoComplete="email"
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  required
                  error={state.fieldErrors?.phone}
                  autoComplete="tel"
                />
                <Field
                  label="Facility address or city"
                  name="address"
                  required
                  error={state.fieldErrors?.address}
                  autoComplete="street-address"
                  className="sm:col-span-2"
                />
                <SelectField
                  label="Approximate system size"
                  name="systemSize"
                  className="sm:col-span-2"
                  options={[
                    { value: "", label: "Select a range" },
                    { value: "<25 kW", label: "Under 25 kW" },
                    { value: "25-100 kW", label: "25 – 100 kW" },
                    { value: "100-500 kW", label: "100 – 500 kW" },
                    { value: "500 kW - 1 MW", label: "500 kW – 1 MW" },
                    { value: "1 MW+", label: "1 MW or larger" },
                    { value: "Multi-site", label: "Multi-site / fleet" },
                    { value: "Unsure", label: "Not sure" },
                  ]}
                />
                <TextareaField
                  label="Tell us about your site"
                  name="message"
                  rows={4}
                  placeholder="Roof or ground mount, last cleaning, access notes, contracting requirements…"
                  className="sm:col-span-2"
                />
              </div>

              {state.status === "error" && state.message && (
                <p
                  role="alert"
                  className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
                >
                  {state.message}
                </p>
              )}
              {state.status === "success" && (
                <p
                  role="status"
                  className="mt-5 flex items-start gap-2 rounded-md border border-accent-200 bg-accent-50 px-4 py-3 text-sm font-medium text-accent-700"
                >
                  <CheckIcon
                    className="mt-0.5 h-4 w-4 flex-none"
                    strokeWidth={2.5}
                  />
                  {state.message}
                </p>
              )}

              <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-xs leading-relaxed text-ink-soft">
                  By submitting, you agree to be contacted by CSCS about your
                  request. We never sell your data.
                </p>
                <SubmitButton />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent-500 px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_28px_-10px_rgba(52,169,110,0.55)] transition-all hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-[0_14px_36px_-12px_rgba(52,169,110,0.7)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
    >
      {pending ? "Sending…" : "Request a Free Quote"}
      {!pending && (
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </button>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  className?: string;
};

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  autoComplete,
  className = "",
}: FieldProps) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[13px] font-semibold text-ink">
        {label}
        {required && <span className="ml-0.5 text-accent-600">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`mt-1.5 block w-full rounded-md border bg-white px-3.5 py-2.5 text-[14px] text-ink shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand-600 focus:outline-none ${
          error ? "border-red-300 focus:border-red-400" : "border-line"
        }`}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function TextareaField({
  label,
  name,
  rows = 4,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  className?: string;
}) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[13px] font-semibold text-ink">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="mt-1.5 block w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-[14px] text-ink shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand-600 focus:outline-none"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  className = "",
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  className?: string;
}) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[13px] font-semibold text-ink">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue=""
        className="mt-1.5 block w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-[14px] text-ink shadow-sm transition-colors focus:border-brand-600 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ContactRow({
  Icon,
  label,
  value,
  href,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  href?: string;
}) {
  const valueEl = href ? (
    <a className="text-ink transition-colors hover:text-brand-600" href={href}>
      {value}
    </a>
  ) : (
    <span className="text-ink">{value}</span>
  );
  return (
    <li className="flex items-start gap-3.5">
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100"
      >
        <Icon className="h-4 w-4" />
      </span>
      <span>
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-soft">
          {label}
        </span>
        <span className="mt-0.5 block text-[14px] font-semibold">
          {valueEl}
        </span>
      </span>
    </li>
  );
}
