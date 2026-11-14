import type { ReactNode } from "react";
import "@/app/landing.css";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="landing">
      <SiteNav />
      <main className="legal">
        <article className="mx-auto max-w-[760px]">
          <h1 className="legal__title">{title}</h1>
          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
            {children}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
