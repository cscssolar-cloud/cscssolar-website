import Image from "next/image";
import { ArrowRightIcon, CheckIcon } from "./icons";

const HERO_BULLETS = [
  "Eco-friendly deionized water — zero chemicals",
  "Insured & OSHA-trained crews",
  "Photo report after every visit",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-brand-950 text-white"
    >
      {/* Full-bleed hero photograph — the visual anchor of the homepage */}
      <Image
        src="/hero-solar-cleaning.jpg"
        alt="CSCS technician cleaning a commercial rooftop solar array with a soft-bristle deionized-water brush in California's Central Valley"
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Cinematic dark-navy gradient overlay.
          Mobile: uniform dark wash so text reads cleanly on top of the photo.
          Desktop: dark on the left, fades to clear photo on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,23,56,0.86)_0%,rgba(5,38,84,0.78)_100%)] sm:bg-[linear-gradient(98deg,rgba(3,23,56,0.96)_0%,rgba(5,38,84,0.9)_38%,rgba(7,56,128,0.55)_60%,rgba(11,75,165,0.15)_84%,transparent_100%)]"
      />

      {/* Soft architectural grid — barely-there premium texture */}
      <div className="absolute inset-0 hero-grid opacity-50" aria-hidden="true" />

      {/* Content sits in the left "stage" carved out by the gradient */}
      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32 lg:px-8 lg:pt-32 lg:pb-40">
        <div className="max-w-xl lg:max-w-2xl">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 backdrop-blur-sm">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400"
              aria-hidden="true"
            />
            <span className="eyebrow text-white/90">
              Central Valley · Commercial Specialists
            </span>
          </div>

          <h1 className="font-display mt-7 text-[2.25rem] uppercase leading-[0.95] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.25)] sm:text-[3rem] lg:text-[3.75rem]">
            Commercial Solar
            <br />
            Panel Cleaning
          </h1>

          <p className="font-display mt-5 text-lg uppercase tracking-tight text-accent-300 sm:text-xl lg:text-[1.625rem]">
            for Businesses &amp; Public Agencies
          </p>

          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-base">
            Professional solar cleaning for commercial facilities, transit
            agencies, schools, warehouses, and public infrastructure throughout
            California&apos;s Central Valley.
          </p>

          <ul className="mt-7 space-y-2.5">
            {HERO_BULLETS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-[14px] text-white/90 sm:text-[15px]"
              >
                <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-400 text-brand-900">
                  <CheckIcon className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#quote"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent-500 px-7 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_10px_32px_-10px_rgba(52,169,110,0.65)] transition-all hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-[0_16px_40px_-12px_rgba(52,169,110,0.75)]"
            >
              Request a Free Quote
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-white/85 transition-colors hover:text-white sm:px-2"
            >
              View Services
              <ArrowRightIcon className="h-4 w-4 opacity-60" />
            </a>
          </div>

          <div className="mt-12 inline-flex items-center gap-4 rounded-xl border border-white/15 bg-brand-950/40 p-3 pr-5 backdrop-blur-md">
            <span className="logo-plate h-11 w-11 flex-none rounded-md p-1.5 ring-1 ring-white/20 sm:h-12 sm:w-12">
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
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-400">
                Trusted by
              </p>
              <p className="mt-0.5 text-sm font-semibold text-white">
                Fresno County Rural Transit Agency
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="brand-stripe relative h-1 w-full" aria-hidden="true" />
    </section>
  );
}
