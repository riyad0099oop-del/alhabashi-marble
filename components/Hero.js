"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function Hero() {
  return (
    <section id="home" className="hero-cinematic">
      {/* Background Layers */}
      <div className="hero-bg-cinematic">
        <div className="hero-image-zoom"></div>
        <div className="hero-dark-veil"></div>
      </div>

      {/* Main Content Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="hero-content-cinematic"
      >
        <motion.div variants={itemVariants} className="hero-badge-glass">
            <i className="fas fa-gem"></i>
            فخامة الحجر الطبيعي العالمي
        </motion.div>
        
        <motion.h1 variants={itemVariants}>
          <span className="brand-h1-main">الحبشي للرخام والجرانيت</span> <br />
          <span className="brand-highlight">أرقى أنواع الرخام والجرانيت في صنعاء، اليمن</span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="hero-desc-glass">
          نلتزم في الحبشي للرخام والجرانيت بتقديم أفخر أنواع الحجر الطبيعي المستورد (إيطالي، تركي، برازيلي) 
          بأعلى معايير الدقة، لنصيغ لكم تصاميم تليق بفخامة منازلكم ومشاريعكم في اليمن.
        </motion.p>
        
        <motion.div variants={itemVariants} className="hero-actions">
          <a href="https://wa.me/967777079288" className="btn-solid-gold" target="_blank" rel="noopener noreferrer">
            تواصل معنا مباشرة
          </a>
          <Link href="/projects" className="btn-glass-outline">
            استكشف مشاريعنا
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="scroll-indicator-container"
      >
          <div className="scroll-line">
              <div className="scroll-dot"></div>
          </div>
      </motion.div>

    </section>
  );
}
