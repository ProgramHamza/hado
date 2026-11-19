import { Faq, Footer, Status } from "./components/Closing";
import { How, NameMeaning, Variants } from "./components/Explain";
import { Hero, Nav } from "./components/Hero";
import { Cost, Savings, TryIt } from "./components/Interactive";
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
          <Variants />
          <TryIt />
          <Cost />
          <Savings />
          <Status />
          <Team />
          <Faq />
          <Footer />
        </div>
      </main>
    </>
  );
}
