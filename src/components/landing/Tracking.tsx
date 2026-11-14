"use client";

import { useEffect, useState } from "react";
import { GhostIcon } from "./Brand";

type SetRow = { last: string; kg: string; reps: string; heavier?: boolean };

const SETS: SetRow[] = [
  { last: "80 x 6", kg: "80", reps: "6" },
  { last: "80 x 6", kg: "80", reps: "6" },
  { last: "80 x 6", kg: "82,5", reps: "6", heavier: true },
];

const REST = 120;

function clock(seconds: number): string {
  const s = Math.max(0, seconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m + ":" + (r < 10 ? "0" : "") + r;
}

function WorkoutDemo() {
  const [done, setDone] = useState<boolean[]>([false, false, false]);
  const [rest, setRest] = useState<number | null>(null);
  const [restTotal, setRestTotal] = useState(REST);
  const [elapsed, setElapsed] = useState(12 * 60 + 48);
  const [lastChecked, setLastChecked] = useState<number | null>(null);

  useEffect(function () {
    const id = window.setInterval(function () {
      setElapsed(function (e) {
        return e + 1;
      });
      setRest(function (r) {
        if (r === null) return null;
        return r <= 1 ? null : r - 1;
      });
    }, 1000);
    return function () {
      window.clearInterval(id);
    };
  }, []);

  function toggle(i: number) {
    const next = done.slice();
    next[i] = !next[i];
    setDone(next);
    if (next[i]) {
      setLastChecked(i);
      setRest(REST);
      setRestTotal(REST);
    } else {
      setLastChecked(null);
    }
  }

  function adjust(delta: number) {
    if (rest === null) return;
    const value = Math.max(5, rest + delta);
    setRest(value);
    setRestTotal(Math.max(restTotal, value));
  }

  const count = done.filter(Boolean).length;
  const heavierDone = done[2];
  const allDone = count === SETS.length;

  return (
    <div className="wo" role="group" aria-label="Beispiel: Sätze abhaken wie in der App">
      <div className="wo__top">
        <div>
          <p className="wo__title">Aktives Workout</p>
          <p className="wo__day">Tag 1</p>
          <p className="wo__meta">Dauer: {clock(elapsed)}</p>
          <p className="wo__meta">Fertig um 17:15</p>
        </div>
        <p className={"wo__score" + (count > 0 ? " is-on" : "")} aria-live="polite">
          +{count + (heavierDone ? 10 : 0)} <span>EPT</span>
        </p>
      </div>

      <div className="wo__ex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/screens/ex-incline.webp"
          alt=""
          width={120}
          height={120}
          className="wo__thumb"
          loading="lazy"
        />
        <div className="wo__ex-text">
          <p className="wo__ex-name">Schrägbankpresse (Maschine)</p>
          <p className="wo__ex-muscle">Obere Brust</p>
        </div>
        <span className={"wo__ghost" + (heavierDone ? " is-on" : "")} aria-hidden={!heavierDone}>
          <GhostIcon size={15} />
          +3 %
        </span>
      </div>

      <div className="wo__table">
        <div className="wo__head" aria-hidden="true">
          <span>Satz</span>
          <span>Letztes Mal</span>
          <span>kg</span>
          <span>Wdh</span>
          <span />
        </div>
        {SETS.map(function (set, i) {
          const on = done[i];
          return (
            <div key={i} className={"wo__row" + (on ? " is-done" : "")}>
              <span className="wo__n">{i + 1}</span>
              <span className="wo__last">{set.last}</span>
              <span className={"wo__cell" + (set.heavier ? " is-up" : "")}>{set.kg}</span>
              <span className="wo__cell">{set.reps}</span>
              <button
                type="button"
                className="wo__check"
                aria-pressed={on}
                aria-label={"Satz " + (i + 1) + (on ? " abgehakt" : " abhaken")}
                onClick={function () {
                  toggle(i);
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {on && lastChecked === i ? (
                  <span className="wo__plus" key={"p" + i + count}>
                    +1
                  </span>
                ) : null}
              </button>
            </div>
          );
        })}
      </div>

      <div className={"wo__note" + (allDone ? " is-on" : "")} aria-live="polite">
        {allDone
          ? "Satz 3 mit mehr Gewicht als letztes Mal. +10 Punkte."
          : count === 0
            ? "Tipp auf die Kreise und hak deine Sätze ab."
            : "Pausentimer läuft. Nächster Satz kommt."}
      </div>

      <div className={"wo__timer" + (rest !== null ? " is-on" : "")} aria-hidden={rest === null}>
        <button type="button" className="wo__adj" onClick={function () { adjust(-15); }} tabIndex={rest === null ? -1 : 0}>
          −15
        </button>
        <div className="wo__bar">
          <span className="wo__time">{clock(rest ?? 0)}</span>
          <span
            className="wo__fill"
            style={{ transform: "scaleX(" + (rest === null ? 0 : rest / restTotal) + ")" }}
          />
        </div>
        <button type="button" className="wo__adj" onClick={function () { adjust(15); }} tabIndex={rest === null ? -1 : 0}>
          +15
        </button>
      </div>
    </div>
  );
}

const FACTS = [
  {
    title: "Letztes Mal steht immer daneben",
    text: "Gewicht und Wiederholungen aus deiner letzten Einheit sind schon eingetragen. Gleich geblieben? Ein Tipp.",
  },
  {
    title: "Der Pausentimer startet von selbst",
    text: "Mit Ton, Vibration und einer Mitteilung, falls dein Handy in der Tasche ist.",
  },
  {
    title: "Fertig um 17:15",
    text: "EPT rechnet mit und sagt dir, wann du durch bist. Praktisch, wenn danach noch was ansteht.",
  },
];

export default function Tracking() {
  return (
    <section id="tracking" className="tracking" aria-labelledby="tracking-title">
      <div className="wrap tracking__grid">
        <div className="tracking__copy">
          <h2 id="tracking-title" className="h2">
            <span className="h2__line">Satz eintragen.</span>
            <span className="h2__line">Haken dran.</span>
            <span className="h2__line">Weiter.</span>
          </h2>
          <p className="lead">
            Du bist zum Trainieren im Gym, nicht zum Tippen. Deshalb kostet
            ein Satz in EPT genau einen Tipp.
          </p>
          <ul className="facts">
            {FACTS.map(function (fact) {
              return (
                <li key={fact.title} className="facts__item">
                  <p className="facts__title">{fact.title}</p>
                  <p className="facts__text">{fact.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <WorkoutDemo />
      </div>
    </section>
  );
}
