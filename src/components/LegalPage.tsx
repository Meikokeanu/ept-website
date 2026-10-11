import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-5 py-16 md:px-8 md:py-24">
        <article className="mx-auto max-w-[800px]">
          <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            {title}
          </h1>
          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
