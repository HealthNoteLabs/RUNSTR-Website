import { Header, Footer } from "@/components/layout";
import {
  Hero,
  Events,
  Features,
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
        <HowItWorks />
        <CharityPartners />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
