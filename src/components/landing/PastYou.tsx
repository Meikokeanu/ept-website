"use client";

import { useEffect, useRef, useState } from "react";
import { GhostIcon } from "./Brand";
import { useInView, useReducedMotion } from "./hooks";

const ROWS = [
  { name: "Seitheben am Kabel", from: "9 × 9", to: "14 × 7 pro Seite", pct: 48 },
  { name: "Wadenheben sitzend", from: "100 × 10", to: "113 × 10", pct: 13 },
  { name: "Beinbeuger sitzend", from: "59 × 6", to: "59 × 8", pct: 6 },
];

function useCountUp(target: number, run: boolean, duration = 1400): number {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(
    function () {
      if (!run) return;
      if (reduced) {
        setValue(target);
        return;
      }
      let frame = 0;
      const start = performance.now();
      function step(now: number) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(target * eased));
        if (t < 1) frame = requestAnimationFrame(step);
      }
      frame = requestAnimationFrame(step);
      return function () {
        cancelAnimationFrame(frame);
      };
    },
    [run, target, duration, reduced],
  );
  return value;
}

function Row({ row, run, delay }: { row: (typeof ROWS)[number]; run: boolean; delay: number }) {
  const [go, setGo] = useState(false);
  useEffect(
    function () {
      if (!run) return;
      const id = window.setTimeout(function () {
        setGo(true);
      }, delay);
      return function () {
        window.clearTimeout(id);
      };
    },
    [run, delay],
  );
  const value = useCountUp(row.pct, go);
  return (
    <li className="vj__row">
      <div>
        <p className="vj__name">{row.name}</p>
        <p className="vj__sets">
          {row.from} <span aria-hidden="true">→</span>
          <span className="sr-only"> auf </span> {row.to}
        </p>
      </div>
      <div className="vj__gain">
        <p className="vj__pct">+{value} %</p>
        <p className="vj__since">seit Beginn</p>
      </div>
    </li>
  );
}

export default function PastYou() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, 0.35);

  return (
    <section id="past-you" className="pastyou" aria-labelledby="pastyou-title">
      <div className="wrap pastyou__grid">
        <div className="pastyou__copy">
          <h2 id="pastyou-title" className="h2">
            Dein früheres Ich hat die Messlatte gelegt.
          </h2>
          <p className="lead">
            Nach jedem Training siehst du genau, wo du stärker geworden bist.
            Nicht im Vergleich zu irgendwem, sondern zu dir vor ein paar Wochen.
          </p>
        </div>

        <div ref={ref} className={"vj" + (seen ? " is-seen" : "")}>
          <p className="vj__label">Vorher und jetzt</p>
          <ul className="vj__list">
            {ROWS.map(function (row, i) {
              return <Row key={row.name} row={row} run={seen} delay={i * 220} />;
            })}
          </ul>
        </div>

        <div className="ghost">
          <div className="ghost__row" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/screens/ex-butterfly.webp"
              alt=""
              width={120}
              height={120}
              className="ghost__thumb"
              loading="lazy"
            />
            <div className="ghost__ex">
              <p className="ghost__ex-name">Butterfly (Maschine)</p>
              <p className="ghost__ex-muscle">Mittlere Brust</p>
            </div>
            <span className="ghost__pill">
              <GhostIcon size={16} />
              +8 %
            </span>
          </div>
          <h3 className="ghost__title">Ghost Mode</h3>
          <p className="ghost__text">
            Mitten im Training trittst du live gegen deine letzte Einheit an.
            Liegst du vorne, zeigt dir der Ghost um wie viel. Liegst du hinten,
            sagt er nichts. Du sollst trainieren, nicht dich schlecht fühlen.
          </p>
        </div>
      </div>
    </section>
  );
}
