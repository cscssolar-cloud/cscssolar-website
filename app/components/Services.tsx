import {
  BoltIcon,
  DropletIcon,
  ShieldCheckIcon,
  SolarPanelIcon,
} from "./icons";
import type { ComponentType, SVGProps } from "react";

type Service = {
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const SERVICES: Service[] = [
  {
    title: "Commercial Rooftop Cleaning",
    description:
      "Safe, insured rooftop access for warehouses, depots, and office campuses — soft-brush DI water rinse, zero residue.",
    Icon: SolarPanelIcon,
  },
  {
    title: "Ground-Mount & Carport Arrays",
    description:
      "High-reach pure-water systems clean ground arrays and solar carports without ladders on glass.",
    Icon: BoltIcon,
  },
  {
    title: "Public Agency Maintenance",
    description:
      "Procurement-friendly contracts for transit agencies, school districts, and county facilities — COI & W-9 ready.",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Eco-Friendly DI Water Cleaning",
    description:
      "0 PPM purified water lifts dust, pollen, and bird residue — no detergents, no runoff, no warranty risk.",
    Icon: DropletIcon,
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-white"
    >
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand-600">What we do</p>
          <h2
            id="services-heading"
            className="font-display mt-3 text-[1.875rem] uppercase leading-[1] text-ink sm:text-[2.25rem] lg:text-[2.625rem]"
          >
            Solar cleaning,
            <span className="text-accent-600"> done right.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
            Chemical-free cleaning and clear reporting — for single rooftops and
            multi-site agency fleets across the Central Valley.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:gap-x-14">
          {SERVICES.map(({ title, description, Icon }) => (
            <li
              key={title}
              className="group relative flex gap-5"
            >
              <span
                aria-hidden="true"
                className="relative inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-all group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600"
              >
                <Icon className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-[17px] uppercase text-ink sm:text-[18px]">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-soft sm:text-[15px]">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto h-px max-w-7xl bg-line/80" aria-hidden="true" />
    </section>
  );
}
