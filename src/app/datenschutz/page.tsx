import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | EPT",
  description: "Datenschutzerklärung von EPT.",
};

export default function Page() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <LegalDocument doc="privacy" />
    </LegalPage>
  );
}
