import Phone from "./Phone";
import { StoreButton } from "./Brand";

function Notification({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  return (
    <div className={"notif " + className} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="notif__icon" src="/apple-icon.png" alt="" width={40} height={40} />
      <div className="notif__body">
        <div className="notif__head">
          <span>EPT</span>
          <span className="notif__when">jetzt</span>
        </div>
        <p className="notif__text">{text}</p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">
              <span>Outperform</span>
            </span>
            <span className="hero__line">
              <span>Yourself.</span>
            </span>
          </h1>
          <p className="hero__lead">
            Der Trainingstracker fürs Gym, bei dem du nur gegen einen antrittst:
            dich selbst. Jeder Satz bringt Punkte, jeder Rekord bringt dich im
            Rang nach oben.
          </p>
          <div className="hero__actions">
            <StoreButton />
            <a href="#raenge" className="hero__more">
              Zum Rangsystem
            </a>
          </div>
        </div>

        <div className="hero__stage">
          <Phone
            src="/screens/stats-dark.webp"
            alt="EPT Statistiken mit dem Rang Grinder 3"
            tone="dark"
            className="hero__phone hero__phone--back"
            eager
          />
          <Phone
            src="/screens/home-light.webp"
            alt="EPT Startseite mit Wochenübersicht und letzten Workouts"
            tone="light"
            className="hero__phone hero__phone--front"
            eager
          />
          <Notification text="Neuer PR: Bankdrücken 100 kg." className="notif--one" />
          <Notification text="Du bist jetzt Grinder 2." className="notif--two" />
        </div>
      </div>
    </section>
  );
}
