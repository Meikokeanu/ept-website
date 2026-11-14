"use client";

import { useRef, type CSSProperties } from "react";
import { RANKS, TIERS, tierOf, formatNumber, POINT_RULES } from "./data";
import { useStickyProgress } from "./hooks";

const EXAMPLE = [
  { label: "20 Arbeitssätze", points: 20 },
  { label: "Training abgeschlossen", points: 10 },
  { label: "12.000 kg Volumen", points: 48 },
  { label: "2 Übungen mit mehr Gewicht", points: 20 },
  { label: "Neuer Rekord beim Rudern", points: 25 },
];

export default function RankClimb() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = useStickyProgress(trackRef);

  const steps = RANKS.length;
  const f = Math.min(steps - 0.0001, progress * steps);
  const index = Math.floor(f);
  const rank = RANKS[index];
  const next = RANKS[index + 1];
  const tier = tierOf(rank);
  const points = next ? rank.min + (f - index) * (next.min - rank.min) : rank.min;
  const tierIndex = TIERS.indexOf(tier);
  const exampleTotal = EXAMPLE.reduce(function (sum, row) {
    return sum + row.points;
  }, 0);

  return (
    <section id="raenge" className="climb" aria-labelledby="climb-title">
      <div
        ref={trackRef}
        className="climb__track"
        style={{ "--glow": tier.glow } as CSSProperties}
      >
        <div className="climb__sticky">
          <div className="climb__glow" aria-hidden="true" />
          <div className="climb__grid wrap">
            <div className="climb__copy">
              <h2 id="climb-title" className="climb__title">
                15 Ränge. Kein einziger ist kaufbar.
              </h2>
              <p className="climb__lead">
                Punkte gibt es nur für echtes Training. Für jeden Satz, jede
                Steigerung, jeden neuen Rekord. Vom Lifter bis zum GOAT.
              </p>
              <ol className="climb__tiers">
                {TIERS.map(function (t, i) {
                  const state =
                    i < tierIndex ? " is-past" : i === tierIndex ? " is-active" : "";
                  return (
                    <li
                      key={t.name}
                      className={"climb__tier" + state}
                      style={{ "--tier": t.glow } as CSSProperties}
                    >
                      <span className="climb__tier-name">{t.name}</span>
                      <span className="climb__tier-min">
                        {t.min === 0 ? "ab 0" : "ab " + formatNumber(t.min)}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="climb__stage" aria-live="polite">
              <div className="climb__badges">
                {RANKS.map(function (r, i) {
                  const state = i === index ? " is-active" : i < index ? " is-past" : "";
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={r.id}
                      className={"climb__badge" + state}
                      src={"/ranks/" + r.id + ".webp"}
                      alt={i === index ? "Rang Badge " + r.name : ""}
                      width={720}
                      height={720}
                      loading="lazy"
                      decoding="async"
                    />
                  );
                })}
                <span key={index} className="climb__pulse" aria-hidden="true" />
              </div>
              <p className="climb__name">{rank.name}</p>
              <p className="climb__points">
                <span className="climb__points-num">{formatNumber(points)}</span>
                {next ? " Punkte" : "+ Punkte"}
              </p>
              <div className="climb__ticks" aria-hidden="true">
                {RANKS.map(function (r, i) {
                  return (
                    <span
                      key={r.id}
                      className={"climb__tick" + (i <= index ? " is-on" : "")}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <p className={"climb__hint" + (progress > 0.03 ? " is-hidden" : "")} aria-hidden="true">
            Scroll weiter und steig auf
          </p>
        </div>
      </div>

      <div className="points wrap">
        <div className="points__rules">
          <h3 className="points__title">So sammelst du Punkte</h3>
          <p className="points__note">
            Nur Training zählt. Nicht das Öffnen der App, nicht deine Zeit am
            Handy und schon gar nicht dein Geld.
          </p>
          <ul className="points__list">
            {POINT_RULES.map(function (rule) {
              return (
                <li key={rule.label} className="points__row">
                  <span className="points__value">+{rule.points}</span>
                  <span className="points__label">{rule.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="receipt" aria-label="Beispielrechnung für ein Training">
          <p className="receipt__head">Ein ganz normaler Dienstag</p>
          <ul className="receipt__list">
            {EXAMPLE.map(function (row) {
              return (
                <li key={row.label} className="receipt__row">
                  <span>{row.label}</span>
                  <span className="receipt__pts">+{row.points}</span>
                </li>
              );
            })}
          </ul>
          <div className="receipt__total">
            <span>Punkte gesammelt</span>
            <span className="receipt__sum">+{exampleTotal} EPT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
