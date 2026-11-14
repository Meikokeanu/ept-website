"use client";

import { useRef, type CSSProperties } from "react";
import { useScrollThrough } from "./hooks";

const TEXT =
  "Andere Apps vergleichen dich mit Leuten, die anders trainieren, anders leben und woanders angefangen haben. EPT vergleicht dich nur mit einer Person: dir von letzter Woche.";

export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const progress = useScrollThrough(ref, 0.8, 0.35);
  const words = TEXT.split(" ");

  return (
    <section className="statement" aria-labelledby="statement-title">
      <div className="wrap">
        <h2 id="statement-title" className="statement__title">
          Kein Leaderboard. Kein Feed. Nur du.
        </h2>
        <p
          ref={ref}
          className="statement__text"
          style={{ "--p": progress, "--n": words.length } as CSSProperties}
        >
          {words.map(function (word, index) {
            return (
              <span
                key={index}
                className="statement__word"
                style={{ "--i": index } as CSSProperties}
              >
                {word}{" "}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
