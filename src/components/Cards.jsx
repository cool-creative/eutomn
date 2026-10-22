import { useGSAP } from "@gsap/react"
import {gsap} from 'gsap';
import { useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Cards(){

    const cardsRef = useRef(null);
    const data = ['Design', 'Development', 'Marketing', 'Maintenance'];
    
    useGSAP(() => {
        ScrollTrigger.refresh();
        const cards = gsap.utils.toArray('.card', cardsRef.current); 
        const stick_div = document.querySelector('.stick-cards-div'); 
    
        gsap.to(cards, {
            clipPath: "inset(0% 0% 0% 0%)",       // fully revealed
            // ease: "power2.out",
            ease: "none",
            duration: 1,
            stagger: 0.15,
            scrollTrigger: {
                trigger: stick_div,
                start: "top 70%",                   // the moment the sticky stage sticks
                end: () => "+=" + window.innerHeight * 0.8, // done at 80% of the stuck range
                scrub: 0.5,
                invalidateOnRefresh: true,
            },
        }
        );
    }, {scope: cardsRef});
    return(
        <section ref={cardsRef} className="min-h-screen h-fit w-full px-4 md:px-8 mt-20"> 

            <div className=" h-screen w-full flex flex-col items-center gap-3 ">

                <div className=" stick-cards-div sticky top-0 w-full h-screen flex flex-col justify-end gap-4 md:gap-8 p-2 md:p-4"> 
                    <div className="w-full text-3xl sm:text-5xl md:text-8xl font-bold text-red-800 text-center">
                        OUR Features
                    </div>
                    <div className=" w-full h-fit grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 justify-between items-end"> 
                        {
                            Array.from({length:4}).map((_, i)=>{
                                return (
                                    // clipPath to not have initial visible height at start
                                    <div style={{clipPath: "inset(100% 0% 0% 0%)"}} key={i} className="card h-[50vh] sm:h-[60vh] md:h-[70vh] flex-1 bg-red-700 flex items-center justify-center p-2">
                                        <div className="w-full h-1/2 flex items-center justify-center flex-col font-bold gap-2 md:gap-4 text-center">
                                            <p className="text-3xl sm:text-5xl md:text-8xl text-red-300">0{i+1}</p>
                                            <p className="text-sm sm:text-2xl md:text-5xl italic text-red-100 font-serif tracking-tighter truncate md:overflow-visible w-full">{data[i]}</p>
                                        </div>
                                        
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

        </section>
    )
};
