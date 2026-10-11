import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen | EPT",
  description: "Nutzungsbedingungen von EPT.",
};

export default function NutzungsbedingungenPage() {
  return (
    <LegalPage title="Nutzungsbedingungen">
      <p>Inhalt wird noch eingefügt.</p>
    </LegalPage>
  );
}
