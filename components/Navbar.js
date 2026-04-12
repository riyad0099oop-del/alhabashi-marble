"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "الرئيسية", id: "/#home" },
    { title: "خدماتنا", id: "/services" },
    { title: "صالة العرض", id: "/#showroom" },
    { title: "مشاريعنا", id: "/projects" },
    { title: "دليل العناية", id: "/care-guide" },
    { title: "اتصل بنا", id: "/contact" },
  ];

  return (
    <div className={`premium-navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
      <header className="premium-navbar">
        <Link href="/" className="nav-brand">
          <Image
            src="/images/logo.png"
            alt="Al Habashi Factory logo"
            width={55}
            height={55}
            unoptimized
            className="brand-logo-img"
          />
          <span className="brand-text">مصنع الحبشي</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav>
          <ul className="desktop-menu">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link href={link.id}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          {/* Hamburger Menu Toggle */}
          <button 
            className={`hamburger-premium ${menuOpen ? "open" : ""}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
          >
            <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
            <span style={{ opacity: menuOpen ? 0 : 1 }}></span>
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
          </button>
        </div>

        {/* Mobile Sidebar (Kept separate from pill structure for clarity) */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div 
                className="menu-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 1500, pointerEvents: 'auto'
                }}
              />
              <motion.div 
                className="mobile-sidebar"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                style={{
                  position: 'fixed', top: 0, right: 0, bottom: 0, width: '300px', background: 'var(--bg-light)', 
                  zIndex: 1600, padding: '40px 30px', boxShadow: '-10px 0 40px rgba(0,0,0,0.2)', pointerEvents: 'auto'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
                  <Image src="https://i.ibb.co/vz6Gv2W/20260402_220302.jpg" alt="Logo" width={60} height={60} style={{ borderRadius: '50%' }} />
                  <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', fontSize: '2.5rem', color: 'var(--primary-brown)', cursor: 'pointer' }}>&times;</button>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '25px', padding: 0 }}>
                  {navLinks.map((link, i) => (
                    <motion.li 
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <Link href={link.id} onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--primary-brown)', fontSize: '1.3rem', fontWeight: 800 }}>
                        {link.title}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
