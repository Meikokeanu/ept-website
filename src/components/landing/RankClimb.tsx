"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { RANKS, TIERS, tierOf, formatNumber, POINT_RULES } from "./data";
import { useInView, useReducedMotion } from "./hooks";

const EXAMPLE = [
  { label: "20 Arbeitssätze", points: 20 },
  { label: "Training abgeschlossen", points: 10 },
  { label: "12.000 kg Volumen", points: 48 },
  { label: "2 Übungen mit mehr Gewicht", points: 20 },
  { label: "Neuer Rekord beim Rudern", points: 25 },
];

const STEP_MS = 1500;

function rangeLabel(index: number): string {
  const rank = RANKS[index];
  const next = RANKS[index + 1];
  if (!next) return "ab " + formatNumber(rank.min) + " Punkte";
  return formatNumber(rank.min) + " bis " + formatNumber(next.min - 1) + " Punkte";
}

export default function RankClimb() {
  const stageRef = useRef<HTMLDivElement>(null);
  const seen = useInView(stageRef, 0.45);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);

  // Plays the climb once from Lifter to GOAT when the section comes into view.
  useEffect(
    function () {
      if (!seen || !auto || reduced) return;
      if (index >= RANKS.length - 1) {
        setAuto(false);
        return;
      }
      const id = window.setTimeout(function () {
        setIndex(index + 1);
      }, index === 0 ? 900 : STEP_MS);
      return function () {
        window.clearTimeout(id);
      };
    },
    [seen, auto, reduced, index],
  );

  function pick(i: number) {
    setAuto(false);
    setIndex(Math.max(0, Math.min(RANKS.length - 1, i)));
  }

  const rank = RANKS[index];
  const tier = tierOf(rank);
  const tierIndex = TIERS.indexOf(tier);
  const exampleTotal = EXAMPLE.reduce(function (sum, row) {
    return sum + row.points;
  }, 0);

  return (
    <section
      id="raenge"
      className="climb"
      aria-labelledby="climb-title"
      style={{ "--glow": tier.glow } as CSSProperties}
    >
      <div className="climb__stagewrap">
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
            <ul className="climb__tiers">
              {TIERS.map(function (t, i) {
                const state =
                  i < tierIndex ? " is-past" : i === tierIndex ? " is-active" : "";
                const first = RANKS.findIndex(function (r) {
                  return r.tier === t.name;
                });
                return (
                  <li key={t.name} style={{ "--tier": t.glow } as CSSProperties}>
                    <button
                      type="button"
                      className={"climb__tier" + state}
                      aria-pressed={i === tierIndex}
                      onClick={function () {
                        pick(first);
                      }}
                    >
                      <span className="climb__tier-name">{t.name}</span>
                      <span className="climb__tier-min">
                        {t.min === 0 ? "ab 0" : "ab " + formatNumber(t.min)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div ref={stageRef} className="climb__stage">
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
              <button
                type="button"
                className="climb__arrow climb__arrow--prev"
                aria-label="Vorheriger Rang"
                disabled={index === 0}
                onClick={function () {
                  pick(index - 1);
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M12.5 4l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                className="climb__arrow climb__arrow--next"
                aria-label="Nächster Rang"
                disabled={index === RANKS.length - 1}
                onClick={function () {
                  pick(index + 1);
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M7.5 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <p className="climb__name" aria-live="polite">
              {rank.name}
            </p>
            <p className="climb__points">{rangeLabel(index)}</p>
            <div className="climb__strip" role="group" aria-label="Rang auswählen">
              {RANKS.map(function (r, i) {
                return (
                  <button
                    key={r.id}
                    type="button"
                    className={"climb__mini" + (i === index ? " is-active" : i < index ? " is-past" : "")}
                    aria-label={r.name}
                    aria-pressed={i === index}
                    onClick={function () {
                      pick(i);
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={"/ranks/sm/" + r.id + ".webp"} alt="" width={240} height={240} loading="lazy" />
                  </button>
                );
              })}
            </div>
          </div>
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
