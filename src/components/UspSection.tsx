const usps = [
  {
    icon: "🏆",
    title: "Dein eigenes Ranking",
    text: "15 Ränge von Lifter bis GOAT. Punkte gibt es nur für echtes Training — nicht für App-Nutzung.",
  },
  {
    icon: "📊",
    title: "vs. Past You",
    text: "Nach jedem Training siehst du, wie du dich im Vergleich zu dir selbst entwickelst. Woche, Monat und seit Tag 1.",
  },
  {
    icon: "🔥",
    title: "Streak",
    text: "Baue deinen Streak Woche für Woche auf. Meilensteine belohnen Konsistenz.",
  },
];

export default function UspSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <h2 className="mx-auto max-w-2xl text-center text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
        Kein Wettkampf gegen andere. Nur gegen dich selbst.
      </h2>

      <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-3 md:gap-8">
        {usps.map(function (usp) {
          return (
            <div
              key={usp.title}
              className="rounded-2xl bg-card px-6 py-8 shadow-sm"
            >
              <div className="text-3xl" aria-hidden="true">
                {usp.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">{usp.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {usp.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
