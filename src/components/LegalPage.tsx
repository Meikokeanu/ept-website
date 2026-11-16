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
        <article className="legal__article">
          <h1 className="legal__title">{title}</h1>
          <div className="legal__body">{children}</div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
