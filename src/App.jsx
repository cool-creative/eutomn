import { useRef } from "react";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";


export default function App() {

  const navRef = useRef(null);

  return (
    <main className="h-fit w-full bg-white flex flex-col  justify-center">
      <Navbar navRef={navRef} />
      <Intro navRef={navRef} />
      <Hero />
      <Cards />

    </main>
  );
}