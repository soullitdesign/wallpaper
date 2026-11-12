import Closing from "@/components/Closing";
import Collection from "@/components/Collection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Pricing from "@/components/Pricing";
import Showcase from "@/components/Showcase";
import Story from "@/components/Story";
import Testimonials from "@/components/Testimonials";
import { PackProvider } from "@/lib/pack";

export default function Home() {
  return (
    <PackProvider>
      <a
        href="#works"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[95] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to the collection
      </a>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Collection />
        <Showcase />
        <Story />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Closing />
      </main>
      <Footer />
    </PackProvider>
  );
}
