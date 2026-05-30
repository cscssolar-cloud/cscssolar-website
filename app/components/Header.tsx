"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MenuIcon, PhoneIcon, XIcon } from "./icons";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Clean" },
  { href: "#process", label: "Process" },
  { href: "#service-area", label: "Service Areas" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85"
          : "border-b border-transparent bg-white"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:h-[88px] sm:px-6 lg:px-8">
        <a
          href="#top"
          aria-label="Commercial Solar Cleaning Services — home"
          className="group flex items-center gap-3.5"
        >
          <span className="logo-plate h-14 w-14 flex-none rounded-lg p-1 ring-1 ring-line sm:h-[60px] sm:w-[60px]">
            <Image
              src="/logo.png"
              alt="Commercial Solar Cleaning Services"
              width={120}
              height={120}
              priority
              quality={95}
              className="h-full w-full"
              style={{ objectFit: "contain" }}
            />
          </span>
          <span className="hidden flex-col leading-[1.05] sm:flex">
            <span className="font-display text-[16px] uppercase tracking-[0.05em] text-brand-600">
              Commercial Solar
            </span>
            <span className="font-display mt-1 text-[12px] uppercase tracking-[0.14em] text-accent-600">
              Cleaning Services
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-brand-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="tel:+15597221800"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 transition-colors hover:text-brand-700"
          >
            <PhoneIcon className="h-4 w-4" />
            (559) 722-1800
          </a>
          <a
            href="#quote"
            className="inline-flex items-center justify-center rounded-md bg-accent-500 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_4px_14px_-4px_rgba(52,169,110,0.5)] transition-all hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-[0_8px_20px_-6px_rgba(52,169,110,0.6)]"
          >
            Free Quote
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-cream lg:hidden"
        >
          {open ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <nav
            aria-label="Mobile"
            className="mx-auto max-w-7xl px-4 py-3 sm:px-6"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-[15px] font-semibold uppercase tracking-[0.08em] text-ink hover:text-brand-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-col gap-3 border-t border-line pt-4 pb-2">
              <a
                href="tel:+15597221800"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-600"
              >
                <PhoneIcon className="h-4 w-4" />
                (559) 722-1800
              </a>
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-md bg-accent-500 px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
              >
                Request a Free Quote
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
