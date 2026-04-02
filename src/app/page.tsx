import { Header, Footer } from "@/components/layout";
import {
  Hero,
  Events,
  Features,
  AppScreenshots,
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
        <Features />
        <AppScreenshots />
        <Events />
        <CharityPartners />
        <Privacy />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
