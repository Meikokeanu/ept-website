const steps = [
  {
    number: "1",
    title: "Account erstellen",
    text: "Melde dich an und gib deine Grundübungen an. EPT berechnet deinen Startrang.",
  },
  {
    number: "2",
    title: "Plan wählen oder eigenen erstellen",
    text: "4 fertige Trainingspläne oder eigene Pläne mit deinen Übungen.",
  },
  {
    number: "3",
    title: "Trainieren und aufsteigen",
    text: "Logge deine Sätze, sammle Punkte und steige im Rang auf. Gegen niemanden außer dich selbst.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
        In 3 Schritten loslegen
      </h2>

      <div className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-3 md:gap-8">
        {steps.map(function (step) {
          return (
            <div key={step.number} className="text-center md:text-left">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink text-lg font-bold text-brand md:mx-0">
                {step.number}
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
