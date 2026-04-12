"use client";

import { motion } from "framer-motion";

const variants = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  },
  blurIn: {
    initial: { opacity: 0, filter: "blur(10px)", y: 20 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 }
  },
  scaleReveal: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 }
  }
};

export default function MotionWrapper({
  children,
  delay = 0,
  duration = 0.8,
  variant = "fadeUp",
  className = "",
  style = {}
}) {
  const selectedVariant = variants[variant] || variants.fadeUp;

  return (
    <motion.div
      initial={selectedVariant.initial}
      whileInView={selectedVariant.animate}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
      style={style}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] // Custom luxury cubic-bezier
      }}
    >
      {children}
    </motion.div>
  );
}
