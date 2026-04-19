"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Template({ children }) {
    return (
        <>
            {/* The Curtain that covers the screen immediately on page load, then lifts */}
            <motion.div 
                className="site-preloader-curtain"
                initial={{ y: 0 }} 
                animate={{ y: "-100vh", borderRadius: "0 0 50% 50%" }} 
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }} 
            >
                <div className="preloader-content-box">
                    <div className="preloader-logo">
                        <Image 
                            src="/images/logo.png" 
                            alt="الحبشي للرخام والجرانيت" 
                            width={80} 
                            height={80} 
                            unoptimized 
                            style={{ borderRadius: '50%', background: 'white' }} 
                        />
                    </div>
                    <div className="preloader-title">
                        <span className="char">الحبشي</span>
                        <span className="char">للرخام والجرانيت</span>
                    </div>
                </div>
            </motion.div>

            {/* The Page Content revealing subtly */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                {children}
            </motion.div>
        </>
    );
}
