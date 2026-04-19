"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Link } from "../i18n/routing";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
    const t = useTranslations("Footer");
    const nt = useTranslations("Navbar");
    const locale = useLocale();
    const [year, setYear] = useState(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer id="footer" className="footer-premium">
            <div className="footer-top-grid">
                
                {/* Brand & Socials Column */}
                <div className="footer-brand-info">
                    <Link href="/" className="footer-logo-premium">
                        <Image src="/images/logo.png" alt="Al Habashi" width={55} height={55} unoptimized />
                        <h3>{nt("brand")}</h3>
                    </Link>
                    <p>{t("about")}</p>
                    <div className="social-links-premium">
                        <a 
                            href="https://wa.me/967777079288" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="wa-social"
                            aria-label="WhatsApp"
                        >
                            <i className="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>

                {/* Quick Links Column */}
                <div className="footer-column">
                    <h4>{t("links.title")}</h4>
                    <ul className="footer-quick-links">
                        <li><Link href="/#home">{t("links.home")}</Link></li>
                        <li><Link href="/#showroom">{t("links.showroom")}</Link></li>
                        <li><Link href="/projects">{t("links.projects")}</Link></li>
                        <li><Link href="/care-guide">{t("links.careGuide")}</Link></li>
                        <li><a href={`/${locale}/admin`} className="admin-footer-link" style={{ opacity: 0.3, fontSize: '0.8rem' }}>{t("links.admin") || "الإدارة"}</a></li>
                    </ul>
                </div>

                {/* Contact Column */}
                <div className="footer-column">
                    <h4>{t("contact.title")}</h4>
                    <ul className="footer-contact-info">
                        <li>
                            <i className="fas fa-map-marker-alt"></i> 
                            <span>{t("contact.location")}</span>
                        </li>
                        <li>
                            <i className="fas fa-phone-alt"></i> 
                            <span>{t("contact.ceo")}</span>
                        </li>
                        <li>
                            <i className="fas fa-headset"></i> 
                            <span>{t("contact.sales")}</span>
                        </li>
                    </ul>
                </div>

                {/* Map Box */}
                <div className="footer-column">
                    <h4>{t("map")}</h4>
                    <div className="footer-map-glass">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.9274099043746!2d44.168814675914506!3d15.441828184803486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1603da4c84dc2f8f%3A0x0!2zMTXCsDI2JzMwLjYiTiA0NMKwMTAnMTUuNiJF!5e0!3m2!1sar!2sye!4v1713526800000!5m2!1sar!2sye" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="موقع الحبشي للرخام والجرانيت على خرائط جوجل"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom-bar" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '30px 0' }}>
                <span style={{ opacity: 0.9 }}>&copy; {year || '2026'} {t("rights")}</span>
                <a href="https://wa.me/96774303491" target="_blank" rel="noopener noreferrer" className="dev-signature">
                    {t("dev")} <span style={{ color: 'var(--accent-gold)', fontWeight: '700' }}>Riyad & Emad</span> 
                    <span style={{ margin: '0 8px', opacity: 0.5 }}>|</span>
                    <i className="fab fa-whatsapp" style={{ fontSize: '12px', marginLeft: '5px' }}></i>
                    774303491
                </a>
                
                <button onClick={scrollToTop} className="back-to-top" aria-label="Top">
                    <i className="fas fa-arrow-up"></i>
                </button>
            </div>
        </footer>
    );
}
