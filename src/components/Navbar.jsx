import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(ScrollTrigger);
const END_FONT = 24;   // 1.5rem, the shrunk title size (px)
const END_LINE = 28;   // line height of the shrunk title (px)



export default function Navbar({navRef}) {

  useGSAP(() => { 
    const root   = navRef.current;
    const h1     = root.querySelector("h1");
    const fade   = root.querySelector(".fade");
    const header = root.querySelector("header");
    const links  = root.querySelector(".links");

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=300",
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });

    // title shrinks (measure the header, not the inline h1, for the line height)
    tl.fromTo(h1,
      {
        fontSize: () => parseFloat(getComputedStyle(h1).fontSize),
        lineHeight: () => header.offsetHeight + "px",
      },
      { fontSize: END_FONT, lineHeight: END_LINE + "px", duration: 1 },
      0
    );

    // links: 40px gap -> negative margin, so the row lands on the title's line
    tl.fromTo(links,
      { marginTop: 40 },
      {
        marginTop: () => -(END_LINE / 2 + links.offsetHeight / 2),
        duration: 1,
      },
      0
    );

    // fade goes away in the first 40%
    tl.to(fade, { opacity: 0, pointerEvents: "none", duration: 0.4 }, 0);
  }, { scope: navRef });




  return (
    <nav
      ref={navRef}
      className="fixed top-0 inset-x-0 z-40 flex flex-col p-2 px-4 md:px-8 text-red-700 bg-white"
    >
      <header className="header w-fit"> 
        <h1 className="text-[clamp(2rem,11.5vw,20rem)] md:text-[clamp(2rem,19vw,20rem)] md:leading-50 whitespace-nowrap font-semibold tracking-tight">
          NEUTOMNI
        </h1>
      </header>

      <div className="links flex justify-between items-center font-semibold text-xs sm:text-sm md:text-base">
        <div className="fade opacity-80 md:ml-6">
          <p className="text-xs sm:text-sm md:text-base">Digital Design & Webflow Studio</p>
        </div>
        <div className="pages hidden md:flex items-center md:gap-6">
          <p>Process</p>
          <p>Portfolio</p>
          <p>Book a Call</p>
        </div>
        <div className="mail">
          <p className="text-xs sm:text-sm md:text-base">contact@neutomi.com</p>
        </div>
      </div>
    </nav>
  );
}