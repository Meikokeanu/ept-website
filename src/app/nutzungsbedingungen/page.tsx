import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen | EPT",
  description: "Nutzungsbedingungen von EPT.",
};

export default function Page() {
  return (
    <LegalPage title="Nutzungsbedingungen">
      <LegalDocument doc="terms" />
    </LegalPage>
  );
}
