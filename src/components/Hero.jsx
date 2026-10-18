import { useGSAP } from "@gsap/react"
import {gsap} from 'gsap';
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


export default function Hero(){

    const ref = useRef(null);

    useGSAP(() => {
        
        const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: ref.current,
                start: "top top",
                end: "+=300",
                scrub: 0.5,
                invalidateOnRefresh: true,
            },
        });
        tl.fromTo(".image",
            { scale: 0.4 },
            { scale: 1, duration: 1 }
        );

        const row = ref.current.querySelector(".contain");
        const items = gsap.utils.toArray(".char", row);
        const GAP = 12;  // gap-3
        gsap.fromTo(items,
            { paddingInline: 0 },
            {
            // justify-around: free space split into 7 equal slots, half on each side of an item
            paddingInline: () => {
                const total = items.reduce((sum, el) => sum + el.offsetWidth, 0);
                const free = row.clientWidth - total - GAP * (items.length - 1);
                return Math.max(0, free / items.length / 2);
            },
            ease: "none",
            scrollTrigger: {
                trigger: row,
                start: "top 80%",   // starts when the row is near the bottom of the screen
                end: "top 30%",     // finished by the time it is near the top
                scrub: 0.5,
                invalidateOnRefresh: true, // re-measure on resize
            },
            }
        );
       
    }, {scope: ref});

    return (
        <main ref={ref} className="relative h-fit w-full items-center justify-center overflow-clip">
            <div className="spacer h-[50vh] w-full pointer-events-none "></div>

              {/* sticky wrapper: h-0 so it takes no space, text overflows below it */}
                <div className="sticky top-[50vh] h-0 w-full">
                    <div className="flex w-full h-fit text-wrap">
                        <div className="w-1/2" />
                        <div className="w-1/2">
                            <div className="text text-5xl text-red-700 tracking-tight">
                                We build websites for <br />
                                people who care <br />
                                <p className="italic font-bold font-serif ">
                                    as much as we do.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            <div className="img relative w-full h-[120vh] "> 
                <div className="image w-full h-full bg-linear-to-tl from-purple-200 via-red-200 to-yellow-200"></div>
            </div>

            <div className="h-fit py-2 w-full px-8 bg-white relative">
                <div className="contain flex items-center justify-center gap-3 capitalize text-red-700 font-semibold">
                    {
                        ["Design", "+", "Webflow", "+", "Strategy", "=", "Full Circle"].map((item, index) => (
                            <p key={index} className="char whitespace-nowrap text-lg">{item}</p>
                        ))
                    }
                </div>
            </div>
        </main>
    )
}