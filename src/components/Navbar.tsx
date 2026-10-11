"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-brand/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-ink md:text-3xl"
          onClick={closeMenu}
        >
          EPT
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href="/#download"
            className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-brand transition-opacity hover:opacity-90"
          >
            App herunterladen
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink md:hidden"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={function () {
            setOpen(!open);
          }}
        >
          {open ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-ink/5 bg-brand px-5 py-4 md:hidden">
          <a
            href="/#download"
            className="block rounded-lg bg-ink px-5 py-3 text-center text-sm font-medium text-brand"
            onClick={closeMenu}
          >
            App herunterladen
          </a>
        </div>
      ) : null}
    </header>
  );
}
