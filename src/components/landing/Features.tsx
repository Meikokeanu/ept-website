import type { ReactNode } from "react";
import Phone from "./Phone";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="feat__icon"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const ITEMS = [
  {
    title: "Über 100 Übungen",
    text: "Jede mit eigener Abbildung. Fehlt dir eine, legst du sie selbst an.",
    icon: (
      <Icon>
        <path d="M6.5 7v10M17.5 7v10M3.5 9.5v5M20.5 9.5v5M6.5 12h11" />
      </Icon>
    ),
  },
  {
    title: "Trainingspläne",
    text: "Fertig wie Push Pull Legs oder Upper Lower. Oder du baust dir deinen eigenen.",
    icon: (
      <Icon>
        <rect x="4" y="5" width="16" height="15" rx="3" />
        <path d="M8 3v4M16 3v4M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01" />
      </Icon>
    ),
  },
  {
    title: "Pausentimer",
    text: "Startet von selbst, mit Ton, Vibration und deiner eigenen Standardzeit.",
    icon: (
      <Icon>
        <circle cx="12" cy="13" r="7.5" />
        <path d="M12 9.5V13l2.5 1.5M10 2.5h4" />
      </Icon>
    ),
  },
  {
    title: "Energielevel",
    text: "Eine kurze Frage vor dem Training. Im Kalender siehst du, wie du dich im Schnitt gefühlt hast.",
    icon: (
      <Icon>
        <path d="M13 2.5L5 13.5h6l-1 8 8-11h-6l1-8z" />
      </Icon>
    ),
  },
  {
    title: "Auszeit",
    text: "Krank, verletzt oder im Urlaub? Streak und Erinnerungen pausieren, bis du zurück bist.",
    icon: (
      <Icon>
        <rect x="6" y="5" width="4" height="14" rx="1.5" />
        <rect x="14" y="5" width="4" height="14" rx="1.5" />
      </Icon>
    ),
  },
  {
    title: "Rekorde und Verlauf",
    text: "Jede Einheit und jeder PR, jederzeit wieder zu finden.",
    icon: (
      <Icon>
        <path d="M7 4h10v4a5 5 0 0 1-10 0V4zM7 6H4.5a2.5 2.5 0 0 0 2.6 3.4M17 6h2.5a2.5 2.5 0 0 1-2.6 3.4M12 13v4M8.5 20.5h7" />
      </Icon>
    ),
  },
  {
    title: "Hell und dunkel",
    text: "Light oder Dark Mode, ganz wie du trainierst.",
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" />
      </Icon>
    ),
  },
  {
    title: "Deine Daten bleiben bei dir",
    text: "Gespeichert in der EU. Nie verkauft und nie für Werbung genutzt.",
    icon: (
      <Icon>
        <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </Icon>
    ),
  },
];

export default function Features() {
  return (
    <section className="features" aria-labelledby="features-title">
      <div className="wrap features__grid">
        <div className="features__side">
          <h2 id="features-title" className="h2">
            Und alles, was dein Training sonst noch braucht.
          </h2>
          <Phone
            src="/screens/exercises.webp"
            alt="EPT Übungsliste mit Abbildungen, Muskelgruppe und Gerät"
            className="features__phone"
          />
        </div>
        <ul className="feat">
          {ITEMS.map(function (item) {
            return (
              <li key={item.title} className="feat__item">
                {item.icon}
                <h3 className="feat__title">{item.title}</h3>
                <p className="feat__text">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
