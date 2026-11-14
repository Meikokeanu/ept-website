"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { SEASONS } from "./data";
import { StatusBar } from "./Phone";
import { useReducedMotion } from "./hooks";

export default function Designs() {
  const [active, setActive] = useState(0);
  const season = SEASONS[active];
  const cardsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const node = cardsRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--rx", (-y * 10).toFixed(2) + "deg");
    node.style.setProperty("--ry", (x * 14).toFixed(2) + "deg");
  }

  function onLeave() {
    const node = cardsRef.current;
    if (!node) return;
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
  }

  return (
    <section
      id="designs"
      className={"designs" + (season.dark ? " is-dark" : "")}
      aria-labelledby="designs-title"
      style={
        {
          "--s-bg": season.bg,
          "--s-ink": season.ink,
          "--s-muted": season.muted,
          "--s-accent": season.accent,
        } as CSSProperties
      }
    >
      <div className="wrap designs__grid">
        <div className="designs__copy">
          <h2 id="designs-title" className="h2">
            Training darf auch gut aussehen.
          </h2>
          <p className="lead">
            Die ganze App im Look der Jahreszeit und zwölf Designs für deine
            EPT Card. Alles liegt in deinem Spind.
          </p>
          <div className="seg" role="group" aria-label="Design auswählen">
            {SEASONS.map(function (s, i) {
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={i === active}
                  className={"seg__btn" + (i === active ? " is-active" : "")}
                  onClick={function () {
                    setActive(i);
                  }}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="designs__phone" aria-live="polite">
          <div className={"phone phone--" + (season.dark ? "dark" : "light")}>
            <div className="phone__screen">
              {SEASONS.map(function (s, i) {
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={s.id}
                    src={s.screen}
                    alt={i === active ? "EPT Startseite im Design " + s.name : ""}
                    width={780}
                    height={1688}
                    loading="lazy"
                    decoding="async"
                    className={"designs__screen" + (i === active ? " is-active" : "")}
                  />
                );
              })}
              <StatusBar />
              <span className="phone__island" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="designs__cards">
          <div
            ref={cardsRef}
            className="cards"
            onPointerMove={onMove}
            onPointerLeave={onLeave}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/screens/card-winter.webp"
              alt="EPT Card im Design Winter Arc"
              width={1068}
              height={764}
              loading="lazy"
              className="cards__card cards__card--back"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/screens/card-thunder.webp"
              alt="EPT Card im Design Thunder mit Rang, Bestwerten und Streak"
              width={1068}
              height={764}
              loading="lazy"
              className="cards__card cards__card--front"
            />
          </div>
          <p className="designs__caption">
            Deine EPT Card zeigt Rang, Bestwerte und Streak. Ein Tipp und sie
            ist in deiner Story.
          </p>
        </div>
      </div>
    </section>
  );
}
