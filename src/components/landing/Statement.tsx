"use client";

import { useRef, type CSSProperties } from "react";
import { useScrollThrough } from "./hooks";

const TEXT =
  "Auf Social Media ist immer einer stärker. In EPT gibt es nur dich und deine Zahlen aus den letzten Einheiten. Gegen dich selbst zu gewinnen macht bei uns extrem viel Spaß.";

export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const progress = useScrollThrough(ref, 0.85, 0.55);
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
