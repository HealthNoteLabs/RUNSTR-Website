import { Header, Footer } from "@/components/layout";
import {
  Hero,
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
        <CharityPartners />
        <Privacy />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
