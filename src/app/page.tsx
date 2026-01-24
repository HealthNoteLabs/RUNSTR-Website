import { Header, Footer } from "@/components/layout";
import {
  Hero,
  Events,
  Features,
  Pricing,
  HowItWorks,
  CharityPartners,
  CallToAction,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Events />
        <Features />
        <Pricing />
        <HowItWorks />
        <CharityPartners />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
