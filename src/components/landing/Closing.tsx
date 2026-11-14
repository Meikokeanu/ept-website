import { StoreButton } from "./Brand";

export default function Closing() {
  return (
    <section id="download" className="closing" aria-labelledby="closing-title">
      <div className="closing__logo">
        <span className="closing__halo" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/app-icon.png" alt="EPT App Icon" width={480} height={480} loading="lazy" />
      </div>
      <div className="wrap closing__inner">
        <h2 id="closing-title" className="closing__title">
          Dein nächster Rekord wartet schon.
        </h2>
        <p className="closing__lead">
          EPT kommt bald in den App Store. Bis dahin wird trainiert.
        </p>
        <StoreButton variant="light" />
      </div>
    </section>
  );
}
