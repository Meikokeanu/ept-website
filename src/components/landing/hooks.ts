"use client";

import { useEffect, useState, type RefObject } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(function () {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    function onChange() {
      setReduced(query.matches);
    }
    query.addEventListener("change", onChange);
    return function () {
      query.removeEventListener("change", onChange);
    };
  }, []);
  return reduced;
}

// True once the element has scrolled into view (stays true afterwards).
export function useInView(
  ref: RefObject<HTMLElement | null>,
  threshold = 0.3,
): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(
    function () {
      const node = ref.current;
      if (!node || seen) return;
      const observer = new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting) {
            setSeen(true);
            observer.disconnect();
          }
        },
        { threshold: threshold },
      );
      observer.observe(node);
      return function () {
        observer.disconnect();
      };
    },
    [ref, seen, threshold],
  );
  return seen;
}

// Progress 0..1 of a tall element scrolling past a sticky viewport.
// start: element top hits viewport top. end: element bottom hits viewport bottom.
export function useStickyProgress(ref: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);
  useEffect(
    function () {
      let frame = 0;
      function measure() {
        frame = 0;
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const span = rect.height - window.innerHeight;
        const value = span > 0 ? -rect.top / span : 0;
        setProgress(Math.min(1, Math.max(0, value)));
      }
      function onScroll() {
        if (!frame) frame = window.requestAnimationFrame(measure);
      }
      measure();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return function () {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (frame) window.cancelAnimationFrame(frame);
      };
    },
    [ref],
  );
  return progress;
}

// Progress 0..1 while an element travels through the viewport.
// 0 when its top reaches `startAt` (fraction of viewport height from top),
// 1 when its bottom reaches `endAt`.
export function useScrollThrough(
  ref: RefObject<HTMLElement | null>,
  startAt = 0.85,
  endAt = 0.45,
): number {
  const [progress, setProgress] = useState(0);
  useEffect(
    function () {
      let frame = 0;
      function measure() {
        frame = 0;
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = rect.top - vh * startAt;
        const total = rect.height + vh * (startAt - endAt);
        const value = total > 0 ? -start / total : 1;
        setProgress(Math.min(1, Math.max(0, value)));
      }
      function onScroll() {
        if (!frame) frame = window.requestAnimationFrame(measure);
      }
      measure();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return function () {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (frame) window.cancelAnimationFrame(frame);
      };
    },
    [ref, startAt, endAt],
  );
  return progress;
}
