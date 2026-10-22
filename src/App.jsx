import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import About from "./pages/About";

import gsap from 'gsap'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
// import Work from "./pages/Work";
import Service from "./pages/Service";
import Footer from "./pages/Footer";




export default function App() {
  
  const navRef = useRef(null);
  const lenisRef = useRef(null);
  const heroRef = useRef(null);
  
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
      <main className="h-fit w-full bg-white flex flex-col justify-center ">
        
        <Navbar navRef={navRef} />
        <Hero heroRef={heroRef} />
        <Intro navRef={navRef} heroRef={heroRef} />

        <About/>
        <Cards />
        <Service/>

        <Footer/>

      </main>
    </>
  );
}