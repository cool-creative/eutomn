import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const TITLE = "NEUTOMNI";
const COUNT_END = 100;

// every number the counter passes through: 001 ... 100
const NUMS = ['001', ...Array.from({ length: COUNT_END/5 }, (_, i) =>
  String((i + 1) * 5).padStart(3, "0")
)];

// per column, collapse consecutive repeats (hundreds: 0,1 / tens: 0..9,0 / ones: 1..9,0,1...)
const COLUMNS = [0, 1, 2].map((c) =>
  NUMS.map((s) => s[c]).filter((d, i, a) => i === 0 || d !== a[i - 1])
);
// blank first item so the first number enters from below
const reelItems = (c) => ["", ...COLUMNS[c]];



export default function Intro({navRef}) {
        
  
  const [done, setDone] = useState(false);
  const [Dash, setDash] = useState([]);
  const ref = useRef(null);

  useGSAP(() => {

    // const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // if (reduce) { setDone(true); return; }
    window.scrollTo(0,0);
    ScrollTrigger.refresh();

    const D = 3; // phase 1 length (seconds)
    const root = ref.current;

    // Navbar 
    const navItems = navRef.current;
    const navLinks = navItems.querySelector('.links');
    const navFade = navItems.querySelector('.fade');
    const navMail = navItems.querySelector('.mail');

    const chars = gsap.utils.toArray(".char", root);
    const shapes = gsap.utils.toArray(".shape", root);

    // --- stagger maths so the h1 finishes 200ms before phase 1 ends ---
    const charEach = 0.1;
    const charSpread = charEach * (chars.length - 1) / 2; // "from: center" max delay
    const charDur = D - 0.2 - charSpread;
    const top = root.querySelector(".top");
    const text = root.querySelector(".text");

    const shapeEach = 0.1;
    const shapeDur = D - shapeEach * (shapes.length - 1);

    // counter: [hundreds, tens, ones]
    const reels = gsap.utils.toArray(".reel", root);
  
    const tl = gsap.timeline({onComplete: () => setDone(true)});  // unMount or hide element

    /* ================= PHASE 1 (all start at 0) ================= */

    // h1: letters drop in from the top
    tl.from(chars, {
      yPercent: -140,
      duration: charDur,
      ease: "power3.out",
      stagger: { each: charEach, from: "center" },
    }, 0);

    // shapes: from fully off-screen left to their centered position
    tl.from(shapes, {
      x: (_, el) => -el.getBoundingClientRect().right, // pushes each fully past the left edge
      duration: shapeDur,
      ease: "power3.inOut",
      stagger: shapeEach,
    }, 0);

    // fill line: 6% -> 100%
    tl.fromTo(".fill", { width: "16%" }, {
      width: "100%",
      duration: D,
      ease: "power1.inOut",
    }, 0);

    // counter: 001 -> 100 in steps, each new number slides up into place
    const endY = (c) => -(COLUMNS[c].length / (COLUMNS[c].length + 1)) * 100;

    tl.to(reels[2], { yPercent: endY(2), duration: D, ease: "power1.inOut" }, 0);
    tl.to(reels[1], { yPercent: endY(1), duration: D, ease: "power2.inOut" }, 0);
    tl.to(reels[0], { yPercent: -(1/3)*100, duration: 0.4, ease: "power2.out" }, 0)
      .to(reels[0], { yPercent: endY(0), duration: 0.8, ease: "power2.inOut" }, D - 0.6);

    /* ================= PHASE 2 (all together) ================= */

    tl.addLabel("phase2", `>+0.2`); // short beat after phase 1

    // shapes group: slide to the right edge (respects the p-4 padding)
    tl.to(".shape", {
      x:(i, el) => window.innerWidth - el.getBoundingClientRect().left + 40,
      duration: 0.5,
      stagger: shapeEach,
      ease: "power3.out",
    }, "phase2");

    tl.to(top, {
      y: () => -top.offsetHeight,   
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        const panelY = gsap.getProperty(top, "y");      
        const maxHold = (top.offsetHeight+100) - (text.offsetHeight);
        gsap.set(text, { y: Math.min(-panelY, maxHold) });
      },
    }, "phase2");

    // mid fades away
    tl.to(".mid", { opacity: 0, yPercent: 20, duration: 0.6, ease: "power1.out" }, "phase2");
    // top slides up, bottom slides down 
    tl.to(".top", { yPercent: -100, duration: 1.2, ease: "power1.out" }, "phase2");
    tl.to(".bottom", { yPercent: 100, duration: 1.2, ease: "power1.out" }, "phase2");

    // nav items animation
    tl.from([navFade, navLinks, navMail], {opacity: 0, y: 10, duration: 0.8, stagger: 0.3}, "<0.25"); 

  }, { scope: ref });

  useEffect(() => {  // used to stop too much re-renders
    let timer
    function getSetWidth(){
        clearTimeout(timer);
        timer = setTimeout(() => {
            const width = window.innerWidth;
            let len = width > 800 ? 140 : 100;
            setDash(Array.from({length:len}, (_,i) => Math.round((i+1)*width/len )));
        }, 150);
    };
    getSetWidth()
    window.addEventListener('resize', getSetWidth);
    return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', getSetWidth)
    };
  }, []); // used to run only once, not continously
  

  if (done) return null;

  return (
    <div
      ref={ref}
      id="intro"
      aria-hidden="true"
      className="fixed inset-0 z-50 w-screen h-screen flex flex-col overflow-hidden"
    >
      <div className="top h-[60%] w-full bg-red-700 flex flex-col justify-between">
        <div className="text size-fit flex justify-center p-4 ">
          <h1 className="text-white text-[clamp(2rem,19vw,20rem)] md:leading-50 whitespace-nowrap font-semibold tracking-tight">
            {TITLE.split("").map((c, i) => (
              <span key={i} className="inline-block  align-top">
                <span className="char inline-block">{c}</span>
              </span>
            ))}
          </h1>
        </div>

        <div className="mid relative w-full flex flex-col gap-4">
            <div className="time flex px-6 text-white/80 text-lg font-bold tabular-nums">
              {[0, 1, 2].map((c) => (
                <div key={c} className="digit h-6 overflow-hidden">
                  <div className="reel">
                    {reelItems(c).map((d, i) => (
                      <div key={i} className="h-6 leading-5 text-center">
                        {d || "\u00A0"}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          
          <div className="lines relative w-full h-fit flex">
            {Dash.slice(1).map((right, i) => (
              <div
                key={i}
                className={`h-1 ${i % 2 === 0 ? "bg-white" : "bg-transparent"}`}
                style={{ width: `${right - Dash[i]}px` }}
              />
            ))}
            <div className="fill absolute left-0 bg-white h-1" />
          </div>
        </div>
      </div>

      <div className="relative bottom bg-red-700 h-[40%] w-full flex flex-col justify-end items-center p-4">
      </div>
        <div className="shapes absolute bottom-6 w-full h-fit flex gap-4 justify-center">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="shape size-4 bg-white rotate-45" />
          ))}
        </div>
    </div>
  );
}