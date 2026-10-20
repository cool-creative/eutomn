
import {motion} from 'motion/react'


export default function About(){
    return (
        <div className="w-full min-h-screen md:h-screen flex flex-col md:flex-row items-center justify-center text-red-700 py-12 md:py-0">
            <div className="w-full md:w-1/2 min-h-[40vh] md:h-screen flex flex-col justify-center">
                <div className="w-full md:h-1/2 px-4 md:pl-4 md:pr-8 tracking-tight flex items-center md:items-end">
                    <ShowP 
                        l1="Your website isn't an expensive decoration."
                        l2="It's the sharpest point of your digital presence"
                        flag={true} 
                    />
                </div>
                <div className="hidden md:block w-full h-1/2"></div>
            </div>
            <div className="w-full md:w-1/2 min-h-[40vh] md:h-screen flex flex-col justify-center">
                <div className="w-full md:h-1/2 flex items-center md:items-end px-4 md:px-0">
                    <img src="/neutomi.avif" alt="" className="w-full md:w-1/2 h-48 md:h-1/2 object-cover" /> 
                </div>
                <div className="w-full md:h-1/2 flex items-start tracking-tight pt-6 px-4 md:pr-8 md:px-0">
                    <ShowP 
                        l1="First, we understand where you are" 
                        l2="→ then we build the clearest path to where you’re going."
                        flag={false} 
                    />         
                </div>
            </div>
        </div>
    )
};


function ShowP({l1, l2, flag}){

    return (
        <motion.div className="text-2xl sm:text-3xl md:text-6xl"
            initial={{y: 40, opacity: 0, filter: 'blur(5px)'}}
            whileInView={{y: 0, opacity: 1, filter: 'blur(0px)'}}
            transition={{duration: 0.5, delay: 0.2, ease: "power2.out"}} 
        >
            <p>{l1}</p>
            {
                flag ? 
                 <p className="italic font-serif tracking-tighter mt-1">{l2}</p>
                :
                 <span className="italic font-serif tracking-tighter inline-block mt-1">{l2}</span>
            }
        </motion.div>   
    )
}