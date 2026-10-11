import AppStoreBadge from "@/components/AppStoreBadge";

export default function DownloadCta() {
  return (
    <section id="download" className="bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center md:px-8 md:py-28">
        <h2 className="text-2xl font-bold tracking-tight text-on-dark sm:text-3xl md:text-4xl">
          Bereit, dich selbst zu übertreffen?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base text-on-dark/80">
          EPT ist bald im App Store verfügbar.
        </p>
        <div className="mt-8 flex justify-center">
          <AppStoreBadge href="#" inverted />
        </div>
        <p className="mt-6 text-sm text-footer-muted">
          Für iOS. Android kommt später.
        </p>
      </div>
    </section>
  );
}
