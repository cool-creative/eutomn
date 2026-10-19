import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";

import gsap from 'gsap'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'



export default function App() {
  
  const navRef = useRef(null);
  const lenisRef = useRef(null);
  
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => gsap.ticker.remove(update)
  }, [])

  return (

    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <main className="h-fit w-full bg-white flex flex-col justify-center">
        <Navbar navRef={navRef} />
        <Intro navRef={navRef} />
        <Hero />
        <Cards />
      </main>
    </>
  );
}