import { useRef } from "react";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";

export default function App() {

  const navRef = useRef(null);

  return (
    <main className="h-fit w-full bg-white flex flex-col  justify-center">
      <Navbar navRef={navRef} />
      <Intro navRef={navRef} />
      <Hero />
      <div className="h-[90vh] w-full"></div>

    </main>
  );
}