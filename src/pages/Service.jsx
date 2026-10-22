import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { label: "Design", bg: "from-red-900 to-red-600", src: '/asset-1.jpg' },
  { label: "Development", bg: "from-rose-900 to-rose-500", src: '/asset-2.jpg' },
  { label: "Marketing", bg: "from-orange-900 to-red-500", src: '/asset-3.jpg' },
];

// Visible area starts as a single point at the bottom-right corner
const HIDDEN = "inset(100% 0% 0% 100%)";
const SHOWN = "inset(0% 0% 0% 0%)";

export default function Service() {

  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);


  // useGSAP(() => {
  //   const images = gsap.utils.toArray(".reveal-img", sectionRef.current);

  //   const tl = gsap.timeline({
  //     defaults: { ease: "none" },
  //     scrollTrigger: {
  //       trigger: sectionRef.current,
  //       start: "top top",
  //       end: "bottom bottom",
  //       scrub: 1,
  //       invalidateOnRefresh: true,
  //       onEnter: () => setActive(0),
  //       onLeaveBack: () => setActive(0),
  //     },
  //   });

  //   images.forEach((img, i) => {
  //     if (i === 0) return;

  //     tl.fromTo(img,
  //       { clipPath: HIDDEN },
  //       { clipPath: SHOWN,
  //         onUpdate: function () {
  //           // if (this.progress() >= 0.4) {
  //           //   setActive((prev) => prev === i ? prev : i);
  //           // } else {
  //           //   setActive((prev) => prev === i - 1 ? prev : i - 1);
  //           // } 
  //           if (this.progress() >= 0.4) {
  //   setActive(i);
  // } else {
  //   setActive(i - 1);
  // }
  //         }
  //       }
  //     );
  //   });
  // }, { scope: sectionRef });
  useGSAP(() => {
  const images = gsap.utils.toArray(".reveal-img", sectionRef.current);
  let sectionEntered = false;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onEnter: () => {
        sectionEntered = true;
        setActive(0);
      },
      onLeaveBack: () => {
        sectionEntered = false;
        setActive(0);
      },
    },
  });

  images.forEach((img, i) => {
    if (i === 0) return;

    tl.fromTo(
      img,
      { clipPath: HIDDEN },
      {
        clipPath: SHOWN,
        onUpdate: function () {
          if (!sectionEntered) return;

          const nextActive =
            this.progress() >= 0.4 ? i : i - 1;

          setActive((prev) =>
            prev === nextActive ? prev : nextActive
          );
        },
      }
    );
  });
}, { scope: sectionRef });
  return (
    <section ref={sectionRef} className="relative w-full h-[300vh] bg-black ">     

      <div className="sticky top-0 h-screen w-full px-4 md:px-8 bg-white">
        <div className=" flex flex-col md:flex-row h-full justify-between items-center gap-4 md:gap-12">
          {/* Left column: all labels, current one tagged Active */} 
          <ul className="flex flex-col gap-3 md:gap-6">
            {items.map((item, i) => {
              const isActive = i === active; 
              return (
                <li
                  key={item.label}
                  className={`flex flex-col items-start gap-1 transition-all duration-300 md:flex-row md:items-center md:gap-4 ${
                    isActive ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <span className="font-serif text-xl font-bold italic tracking-tight text-red-800 sm:text-3xl md:text-6xl">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Right column: images stacked in one spot, later ones sit on top */}
          <div className="relative h-[55vh] w-full md:h-[75vh]">
            {items.map((item, i) => (
              <div
                key={item.label}
                style={i === 0 ? undefined : { clipPath: HIDDEN }}
                className={`reveal-img absolute inset-0 flex items-center justify-center bg-linear-to-br ${item.bg}`}
              >
                <img className="absolute w-full h-full object-cover" src={item.src} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
