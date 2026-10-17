import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TITLE = "NEUTOMNI";

export default function Intro({ onDone }) {
        const [Dash, setDash] = useState([]);

  const ref = useRef(null);
  const [done, setDone] = useState(false);

  useGSAP(() => {
    const D = 2.5; // phase 1 length (seconds)
    const root = ref.current;

    const chars = gsap.utils.toArray(".char", root);
    const shapes = gsap.utils.toArray(".shape", root);
    const num = root.querySelector(".count-num");

    // --- stagger maths so the h1 finishes 200ms before phase 1 ends ---
    const charEach = 0.1;
    const charSpread = charEach * (chars.length - 1) / 2; // "from: center" max delay
    const charDur = D - 0.2 - charSpread;

    const shapeEach = 0.1;
    const shapeDur = D - shapeEach * (shapes.length - 1);

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);   // unmount the intro completely
        onDone?.();
      },
    });

    /* ================= PHASE 1 (all start at 0) ================= */

    // h1: letters drop in from the top, middle letters first, then outward
    tl.from(chars, {
      yPercent: -110,
      duration: charDur,
      ease: "power3.out",
      stagger: { each: charEach, from: "center" },
    }, 0);

    // shapes: from fully off-screen left to their centered position
    tl.from(shapes, {
      x: (i, el) => -el.getBoundingClientRect().right, // pushes each fully past the left edge
      duration: shapeDur,
      ease: "power3.out",
      stagger: shapeEach,
    }, 0);

    // fill line: 6% -> 100%
    tl.fromTo(".fill", { width: "6%" }, {
      width: "100%",
      duration: D,
      ease: "power1.inOut",
    }, 0);

    // counter: 001 -> 100 in steps, each new number slides up into place
    const steps = [1, 9, 27, 46, 68, 85, 100];
    steps.forEach((n, i) => {
      const t = (i / (steps.length - 1)) * (D - 0.3);
      tl.call(() => {
        num.textContent = String(n).padStart(3, "0");
      }, null, t);
      tl.fromTo(num,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
        t
      );
    });

    /* ================= PHASE 2 (all together) ================= */

    tl.addLabel("phase2", `>+0.2`); // short beat after phase 1

    // shapes group: slide to the right edge (respects the p-4 padding)
    tl.to(".shapes", {
      x: () => {
        const r = root.querySelector(".shapes").getBoundingClientRect();
        return root.clientWidth - r.right - 16;
      },
      duration: 1.2,
      ease: "power2.inOut",
    }, "phase2");

    // mid fades away
    tl.to(".mid", { opacity: 0, duration: 0.6, ease: "power1.out" }, "phase2");

    // top slides up, bottom slides down
    tl.to(".top", { yPercent: -100, duration: 1.2, ease: "power2.inOut" }, "phase2");
    tl.to(".bottom", { yPercent: 100, duration: 1.2, ease: "power2.inOut" }, "phase2");

  }, { scope: ref });

      useEffect(() => {  // used to stop too much re-renders
          let timer;
  
          function getSetWidth(){
              clearTimeout(timer);
              timer = setTimeout(() => {
                  const width = window.innerWidth;
                  let len = width > 800 ? 100 : 60;
                  setDash(Array.from({length:len}, (_,i) => Math.round((i+1)*width/len )));
              }, 150);
          };
          getSetWidth();
  
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
        <div className="text size-fit flex justify-center p-4">
          <h1 className="text-white text-[clamp(2rem,19vw,20rem)] md:leading-50 whitespace-nowrap font-semibold tracking-tight">
            {TITLE.split("").map((c, i) => (
              <span key={i} className="inline-block overflow-hidden align-top">
                <span className="char inline-block">{c}</span>
              </span>
            ))}
          </h1>
        </div>

        <div className="mid relative w-full flex flex-col gap-4">
          <div className="time px-6 text-white/80 text-lg font-bold">
            <div className="overflow-hidden">
              <span className="count-num inline-block">001</span>
            </div>
          </div>
          <div className="lines relative w-full h-fit flex">
            {Dash.slice(1).map((right, i) => (
              <div
                key={i}
                className={`h-0.5 ${i % 2 === 0 ? "bg-white" : "bg-transparent"}`}
                style={{ width: `${right - Dash[i]}px` }}
              />
            ))}
            <div className="fill absolute left-0 bg-white h-0.5" />
          </div>
        </div>
      </div>

      <div className="relative bottom bg-red-700 h-[40%] w-full flex flex-col justify-end items-center p-4">
        <div className="shapes w-fit h-fit flex gap-4 justify-center">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="shape size-4 bg-white rotate-45" />
          ))}
        </div>
      </div>
    </div>
  );
}