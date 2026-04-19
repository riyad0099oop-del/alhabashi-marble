"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link, usePathname } from "../i18n/routing";
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: t("home"), id: "/#home" },
    { title: t("services"), id: "/services" },
    { title: t("showroom"), id: "/#showroom" },
    { title: t("projects"), id: "/projects" },
    { title: t("careGuide"), id: "/care-guide" },
    { title: t("contact"), id: "/contact" },
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
          <span className="brand-text">{t("brand")}</span>
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
          {/* Language Switcher */}
          {mounted && (
            <Link
              href={pathname || "/"}
              locale={locale === "ar" ? "en" : "ar"}
              className="lang-switch-btn"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                color: scrolled ? "var(--accent-gold)" : "white",
                fontSize: "0.9rem",
                fontWeight: "700",
                cursor: "pointer",
                marginRight: "15px",
                padding: "4px 10px",
                borderRadius: "20px",
                textDecoration: "none",
                transition: "all 0.3s"
              }}
            >
              {t("lang")}
            </Link>
          )}

          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              style={{
                background: "transparent",
                border: "none",
                color: scrolled ? "var(--accent-gold)" : "white",
                fontSize: "1.2rem",
                cursor: "pointer",
                marginRight: "15px",
                transition: "color 0.3s"
              }}
              aria-label="Toggle Theme"
            >
              <i className={theme === "dark" ? "fas fa-sun" : "fas fa-moon"}></i>
            </button>
          )}

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

        {/* Mobile Sidebar */}
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
                  <Image src="/images/logo.png" alt="Logo" width={60} height={60} style={{ borderRadius: '50%' }} />
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
