"use client";

import { useRef, type CSSProperties } from "react";
import { useScrollThrough } from "./hooks";

const TEXT =
  "Im Gym gibt es immer jemanden, der mehr drückt. Darum geht es nicht. Die einzige Frage ist, ob du mehr drückst als vor einem Monat. EPT zeigt dir die Antwort nach jedem Training.";

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
