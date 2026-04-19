"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import WhatsAppButton from "../../../components/WhatsAppButton";
import MotionWrapper from "../../../components/MotionWrapper";
import { useTranslations } from "next-intl";

export default function ServicesPage() {
  const t = useTranslations("Services");
  const ht = useTranslations("Home");

  const serviceImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1581092580497-e0d23cb61402?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1581092921461-eab62e92c733?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2070"
  ];

  const serviceIcons = [
    "fas fa-ship",
    "fas fa-vector-square",
    "fas fa-magic",
    "fas fa-monument"
  ];

  const processIcons = [
    "fas fa-search",
    "fas fa-microchip",
    "fas fa-gem",
    "fas fa-house-chimney"
  ];

  return (
    <main className="projects-page-wrapper">
      <Navbar />
      
      {/* Cinematic Hero */}
      <section className="projects-header-hero" style={{ background: `url('${serviceImages[0]}') center/cover` }}>
        <div className="hero-overlay-dark"></div>
        <div className="hero-content">
          <MotionWrapper variant="scaleReveal">
            <span className="badge-premium-large">{t("badge")}</span>
            <h1>{t("title")}</h1>
            <p>{t("desc")}</p>
          </MotionWrapper>
        </div>
      </section>

      {/* Luxury Services Grid Section */}
      <section className="services-grid-luxury">
        {[0, 1, 2, 3].map((index) => (
          <MotionWrapper 
            key={index} 
            delay={index * 0.15} 
            variant="blurIn" 
            className="service-card-premium-dark"
          >
            <div className="service-icon-luxury">
              <i className={serviceIcons[index]}></i>
            </div>
            <h2>{t(`list.${index}.title`)}</h2>
            <p>{t(`list.${index}.desc`)}</p>
            <div className="feature-tag-list">
              {[0, 1, 2].map((i) => (
                <div key={i} className="feature-tag-item">
                  <i className="fas fa-check-circle" style={{ color: 'var(--accent-gold)' }}></i>
                  {t(`list.${index}.features.${i}`)}
                </div>
              ))}
            </div>
          </MotionWrapper>
        ))}
      </section>

      {/* Craftsmanship Process Timeline */}
      <section className="process-section">
        <MotionWrapper variant="fadeUp">
          <span className="accent-badge" style={{ background: 'rgba(217, 164, 125, 0.15)' }}>{t("process.badge")}</span>
          <h2 className="title-expert" style={{ color: 'white' }}>{t("process.title")}</h2>
        </MotionWrapper>

        <div className="process-grid">
          {[0, 1, 2, 3].map((i) => (
            <MotionWrapper key={i} delay={i * 0.2} variant="blurIn" className="process-item">
              <div className="process-icon">
                <i className={processIcons[i]}></i>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>{t(`process.steps.${i}`)}</h3>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Final Premium CTA */}
      <section className="final-cta-luxury">
        <div className="cta-overlay-glow"></div>
        <div className="container relative z-10">
          <MotionWrapper variant="scaleReveal">
            <span className="accent-badge" style={{ background: 'rgba(217, 164, 125, 0.2)', color: 'var(--accent-gold)' }}>{ht("cta.badge")}</span>
            <h2 className="cta-title">{ht("cta.title")}</h2>
            <p className="cta-desc">{ht("cta.desc")}</p>
            
            <div className="cta-button-wrapper">
              <a 
                href="https://wa.me/967777079288" 
                className="btn-luxury-pulsing"
              >
                <i className="fab fa-whatsapp"></i>
                <span>{ht("cta.button")}</span>
              </a>
            </div>
          </MotionWrapper>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}

