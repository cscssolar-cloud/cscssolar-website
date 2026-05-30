import Image from "next/image";

export function TrustedBy() {
  return (
    <section aria-labelledby="trusted-heading" className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col items-center gap-7 text-center sm:flex-row sm:items-center sm:gap-10 sm:text-left">
          <span className="logo-plate h-20 w-20 flex-none rounded-xl p-2 ring-1 ring-line/80 sm:h-24 sm:w-24">
            <Image
              src="/fcrta-logo.png"
              alt="Fresno County Rural Transit Agency"
              width={160}
              height={160}
              quality={95}
              className="h-full w-full"
              style={{ objectFit: "contain" }}
            />
          </span>
          <div className="flex-1">
            <p className="eyebrow text-brand-600">Trusted by</p>
            <h2
              id="trusted-heading"
              className="font-display mt-2 text-xl uppercase leading-tight text-ink sm:text-2xl"
            >
              Fresno County Rural Transit Agency
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              Scheduled deionized-water cleaning, on-site safety compliance, and
              documented service across FCRTA&apos;s rural transit facilities.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto h-px max-w-5xl bg-line/80" aria-hidden="true" />
    </section>
  );
}
