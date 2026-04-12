"use client";

import { motion } from "framer-motion";

export default function MotionWrapper({ children, delay = 0, y = 20, duration = 0.5 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
