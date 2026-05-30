import { DropletIcon, LeafIcon, ShieldCheckIcon } from "./icons";

const STEPS = [
  {
    n: "01",
    title: "Site walk & safety plan",
    body: "We review array layout, roof access, and fall-hazard zones before mobilizing. Every job gets a site-specific safety plan.",
  },
  {
    n: "02",
    title: "Pure-water setup",
    body: "Our trucks carry on-board deionization. Water exits at 0 PPM so the only thing left on your glass is sunlight.",
  },
  {
    n: "03",
    title: "Soft-bristle cleaning",
    body: "Telescopic carbon-fiber poles and module-safe brushes lift dust, pollen, ag-film, and bird residue — never touching coatings.",
  },
  {
    n: "04",
    title: "Inspection & report",
    body: "Every visit ends with documentation: photos, panel counts, soiling notes, and any equipment flags for your O&M team.",
  },
];

const PILLARS = [
  {
    Icon: DropletIcon,
    title: "Eco-Friendly DI Water",
    body: "0 PPM pure water dissolves dirt without chemicals or runoff.",
  },
  {
    Icon: ShieldCheckIcon,
    title: "Insured & OSHA-Trained",
    body: "General liability, workers' comp, documented fall-protection training.",
  },
  {
    Icon: LeafIcon,
    title: "Zero Chemical Runoff",
    body: "No soaps, no surfactants, no acids. Public-agency compliant.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative bg-white"
    >
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand-600">Our process</p>
          <h2
            id="process-heading"
            className="font-display mt-3 text-[1.875rem] uppercase leading-[1] text-ink sm:text-[2.25rem] lg:text-[2.625rem]"
          >
            Four steps. Same every visit.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
            A simple, documented process your facility team can count on —
            chemical-free, insured, and reported.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {STEPS.map((s) => (
            <li key={s.n}>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[2.75rem] leading-none text-accent-500 sm:text-[3.25rem]">
                  {s.n}
                </span>
                <span
                  className="h-px flex-1 translate-y-[-6px] bg-line"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-display mt-4 text-[15px] uppercase tracking-tight text-ink sm:text-[16px]">
                {s.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-line pt-12 sm:grid-cols-3">
          {PILLARS.map(({ Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-accent-50 text-accent-700 ring-1 ring-accent-100"
              >
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-[14px] uppercase tracking-tight text-ink">
                  {title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
