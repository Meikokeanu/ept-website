import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Impressum | EPT",
  description: "Impressum von EPT.",
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <p>
        Meiko Klingele
        <br />
        Bornstraße 13
        <br />
        12163 Berlin
        <br />
        Deutschland
      </p>
      <p>
        E-Mail:{" "}
        <a
          href="mailto:ept.dev@outlook.de"
          className="text-ink underline underline-offset-2 hover:opacity-70"
        >
          ept.dev@outlook.de
        </a>
      </p>
    </LegalPage>
  );
}
