import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import {gsap} from 'gsap';


export default function Intro(){

    const [Dash, setDash] = useState([]);
    const ref = useRef(null);

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

    useGSAP(() => {

        const shapes = gsap.utils.toArray('.shape', ref.current);

        const tl = gsap.timeline();

        tl.from(shapes, {xPercent: -100, stagger: 0.1, duration: 1})
          .to('.top', {yPercent: -100, duration: 2, ease: "power2.inOut"}, 0)
          .to('.bottom', {yPercent: 100, duration: 2, ease: "power2.inOut"}, 0);  

    }, {scope: ref});

    return(
        <div ref={ref} id="intro" className="w-screen h-screen flex flex-col overflow-hidden"> 

            <div className="top h-[60%] w-full bg-red-700 flex flex-col justify-between">
                <div className="text size-fit flex justify-center p-4 ">
                    <h1 className="text-white text-[clamp(2rem,19vw,20rem)] md:leading-50 whitespace-nowrap font-semibold tracking-tight">
                        NEUTOMNI
                    </h1>
                </div>

                <div className="mid relative w-full flex flex-col gap-4">   
                    <div className="time text-white/80 text-lg px-6 font-bold">001</div>
                    <div className="lines relative w-full h-fit flex ">
                        {Dash.slice(1).map((right, i) => (
                            <div key={i}
                             className={`h-0.5 ${i % 2 === 0 ? "bg-white" : "bg-transparent"}`}
                             style={{ width: `${right - Dash[i]}px` }}
                            /> 
                        ))}
                        <div className="fill w-[6%] absolute bg-white h-0.5"></div>
                    </div>
                </div>

            </div>

            <div className="relative bottom bg-red-700 h-[40%] w-full flex flex-col justify-end items-center p-4">

                <div className="shapes w-fit h-fit flex gap-4 justify-center">
                    {
                        Array.from({length:6}, (_,i) =>  
                            <div key={i} className="shape size-4 bg-white rotate-45"/>
                        )

                    } 
                </div>

            </div>
        </div>
    )
}