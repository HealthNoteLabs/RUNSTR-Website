import { Header, Footer } from "@/components/layout";
import {
  Hero,
  AppScreenshots,
  Features,
  HowItWorks,
  CharityPartners,
  Privacy,
  CallToAction,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AppScreenshots />
        <Features />
        <HowItWorks />
        <CharityPartners />
        <Privacy />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
