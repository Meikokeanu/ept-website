import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Impressum | EPT",
  description: "Impressum von EPT.",
};

export default function Page() {
  return (
    <LegalPage title="Impressum">
      <LegalDocument doc="imprint" />
    </LegalPage>
  );
}
