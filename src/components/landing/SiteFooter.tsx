import Link from "next/link";
import { Wordmark } from "./Brand";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <Wordmark className="footer__mark" />
          <p className="footer__claim">Outperform Yourself.</p>
        </div>
        <nav className="footer__links" aria-label="Rechtliches">
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/nutzungsbedingungen">Nutzungsbedingungen</Link>
          <a href="mailto:ept.dev@outlook.de">Kontakt</a>
        </nav>
        <p className="footer__copy">© 2026 Meiko Klingele. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}
