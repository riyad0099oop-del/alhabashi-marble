"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SitePreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after 2.5 seconds or when page is fully loaded
    const timeout = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#1a100a', // Factory dark brown
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ marginBottom: '30px' }}
          >
            <div style={{
              width: '100px',
              height: '100px',
              border: '2px solid var(--accent-gold)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{
                  position: 'absolute',
                  inset: '-5px',
                  border: '2px solid transparent',
                  borderTopColor: 'var(--accent-gold)',
                  borderRadius: '50%',
                }}
              />
              <span style={{ color: 'var(--accent-gold)', fontSize: '2rem', fontWeight: '900' }}>AH</span>
            </div>
          </motion.div>

          {/* Text Reveal */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: '700',
                letterSpacing: '4px',
                textTransform: 'uppercase'
              }}
            >
              Al Habashi Factory
            </motion.h2>
          </div>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '150px' }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
            style={{
              height: '1px',
              background: 'var(--accent-gold)',
              marginTop: '20px',
              opacity: 0.3
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
