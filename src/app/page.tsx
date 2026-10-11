import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UspSection from "@/components/UspSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import DownloadCta from "@/components/DownloadCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <UspSection />
        <FeaturesSection />
        <HowItWorks />
        <DownloadCta />
      </main>
      <Footer />
    </>
  );
}
