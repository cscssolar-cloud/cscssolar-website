import { BoltIcon, ChartIcon, ShieldCheckIcon, SunIcon } from "./icons";
import type { ComponentType, SVGProps } from "react";

type Reason = {
  title: string;
  body: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const REASONS: Reason[] = [
  {
    title: "Prevent Dirt Buildup & Energy Loss",
    body: "Central Valley dust, pollen, and ag-film can drop solar output 15–25%. Routine cleaning keeps every kilowatt-hour working.",
    Icon: BoltIcon,
  },
  {
    title: "Protect Your Solar Investment",
    body: "Soft-bristle DI water cleaning preserves anti-reflective coatings and panel warranties — no chemicals, no abrasion.",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Recover ROI On Every Array",
    body: "Cleaner panels recover yield fast. We document the work so finance and facility teams can see what came back.",
    Icon: ChartIcon,
  },
  {
    title: "Extend Useful System Life",
    body: "Soiling accelerates hot-spotting and module wear. Scheduled service keeps your asset performing for decades.",
    Icon: SunIcon,
  },
];

export function WhyClean() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="relative overflow-hidden bg-brand-950 text-white"
    >
      <div
        aria-hidden="true"
        className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-gold-500/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 left-0 h-[420px] w-[420px] rounded-full bg-accent-400/[0.09] blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold-400">Why it matters</p>
          <h2
            id="why-heading"
            className="font-display mt-3 text-[1.875rem] uppercase leading-[1] text-white sm:text-[2.25rem] lg:text-[2.625rem]"
          >
            Dirty panels lose money —
            <span className="text-accent-300"> every sunny day.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-base">
            Routine cleaning protects the asset you paid to install. Here&apos;s
            what regular service actually does.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:gap-x-14">
          {REASONS.map(({ title, body, Icon }) => (
            <li key={title} className="group flex gap-5">
              <span
                aria-hidden="true"
                className="relative inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-white/[0.06] text-accent-300 ring-1 ring-white/10 transition-all group-hover:bg-accent-400 group-hover:text-brand-900 group-hover:ring-accent-400/60"
              >
                <Icon className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-[17px] uppercase text-white sm:text-[18px]">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/75 sm:text-[15px]">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
