"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import WhatsAppButton from "../../../components/WhatsAppButton";
import MotionWrapper from "../../../components/MotionWrapper";
import { useTranslations } from "next-intl";

export default function CareGuidePage() {
  const t = useTranslations("CareGuide");

  const cleaningKeys = ["daily", "soap", "drying"];
  const cleaningIcons = ["fas fa-broom", "fas fa-soap", "fas fa-tint"];
  
  const stainKeys = ["response", "coffee", "oil"];
  const stainIcons = ["fas fa-stopwatch", "fas fa-coffee", "fas fa-burn"];

  return (
    <main className="projects-page-wrapper">
      <Navbar />
      
      {/* Editorial Hero Header */}
      <section className="projects-header-hero" style={{ background: "url('https://images.unsplash.com/photo-1600585154542-6379b1747311?auto=format&fit=crop&q=80&w=2070') center/cover" }}>
        <div className="hero-overlay-dark"></div>
        <div className="hero-content">
          <MotionWrapper variant="scaleReveal">
            <span className="badge-premium-large">{t("badge")}</span>
            <h1>{t("title")}</h1>
            <p>{t("desc")}</p>
          </MotionWrapper>
        </div>
      </section>

      {/* Daily Care - Luxury Cards */}
      <section className="cleaning-tips-section care-section">
        <div className="container">
          <MotionWrapper variant="fadeUp">
            <h2 className="section-title-modern care-section-title">{t("cleaning.title")}</h2>
          </MotionWrapper>

          <div className="tips-grid advice-grid">
            {cleaningKeys.map((key, i) => (
              <MotionWrapper key={key} delay={i * 0.2} variant="blurIn" className="tip-card advice-card">
                <div className="tip-icon-box advice-icon-wrapper">
                  <i className={cleaningIcons[i]}></i>
                </div>
                <h3>{t(`cleaning.${key}.title`)}</h3>
                <p>{t(`cleaning.${key}.text`)}</p>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Stain Management - Timeline Style */}
      <section className="stains-management-section care-section" style={{ background: 'var(--white)', padding: '100px 5%' }}>
        <div className="container">
          <div className="stains-layout">
            <MotionWrapper variant="fadeRight" className="stains-content-box">
              <h2 className="care-section-title" style={{ textAlign: 'start' }}>{t("stains.title")}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '1.1rem', lineHeight: '1.8' }}>
                {t("stains.desc")}
              </p>

              <div className="stains-timeline">
                {stainKeys.map((key, i) => (
                  <div key={key} className="stain-item">
                    <div className="stain-item-icon">
                      <i className={stainIcons[i]}></i>
                    </div>
                    <div className="stain-item-text">
                      <h4>{t(`stains.${key}.title`)}</h4>
                      <p>{t(`stains.${key}.text`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MotionWrapper>

            <MotionWrapper variant="scaleReveal" className="stains-image-box" style={{ position: 'relative', minHeight: '400px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1000" 
                  alt="Marble Care" 
                  className="rounded-3xl shadow-2xl object-cover w-full h-full"
                />
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* The Golden Rule - Warning Section */}
      <section className="golden-rule-section">
        <div className="container">
          <MotionWrapper variant="scaleReveal" className="golden-rule-card">
            <div className="golden-content">
              <i className="fas fa-exclamation-circle golden-icon"></i>
              <h2 className="title-expert" style={{ color: 'var(--accent-gold)' }}>{t("goldenRule.title")}</h2>
              <p className="rule-explanation">
                {t("goldenRule.text")}
              </p>

              <ul className="chemicals-list forbidden-list" style={{ listStyle: 'none', padding: 0 }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i} className="forbidden-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <i className="fas fa-times" style={{ color: '#ff4d4d' }}></i>
                    <span>{t(`goldenRule.list.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </MotionWrapper>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
