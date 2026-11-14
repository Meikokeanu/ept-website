"use client";

import { useRef, type CSSProperties } from "react";
import Phone from "./Phone";
import { useInView } from "./hooks";

type Cell = "none" | "train" | "pr" | "off" | "plan";

const WEEKS = 26;
const PLANNED = 3;
const MONTHS = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

// Deterministic, so server and client render the same grid.
function rand(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function buildGrid(): { cells: Cell[][]; months: { col: number; label: string }[] } {
  const firstMonday = new Date(2026, 5, 8);
  const cells: Cell[][] = [];
  const months: { col: number; label: string }[] = [];
  let lastMonth = -1;
  for (let w = 0; w < WEEKS; w++) {
    const monday = new Date(firstMonday);
    monday.setDate(firstMonday.getDate() + w * 7);
    if (monday.getMonth() !== lastMonth) {
      lastMonth = monday.getMonth();
      months.push({ col: w, label: MONTHS[lastMonth] });
    }
    const week: Cell[] = [];
    const planned = w >= WEEKS - PLANNED;
    const offWeek = w === 9;
    for (let d = 0; d < 7; d++) {
      const trainingDay = d === 0 || d === 2 || d === 4 || (d === 5 && rand(w * 3) > 0.55);
      if (planned) {
        week.push(trainingDay && d !== 5 ? "plan" : "none");
      } else if (offWeek) {
        week.push(d < 5 ? "off" : "none");
      } else if (trainingDay && rand(w * 7 + d) > 0.12) {
        week.push(rand(w * 11 + d * 5) > 0.74 ? "pr" : "train");
      } else {
        week.push("none");
      }
    }
    cells.push(week);
  }
  return { cells, months };
}

const GRID = buildGrid();
const DAYS = ["Mo", "", "Mi", "", "Fr", "", "So"];

function Heatmap() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, 0.35);
  return (
    <div ref={ref} className={"heat" + (seen ? " is-seen" : "")}>
      <div className="heat__months" aria-hidden="true">
        {GRID.months.map(function (m) {
          return (
            <span
              key={m.label}
              className={m.col < 10 ? "is-early" : undefined}
              style={{ "--col": m.col } as CSSProperties}
            >
              {m.label}
            </span>
          );
        })}
      </div>
      <div className="heat__body">
        <div className="heat__days" aria-hidden="true">
          {DAYS.map(function (d, i) {
            return <span key={i}>{d}</span>;
          })}
        </div>
        <div className="heat__grid" role="img" aria-label="Trainingskalender über ein halbes Jahr mit Trainings, Rekorden, einer Auszeit und geplanten Tagen">
          {GRID.cells.map(function (week, w) {
            return (
              <div key={w} className="heat__col" style={{ "--w": w } as CSSProperties}>
                {week.map(function (cell, d) {
                  return <span key={d} className={"heat__cell heat__cell--" + cell} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
      <ul className="heat__legend">
        <li><span className="heat__cell heat__cell--train" />Training</li>
        <li><span className="heat__cell heat__cell--pr" />Training mit PR</li>
        <li><span className="heat__cell heat__cell--off" />Auszeit</li>
        <li><span className="heat__cell heat__cell--plan" />Geplant</li>
      </ul>
    </div>
  );
}

export default function Progress() {
  return (
    <section className="progress" aria-labelledby="progress-title">
      <div className="wrap">
        <h2 id="progress-title" className="h2 progress__title">
          Jedes Training zählt. Und du siehst es.
        </h2>
        <div className="bento">
          <article className="tile tile--heat">
            <h3 className="tile__title">Dein Kalender</h3>
            <p className="tile__text">
              Jeder Trainingstag ein Feld. Gold heißt neuer Rekord. Krank oder im
              Urlaub? Dann nimmst du dir eine Auszeit und dein Streak bleibt stehen.
            </p>
            <Heatmap />
          </article>

          <article className="tile tile--phone">
            <h3 className="tile__title">Statistiken</h3>
            <p className="tile__text">
              Trainings, Volumen und Zeit pro Woche, pro Monat und pro
              Muskelgruppe.
            </p>
            <Phone
              src="/screens/progress-light.webp"
              alt="EPT Statistiken mit Wochenvergleich, Volumen und Trainingszeit"
              className="tile__phone"
            />
          </article>

          <article className="tile tile--streak">
            <p className="streak__num">
              12<span> Wochen</span>
            </p>
            <h3 className="tile__title">Streak in Wochen, nicht in Tagen</h3>
            <p className="tile__text">
              Du schaffst dein Wochenziel, dein Streak wächst. Ein Ruhetag macht
              nichts kaputt.
            </p>
          </article>

          <article className="tile tile--body">
            <div className="body__nums">
              <p className="body__now">82,4 kg</p>
              <p className="body__goal">Ziel 90 kg</p>
            </div>
            <div className="body__bar" aria-hidden="true">
              <span />
            </div>
            <h3 className="tile__title">Körper und Form</h3>
            <p className="tile__text">
              Gewicht mit Ziel und Verlauf, dazu Fotos und Videos deiner Form.
              Sichtbar nur für dich.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
