"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "./Brand";

const LINKS = [
  { href: "/#raenge", label: "Ränge" },
  { href: "/#past-you", label: "Past You" },
  { href: "/#tracking", label: "Tracking" },
  { href: "/#designs", label: "Designs" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(function () {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return function () {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function close() {
    setOpen(false);
  }

  return (
    <header
      className={
        "nav" + (scrolled ? " nav--scrolled" : "") + (open ? " nav--open" : "")
      }
    >
      <div className="nav__bar">
        <Link href="/" className="nav__brand" onClick={close} aria-label="EPT Startseite">
          <Wordmark />
        </Link>

        <nav className="nav__links" aria-label="Bereiche">
          {LINKS.map(function (link) {
            return (
              <a key={link.href} href={link.href} className="nav__link">
                {link.label}
              </a>
            );
          })}
        </nav>

        <a href="/#download" className="nav__cta">
          Bald im App Store
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={function () {
            setOpen(!open);
          }}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="nav__sheet" hidden={!open}>
        {LINKS.map(function (link) {
          return (
            <a key={link.href} href={link.href} className="nav__sheet-link" onClick={close}>
              {link.label}
            </a>
          );
        })}
        <a href="/#download" className="nav__sheet-cta" onClick={close}>
          Bald im App Store
        </a>
      </div>
    </header>
  );
}
