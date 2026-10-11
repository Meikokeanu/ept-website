import AppStoreBadge from "@/components/AppStoreBadge";
import PhoneMockup from "@/components/PhoneMockup";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 md:px-8 md:pt-24 md:pb-16">
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.1]">
            Outperform yourself.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
            Die Gym Tracking App mit Ranking System. Tritt gegen dich selbst an
            — nicht gegen andere.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <AppStoreBadge href="#" />
            <a
              href="#features"
              className="text-sm font-medium text-ink underline-offset-4 transition-opacity hover:underline hover:opacity-70"
            >
              Mehr erfahren
            </a>
          </div>
        </div>

        <div className="flex-shrink-0">
          <PhoneMockup label="Screenshot" />
        </div>
      </div>

      <div className="mt-16 border-t border-ink/10 md:mt-20" />
    </section>
  );
}
