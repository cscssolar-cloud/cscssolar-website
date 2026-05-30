import { MapPinIcon } from "./icons";

const PRIMARY = [
  "Fresno",
  "Clovis",
  "Madera",
  "Visalia",
  "Tulare",
  "Hanford",
  "Bakersfield",
  "Merced",
];

const SECONDARY = [
  "Selma",
  "Reedley",
  "Sanger",
  "Kingsburg",
  "Chowchilla",
  "Porterville",
];

export function ServiceArea() {
  return (
    <section
      id="service-area"
      aria-labelledby="area-heading"
      className="relative bg-cream"
    >
      <div className="absolute inset-0 soft-dots opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow text-brand-600">Service areas</p>
            <h2
              id="area-heading"
              className="font-display mt-3 text-[1.875rem] uppercase leading-[1] text-ink sm:text-[2.25rem] lg:text-[2.625rem]"
            >
              Serving the Central Valley.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Based in Fresno. Trucks rolling across the valley — from Merced to
              Bakersfield — for businesses and public agencies.
            </p>

            <p className="eyebrow mt-10 text-ink-soft">Primary cities</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
              {PRIMARY.map((city) => (
                <li
                  key={city}
                  className="flex items-center gap-2 text-[15px] font-semibold text-ink"
                >
                  <MapPinIcon className="h-4 w-4 flex-none text-accent-500" />
                  {city}
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-8 text-ink-soft">Also serving</p>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
              {SECONDARY.join(" · ")} · and surrounding Central Valley.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl bg-brand-950 p-8 text-white sm:p-10">
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gold-500/15 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-accent-400/10 blur-3xl"
              />
              <div className="relative">
                <p className="eyebrow text-gold-400">Outside our area?</p>
                <h3 className="font-display mt-3 text-[1.375rem] uppercase leading-tight text-white sm:text-[1.625rem]">
                  Multi-site &amp; agency routes welcome.
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-white/80 sm:text-[15px]">
                  We routinely travel for multi-facility contracts and agency
                  work. If your portfolio spans the valley, we can build a route
                  that fits.
                </p>
                <a
                  href="#quote"
                  className="group mt-7 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-accent-300 transition-colors hover:text-accent-200"
                >
                  Ask about your area
                  <span
                    className="inline-block transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
