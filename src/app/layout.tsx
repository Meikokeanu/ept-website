import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const archivo = localFont({
  src: "../fonts/Archivo-var.woff",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const description =
  "Der Trainingstracker fürs Gym mit Rangsystem. Du trittst nur gegen dich selbst an: Jeder Satz bringt Punkte, jeder Rekord bringt dich im Rang nach oben.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ept-performance.de"),
  title: "EPT | Outperform Yourself",
  description: description,
  openGraph: {
    title: "EPT | Outperform Yourself",
    description: description,
    url: "https://ept-performance.de",
    siteName: "EPT",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "EPT. Outperform Yourself.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EPT | Outperform Yourself",
    description: description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#EDE8E3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={archivo.variable + " h-full antialiased"}>
      <body className="min-h-full flex flex-col bg-brand font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
