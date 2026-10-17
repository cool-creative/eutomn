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
    }, {scope: ref});

    return (
        <main ref={ref} className="relative h-fit w-full items-center justify-center  overflow-clip">
            <div className="spacer h-[50vh] w-full pointer-events-none "></div>

              {/* sticky wrapper: h-0 so it takes no space, text overflows below it */}
                <div className="sticky top-[50vh] h-0 w-full">
                    <div className="flex w-full h-fit text-wrap">
                        <div className="w-1/2" />
                        <div className="w-1/2">
                            <div className="text-5xl text-red-700 tracking-tight">
                                We build websites for <br />
                                people who care <br />
                                <p className="italic font-bold font-serif text-5xl">
                                    as much as we do.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            <div className="img relative w-full h-screen "> 
                <div className="image w-full h-full bg-linear-to-tl from-purple-200 via-red-200 to-yellow-200"></div>
            </div>

            {/* <div className="h-96 w-full"></div> */}
        </main>
    )
}