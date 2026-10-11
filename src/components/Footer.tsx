import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-start md:justify-between md:px-8">
        <div>
          <p className="text-xl font-bold text-on-dark">EPT</p>
          <p className="mt-2 max-w-sm text-sm text-footer-muted">
            © 2026 Meiko Klingele. Alle Rechte vorbehalten.
          </p>
        </div>

        <nav
          className="flex flex-col gap-3 text-sm md:flex-row md:items-center md:gap-6"
          aria-label="Rechtliches"
        >
          <Link
            href="/datenschutz"
            className="text-footer-muted transition-colors hover:text-on-dark"
          >
            Datenschutz
          </Link>
          <Link
            href="/nutzungsbedingungen"
            className="text-footer-muted transition-colors hover:text-on-dark"
          >
            Nutzungsbedingungen
          </Link>
          <Link
            href="/impressum"
            className="text-footer-muted transition-colors hover:text-on-dark"
          >
            Impressum
          </Link>
          <a
            href="mailto:ept.dev@outlook.de"
            className="text-footer-muted transition-colors hover:text-on-dark"
          >
            Kontakt
          </a>
        </nav>
      </div>
    </footer>
  );
}
