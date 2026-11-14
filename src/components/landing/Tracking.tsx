"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { StatusBar } from "./Phone";

type SetRow = { kg: number; reps: number };

const EXERCISES: { name: string; muscle: string; image: string; sets: SetRow[] }[] = [
  {
    name: "Butterfly (Maschine)",
    muscle: "Mittlere Brust",
    image: "/screens/ex-butterfly.webp",
    sets: [
      { kg: 100, reps: 8 },
      { kg: 100, reps: 6 },
      { kg: 100, reps: 5 },
    ],
  },
  {
    name: "Bauchmaschine",
    muscle: "Bauch",
    image: "/screens/ex-crunch.webp",
    sets: [
      { kg: 91, reps: 10 },
      { kg: 91, reps: 8 },
      { kg: 91, reps: 8 },
    ],
  },
];

const REST = 120;

function clock(seconds: number): string {
  const s = Math.max(0, seconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m + ":" + (r < 10 ? "0" : "") + r;
}

function duration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const r = seconds % 60;
  return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
}

// Fits the 390pt wide app screen into the phone frame at any size.
function useFitScale(ref: RefObject<HTMLDivElement | null>): number {
  const [scale, setScale] = useState(0.86);
  useEffect(
    function () {
      const node = ref.current;
      if (!node) return;
      const observer = new ResizeObserver(function (entries) {
        setScale(entries[0].contentRect.width / 390);
      });
      observer.observe(node);
      return function () {
        observer.disconnect();
      };
    },
    [ref],
  );
  return scale;
}

function WorkoutScreen() {
  const screenRef = useRef<HTMLDivElement>(null);
  const scale = useFitScale(screenRef);
  const [done, setDone] = useState<boolean[][]>([
    [false, false, false],
    [false, false, false],
  ]);
  const [rest, setRest] = useState<number | null>(null);
  const [restTotal, setRestTotal] = useState(REST);
  const [elapsed, setElapsed] = useState(7);

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

  function toggle(ex: number, i: number) {
    const next = done.map(function (row) {
      return row.slice();
    });
    next[ex][i] = !next[ex][i];
    setDone(next);
    if (next[ex][i]) {
      setRest(REST);
      setRestTotal(REST);
    }
  }

  function adjust(delta: number) {
    if (rest === null) return;
    const value = Math.max(5, rest + delta);
    setRest(value);
    setRestTotal(Math.max(restTotal, value));
  }

  const resting = rest !== null;

  return (
    <div ref={screenRef} className="phone__screen app">
      <div className="app__canvas" style={{ transform: "scale(" + scale + ")" }}>
        <div className="app__head">
          <p className="app__title">Aktives Workout</p>
          <p className="app__day">Tag 1</p>
          <p className="app__meta">Dauer: {duration(elapsed)}</p>
          <p className="app__meta">Fertig um 18:03</p>
          <div className="app__actions" aria-hidden="true">
            <span className="app__cancel">Abbrechen</span>
            <span className="app__finish">Workout beenden</span>
          </div>
        </div>

        <div className="app__list">
          {EXERCISES.map(function (ex, e) {
            return (
              <div key={ex.name} className="app__ex">
                <div className="app__ex-head">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ex.image} alt="" width={120} height={120} className="app__thumb" loading="lazy" />
                  <div className="app__ex-text">
                    <p className="app__ex-name">{ex.name}</p>
                    <p className="app__ex-muscle">{ex.muscle}</p>
                  </div>
                  <span className="app__dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                <div className="app__cols" aria-hidden="true">
                  <span>Satz</span>
                  <span>
                    Letztes
                    <br />
                    Mal
                  </span>
                  <span>kg</span>
                  <span>Wdh</span>
                  <span />
                </div>
                {ex.sets.map(function (set, i) {
                  const on = done[e][i];
                  return (
                    <div key={i} className={"app__row" + (on ? " is-done" : "")}>
                      <span className="app__n">{i + 1}</span>
                      <span className="app__last">
                        {set.kg} x {set.reps}
                      </span>
                      <span className="app__cell">{set.kg}</span>
                      <span className="app__cell">{set.reps}</span>
                      <button
                        type="button"
                        className="app__check"
                        aria-pressed={on}
                        aria-label={ex.name + ", Satz " + (i + 1) + (on ? " abgehakt" : " abhaken")}
                        onClick={function () {
                          toggle(e, i);
                        }}
                      >
                        {on ? (
                          <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
                            <path
                              d="M6 16l6 6L25 7"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <span className="app__ring" />
                        )}
                      </button>
                    </div>
                  );
                })}
                <p className="app__add" aria-hidden="true">
                  + Satz
                </p>
              </div>
            );
          })}
        </div>

        <div className={"app__timer" + (resting ? " is-on" : "")} aria-hidden={!resting}>
          <span className="app__time">{clock(rest ?? 0)}</span>
          <span className="app__bar">
            <span style={{ transform: "scaleX(" + (resting ? (rest ?? 0) / restTotal : 0) + ")" }} />
          </span>
          <button
            type="button"
            className="app__adj"
            tabIndex={resting ? 0 : -1}
            onClick={function () {
              adjust(-15);
            }}
          >
            -15
          </button>
          <button
            type="button"
            className="app__adj"
            tabIndex={resting ? 0 : -1}
            onClick={function () {
              adjust(15);
            }}
          >
            +15
          </button>
          <button
            type="button"
            className="app__close"
            tabIndex={resting ? 0 : -1}
            aria-label="Pausentimer schließen"
            onClick={function () {
              setRest(null);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      <StatusBar time="17:12" />
      <span className="phone__island" aria-hidden="true" />
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
    title: "Fertig um 18:03",
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
        <div className="tracking__demo">
          <div className="phone phone--light tracking__phone">
            <WorkoutScreen />
          </div>
          <p className="tracking__try">Probier es aus und hak einen Satz ab.</p>
        </div>
      </div>
    </section>
  );
}
