import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | EPT",
  description: "Datenschutzerklärung von EPT.",
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <p>Inhalt wird noch eingefügt.</p>
    </LegalPage>
  );
}
