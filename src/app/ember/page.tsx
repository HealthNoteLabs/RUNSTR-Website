import { Header, Footer } from "@/components/layout";
import {
  Features,
  AppScreenshots,
  Rewards,
  CharityPartners,
  CallToAction,
} from "@/components/sections";

export default function EmberPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Features />
        <AppScreenshots />
        <Rewards />
        <CharityPartners />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
