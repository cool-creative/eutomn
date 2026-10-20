
import {motion} from 'motion/react'


export default function About(){
    return (
        <div className="w-full h-screen  flex items-center justify-center text-red-700">
            <div className="w-1/2 h-screen flex flex-col">
                <div className="w-full h-1/2  px-8 tracking-tight  flex items-end">
                    <ShowP 
                        l1="Your website isn't an expensive decoration."
                        l2="It's the sharpest point of your digital presence"
                        flag={true} 
                    />
                </div>
                <div className="w-full h-1/2"></div>
            </div>
            <div className="w-1/2 h-screen flex flex-col">
                <div className="w-full h-1/2 flex items-end">
                    <img src="/neutomi.avif" alt="" className="w-1/2 h-1/2 object-cover" /> 
                </div>
                <div className="w-full h-1/2 flex items-start tracking-tight pt-6 pr-8">
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
        <motion.p className="text-6xl "
            initial={{y: 20, opacity: 0, filter: 'blur(5px)'}}
            whileInView={{y: 0, opacity: 1, filter: 'blur(0px)'}}
            transition={{duration: 0.5, delay: 0.2, ease: "power2.out"}} 
            viewport={{once: true}}
        >
            {l1}
            {
                flag ? 
                 <p className="italic font-serif tracking-tighter ">{l2}</p>
                :
                 <span className=" italic font-serif tracking-tighter ">{l2}</span>
            }
            
        </motion.p>   
    )
}