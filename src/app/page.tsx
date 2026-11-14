import "./landing.css";
import SiteNav from "@/components/landing/SiteNav";
import Hero from "@/components/landing/Hero";
import Statement from "@/components/landing/Statement";
import RankClimb from "@/components/landing/RankClimb";
import PastYou from "@/components/landing/PastYou";
import Tracking from "@/components/landing/Tracking";
import Progress from "@/components/landing/Progress";
import Designs from "@/components/landing/Designs";
import Features from "@/components/landing/Features";
import Closing from "@/components/landing/Closing";
import SiteFooter from "@/components/landing/SiteFooter";

export default function Home() {
  return (
    <div className="landing">
      <SiteNav />
      <main>
        <Hero />
        <Statement />
        <RankClimb />
        <PastYou />
        <Tracking />
        <Progress />
        <Designs />
        <Features />
        <Closing />
      </main>
      <SiteFooter />
    </div>
  );
}
