import PhoneMockup from "@/components/PhoneMockup";

const features = [
  {
    label: "TRACKING",
    title: "Ein Satz. Ein Tap.",
    text: "Gewicht und Wiederholungen sind vom letzten Training vorausgefüllt. Keine Änderung nötig? Ein Tap auf den Haken — fertig. Anpassungen über Stepper oder Numpad in Sekunden.",
    phoneSide: "right" as const,
  },
  {
    label: "PROGRESS",
    title: "Persönliche Rekorde. Automatisch erkannt.",
    text: "EPT erkennt neue PRs sofort beim Abhaken. Im Training dezent markiert, nach dem Training groß gefeiert. Dein Fortschritt, sichtbar gemacht.",
    phoneSide: "left" as const,
  },
  {
    label: "TIMER",
    title: "Pausentimer. Läuft auch im Hintergrund.",
    text: "Startet automatisch nach jedem Satz. Kompakte Anzeige, kein Vollbild-Timer. Push-Benachrichtigung wenn die Pause vorbei ist — auch bei geschlossener App.",
    phoneSide: "right" as const,
  },
  {
    label: "STATISTIKEN",
    title: "Dein Fortschritt. Schwarz auf Weiß.",
    text: "Progress Graph pro Übung, Lifetime Stats, monatliche Übersicht. Alles auf einen Blick im Stats Tab.",
    phoneSide: "left" as const,
  },
  {
    label: "KÖRPER",
    title: "Dokumentiere deine Veränderung.",
    text: "Gewichtstracker und Form Updates pro Übung. Sieh dir an, wie sich dein Körper und deine Technik über Monate entwickeln.",
    phoneSide: "right" as const,
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24"
    >
      <h2 className="mx-auto max-w-2xl text-center text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
        Alles was du brauchst. Nichts was dich ablenkt.
      </h2>

      <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28">
        {features.map(function (feature) {
          const phoneLeft = feature.phoneSide === "left";

          return (
            <div
              key={feature.label}
              className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16"
            >
              <div
                className={
                  "order-2 flex-1 text-center lg:text-left " +
                  (phoneLeft ? "lg:order-2" : "lg:order-1")
                }
              >
                <p className="text-xs font-semibold tracking-[0.15em] text-accent-gold">
                  {feature.label}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {feature.title}
                </h3>
                <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted lg:mx-0">
                  {feature.text}
                </p>
              </div>

              <div
                className={
                  "order-1 flex-shrink-0 " +
                  (phoneLeft ? "lg:order-1" : "lg:order-2")
                }
              >
                <PhoneMockup label={feature.label} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
