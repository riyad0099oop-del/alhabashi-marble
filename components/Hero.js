"use client";

import { motion } from "framer-motion";
import { Link } from "../i18n/routing";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Home.Hero");
  const nt = useTranslations("Navbar");

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
            {t("badge")}
        </motion.div>
        
        <motion.h1 variants={itemVariants}>
          <span className="brand-h1-main">{nt("brand")}</span> <br />
          <span className="brand-highlight">{t("title")}</span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="hero-desc-glass">
          {t("desc")}
        </motion.p>
        
        <motion.div variants={itemVariants} className="hero-actions">
          <a href="https://wa.me/967777079288" className="btn-solid-gold" target="_blank" rel="noopener noreferrer">
            {nt("contact")}
          </a>
          <Link href="/projects" className="btn-glass-outline">
            {nt("projects")}
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
