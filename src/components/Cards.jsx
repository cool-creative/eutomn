import { useGSAP } from "@gsap/react"
import {gsap} from 'gsap';
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Cards(){

    const cardsRef = useRef(null);
    
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
                start: "top top",                   // the moment the sticky stage sticks
                end: () => "+=" + window.innerHeight * 0.8, // done at 80% of the stuck range
                scrub: 0.5,
                invalidateOnRefresh: true,
            },
        }
        );
    }, {scope: cardsRef});
    return(
        <section ref={cardsRef} className="h-fit w-full px-8 "> 

            <div className=" h-[200vh] w-full flex flex-col items-center gap-3 ">

                <div className=" stick-cards-div sticky top-0 w-full h-screen flex flex-col justify-end gap-8 p-4"> 
                    <div className="w-full text-8xl font-bold text-red-800 text-center">
                        OUR Features
                    </div>
                    <div className=" w-full h-fit flex gap-3 justify-end items-end"> 
                        {
                            Array.from({length:4}).map((_, i)=>{
                                return (
                                    // clipPath to not have initial visible height at start
                                    <div style={{clipPath: "inset(100% 0% 0% 0%)"}} key={i} className="card h-[70vh] w-[25%] bg-red-700 flex items-center justify-center">
                                        <p className="text-8xl font-bold text-red-500">0{i+1}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

        </section>
    )
}