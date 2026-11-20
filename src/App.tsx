import { Faq, Footer, Pilot, Status } from "./components/Closing";
import { Benefits, How, NameMeaning, Sites } from "./components/Explain";
import { Hero, Nav } from "./components/Hero";
import { Pricing, Savings, TryIt } from "./components/Interactive";
import { Intro } from "./components/Intro";
import { SignalStory } from "./components/SignalStory";
import { Team } from "./components/Team";
import { useReducedMotion } from "./lib/motion";

export default function App() {
  const reduced = useReducedMotion();
  return (
    <>
      <Nav />
      <main id="top" className="relative z-[1]">
        <Hero reduced={reduced} />
        <div
          className="relative z-[1]"
          style={{ background: "linear-gradient(to bottom, transparent, var(--color-bg) 160px)" }}
        >
          <Intro reduced={reduced} />
          <SignalStory reduced={reduced} />
          <How />
          <NameMeaning />
          <Sites />
          <Benefits />
          <TryIt />
          <Savings />
          <Pricing />
          <Status />
          <Pilot />
          <Team />
          <Faq />
          <Footer />
        </div>
      </main>
    </>
  );
}
