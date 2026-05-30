import Image from "next/image";
import { ArrowRightIcon, MailIcon, MapPinIcon, PhoneIcon } from "./icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-950 text-white/80">
      <div
        aria-hidden="true"
        className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-gold-500/[0.06] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 left-0 h-[420px] w-[420px] rounded-full bg-accent-400/[0.07] blur-3xl"
      />

      <section
        aria-label="Final call to action"
        className="relative border-b border-white/10"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-gold-400">Ready when you are</p>
              <h2 className="font-display mt-3 text-[1.75rem] uppercase leading-[1] text-white sm:text-[2.25rem] lg:text-[2.5rem]">
                Protect your solar investment.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">
                Get a no-pressure quote and a clear service schedule built for
                your facility.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#quote"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent-500 px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_28px_-10px_rgba(52,169,110,0.55)] transition-all hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-[0_14px_36px_-12px_rgba(52,169,110,0.7)]"
              >
                Request a Free Quote
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="tel:+15597221800"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/[0.03] px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-white/40 hover:bg-white/[0.07]"
              >
                <PhoneIcon className="h-4 w-4" />
                (559) 722-1800
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="logo-plate h-14 w-14 flex-none rounded-lg p-1.5 ring-1 ring-white/15">
                <Image
                  src="/logo.png"
                  alt="Commercial Solar Cleaning Services"
                  width={112}
                  height={112}
                  quality={95}
                  className="h-full w-full"
                  style={{ objectFit: "contain" }}
                />
              </span>
              <div className="leading-tight">
                <p className="font-display text-[14px] uppercase tracking-[0.06em] text-white">
                  Commercial Solar
                </p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
                  Cleaning Services
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-white/70">
              Eco-friendly DI water cleaning for businesses and public agencies
              across the Central Valley.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-2 pr-4">
              <span className="logo-plate h-8 w-8 flex-none rounded p-0.5">
                <Image
                  src="/fcrta-logo.png"
                  alt="Fresno County Rural Transit Agency"
                  width={64}
                  height={64}
                  quality={95}
                  className="h-full w-full"
                  style={{ objectFit: "contain" }}
                />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/85">
                Trusted by FCRTA
              </span>
            </div>
          </div>

          <FooterCol
            heading="Company"
            links={[
              { href: "#services", label: "Services" },
              { href: "#why", label: "Why Clean" },
              { href: "#process", label: "Our Process" },
              { href: "#service-area", label: "Service Areas" },
              { href: "#quote", label: "Free Quote" },
            ]}
          />

          <FooterCol
            heading="Service Area"
            links={[
              { href: "#service-area", label: "Fresno · Clovis" },
              { href: "#service-area", label: "Madera · Merced" },
              { href: "#service-area", label: "Visalia · Tulare" },
              { href: "#service-area", label: "Hanford · Bakersfield" },
              { href: "#service-area", label: "Central Valley" },
            ]}
          />

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-[13px]">
              <li className="flex items-start gap-2.5">
                <PhoneIcon className="mt-0.5 h-4 w-4 text-accent-300" />
                <a className="hover:text-white" href="tel:+15597221800">
                  (559) 722-1800
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MailIcon className="mt-0.5 h-4 w-4 text-accent-300" />
                <a className="hover:text-white" href="mailto:info@cscssolar.com">
                  info@cscssolar.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 text-accent-300" />
                <span>Fresno, CA — Central Valley</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Commercial Solar Cleaning Services
            (CSCS). All rights reserved.
          </p>
          <p>Insured &amp; OSHA-trained · COI &amp; W-9 available on request</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  heading,
  links,
}: {
  heading: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
        {heading}
      </h3>
      <ul className="mt-4 space-y-2.5 text-[13px]">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
