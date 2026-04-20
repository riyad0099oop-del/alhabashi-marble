"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MotionWrapper from "../../../components/MotionWrapper";
import WhatsAppButton from "../../../components/WhatsAppButton";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ContactPage() {
  const { locale } = useParams();
  const isRtl = locale === 'ar';
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    projectType: "palaces",
    honeypot: ""
  });
  const [error, setError] = useState("");

  const t = useTranslations("Contact");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setError("");

    // Restriction Logic
    if (name === "phone") {
      // Only allow digits
      const digitsOnly = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: digitsOnly }));
    } else if (name === "name") {
      // Only allow letters and spaces
      const lettersOnly = value.replace(/[0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: lettersOnly }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validatePhone = (phone) => {
    const regex = /^(77|73|71|70|78)\d{7}$/;
    return regex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.honeypot) return;

    if (formData.name.trim().length < 3) {
      setError(isRtl ? "يرجى إدخال اسمك الكامل (3 أحرف على الأقل)" : "Please enter your full name (min 3 chars)");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError(isRtl ? "رقم الهاتف غير صحيح. يجب أن يبدأ بـ 77، 73، 71، 70، أو 78 ويتكون من 9 أرقام." : "Invalid phone. Must start with 77, 73, 71, 70, or 78 and be 9 digits.");
      return;
    }
    
    const message = `${t("form.waMessagePrefix")}\n\n${t("form.nameLabel")}: ${formData.name}\n${t("form.phoneLabel")}: ${formData.phone}\n${t("form.typeLabel")}: ${t(`form.types.${formData.projectType}`)}\n\n${t("form.waMessageSuffix")}`;
    const waUrl = `https://wa.me/967${formData.phone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };


  return (
    <main className="projects-page-wrapper">
      <Navbar />

      {/* Hero Header */}
      <section className="projects-header-hero" style={{ background: "url('https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=2070') center/cover" }}>
        <div className="hero-overlay-dark"></div>
        <div className="hero-content">
          <MotionWrapper variant="scaleReveal">
            <span className="badge-premium-large">{t("badge")}</span>
            <h1>{t("title")}</h1>
            <p>{t("desc")}</p>
          </MotionWrapper>
        </div>
      </section>

      {/* Direct Contact Cards */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <MotionWrapper variant="scaleReveal" delay={0.1}>
            <a href="tel:777079288" className="contact-card-luxury-v2">
              <div className="contact-icon-wrapper">
                <i className="fas fa-user-tie"></i>
              </div>
              <div className="contact-text-content">
                <h3>{t("cards.ceo")}</h3>
                <p className="phone-number">777-079-288</p>
              </div>
              <span className="contact-status-badge">{t("cards.directCall")}</span>
            </a>
          </MotionWrapper>

          <MotionWrapper variant="scaleReveal" delay={0.2}>
            <a href="tel:777713545" className="contact-card-luxury-v2">
              <div className="contact-icon-wrapper">
                <i className="fas fa-headset"></i>
              </div>
              <div className="contact-text-content">
                <h3>{t("cards.sales")}</h3>
                <p className="phone-number">777-713-545</p>
              </div>
              <span className="contact-status-badge">{t("cards.inquiries")}</span>
            </a>
          </MotionWrapper>
        </div>
      </section>

      {/* VIP Inquiry Form Section */}
      <section style={{ padding: '80px 20px', background: 'var(--bg-light)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
          <MotionWrapper variant="scaleReveal">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <h2 style={{ color: 'var(--primary-brown)', fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 900, lineHeight: '1.3' }}>
                {t("form.title")}
              </h2>
              <div style={{ width: '80px', height: '4px', background: 'var(--accent-gold)', borderRadius: '2px' }}></div>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '650px', margin: '10px auto 0', lineHeight: '1.8', fontWeight: 500, padding: '0 15px' }}>
                {t("form.subtitle")}
              </p>
            </div>
          </MotionWrapper>
        </div>

        <MotionWrapper variant="blurIn" className="vip-form-container" style={{ background: 'var(--white)', border: '1px solid rgba(78, 46, 30, 0.08)', boxShadow: '0 40px 80px rgba(0,0,0,0.06)', borderRadius: '30px', padding: 'clamp(30px, 5vw, 60px)', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <form onSubmit={handleSubmit}>
            {/* Honeypot field (hidden) */}
            <input 
              type="text" 
              name="honeypot" 
              value={formData.honeypot} 
              onChange={handleInputChange} 
              style={{ display: 'none' }} 
              tabIndex="-1" 
              autoComplete="off" 
            />

            <div className="vip-input-group">
              <label className="vip-label" style={{ color: 'var(--primary-brown)', fontWeight: 700 }}>{t("form.nameLabel")}</label>
              <input 
                type="text" 
                name="name" 
                className="vip-input" 
                style={{ background: '#fcfaf8', borderRadius: '15px' }}
                placeholder={t("form.namePlace")} 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="vip-input-group">
              <label className="vip-label" style={{ color: 'var(--primary-brown)', fontWeight: 700 }}>{t("form.phoneLabel")}</label>
              <input 
                type="tel" 
                name="phone" 
                className="vip-input" 
                style={{ background: '#fcfaf8', borderRadius: '15px' }}
                placeholder={t("form.phonePlace")} 
                value={formData.phone}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="vip-input-group">
              <label className="vip-label" style={{ color: 'var(--primary-brown)', fontWeight: 700 }}>{t("form.typeLabel")}</label>
              <select 
                name="projectType" 
                className="vip-select"
                style={{ background: '#fcfaf8', borderRadius: '15px' }}
                value={formData.projectType}
                onChange={handleInputChange}
              >
                <option value="palaces">{t("form.types.palaces")}</option>
                <option value="villas">{t("form.types.villas")}</option>
                <option value="hotels">{t("form.types.hotels")}</option>
                <option value="towers">{t("form.types.towers")}</option>
                <option value="commercial">{t("form.types.commercial")}</option>
                <option value="other">{t("form.types.other")}</option>
              </select>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                style={{ color: '#e07060', background: 'rgba(224, 112, 96, 0.1)', padding: '12px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', border: '1px solid rgba(224, 112, 96, 0.2)' }}
              >
                <i className="fas fa-exclamation-circle" style={{ marginInlineEnd: '8px' }}></i>
                {error}
              </motion.div>
            )}

            <button type="submit" className="btn-vip-coordinate" style={{ height: '70px', borderRadius: '20px', fontSize: '1.2rem' }}>
              <span>{t("form.submit")}</span>
              <i className="fas fa-calendar-check"></i>
            </button>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '30px', textAlign: 'center', fontWeight: 'bold' }}>
              * {t("form.noteprefix")} <span style={{ color: 'var(--accent-gold)' }}>{t("form.notesuffix")}</span>.
            </p>
          </form>
        </MotionWrapper>
      </section>

      {/* Cohesive Luxury Info Bar */}
      <section style={{ position: 'relative', background: 'var(--white)', padding: '100px 0' }}>
        <div style={{ width: '100px', height: '1px', background: 'var(--accent-gold)', margin: '0 auto 80px', opacity: 0.3 }}></div>

        <div className="max-w-4xl mx-auto px-4 ultimate-center-wrapper">
          <MotionWrapper variant="scaleReveal">
            <div className="luxury-info-pill">
              
              <div className="pill-item">
                <div className="pill-icon">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <div className="pill-text">
                  <span className="pill-label">{t("info.location")}</span>
                  <p className="pill-value">{t("info.locationValue") || "Sana'a - Yemen"}</p>
                </div>
              </div>

              <div className="pill-divider"></div>

              <div className="pill-item">
                <div className="pill-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="pill-text">
                  <span className="pill-label">{t("info.hours")}</span>
                  <div className="flex flex-col">
                    <p className="pill-value">{t("info.days")}</p>
                    <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 800 }}>{t("info.friday")}</span>
                  </div>
                </div>
              </div>

            </div>
          </MotionWrapper>
        </div>
      </section>


      <style jsx>{`
        .projects-page-wrapper {
          background: #fff;
        }

        .projects-header-hero {
          height: 60vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
        }

        .hero-overlay-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(15,10,7,0.8), rgba(15,10,7,0.4));
          backdrop-filter: blur(2px);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 800px;
          padding: 0 20px;
        }

        .hero-content h1 {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 900;
          margin: 20px 0;
          line-height: 1.1;
        }

        /* V2 Luxury Cards */
        .contact-card-luxury-v2 {
          display: flex;
          align-items: center;
          gap: 25px;
          background: #fff;
          border: 1px solid rgba(78, 46, 30, 0.08);
          padding: 35px;
          border-radius: 24px;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        .contact-card-luxury-v2:hover {
          transform: translateY(-10px);
          border-color: #d9a47d;
          box-shadow: 0 25px 50px rgba(78, 46, 30, 0.08);
        }

        .contact-icon-wrapper {
          width: 70px;
          height: 70px;
          background: #fcf6ba15;
          border: 1px solid #d9a47d30;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: #bf953f;
          transition: 0.3s;
        }

        .contact-card-luxury-v2:hover .contact-icon-wrapper {
          background: #bf953f;
          color: #fff;
          transform: rotate(-5deg);
        }

        .contact-text-content h3 {
          font-size: 1.3rem;
          color: #2d1b0e;
          margin-bottom: 5px;
          font-weight: 700;
        }

        .phone-number {
          font-size: 1.1rem;
          color: #666;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .contact-status-badge {
          position: absolute;
          top: 20px;
          inset-inline-end: 20px;
          background: #fdfaf7;
          border: 1px solid #d9a47d30;
          padding: 5px 15px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #bf953f;
          text-transform: uppercase;
        }

        /* VIP Form Section */
        .vip-form-section {
          padding: 100px 20px;
          background: #fdfaf7;
        }

        .badge-gold-outline {
          border: 1px solid #d9a47d;
          color: #bf953f;
          padding: 6px 18px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 20px;
          display: inline-block;
        }

        .section-title-luxury {
          font-size: clamp(2rem, 5vw, 3.5rem);
          color: #2d1b0e;
          font-weight: 900;
          margin: 15px 0;
        }

        .luxury-divider {
          width: 60px;
          height: 3px;
          background: #d9a47d;
          margin: 0 auto 25px;
        }

        .section-subtitle-luxury {
          color: #666;
          font-size: 1.1rem;
          line-height: 1.8;
          font-weight: 500;
        }

        .vip-form-glass-container {
          background: #fff;
          max-width: 850px;
          margin: 0 auto;
          border-radius: 40px;
          padding: 60px;
          border: 1px solid rgba(217,164,125,0.1);
          box-shadow: 0 40px 100px rgba(45,27,14,0.05);
        }

        .luxury-contact-form {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .vip-input-group label {
          display: block;
          margin-bottom: 12px;
          font-weight: 700;
          color: #2d1b0e;
          font-size: 0.95rem;
          padding-inline-start: 5px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-wrapper i {
          position: absolute;
          inset-inline-start: 20px;
          color: #d9a47d;
          opacity: 0.6;
        }

        .input-wrapper input, .input-wrapper select {
          width: 100%;
          padding: 18px 25px;
          padding-inline-start: 55px;
          background: #fcfaf8;
          border: 1px solid rgba(217,164,125,0.1);
          border-radius: 18px;
          font-size: 1rem;
          color: #2d1b0e;
          transition: 0.3s;
          outline: none;
        }

        .input-wrapper input:focus, .input-wrapper select:focus {
          background: #fff;
          border-color: #d9a47d;
          box-shadow: 0 10px 20px rgba(217,164,125,0.08);
        }

        .btn-luxury-submit {
          margin-top: 20px;
          background: #2d1b0e;
          color: #fff;
          border: none;
          padding: 22px 40px;
          border-radius: 20px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          transition: 0.4s;
          position: relative;
          overflow: hidden;
        }

        .btn-luxury-submit:hover {
          background: #bf953f;
          transform: scale(1.02);
          box-shadow: 0 20px 40px rgba(191,149,63,0.3);
        }

        .form-footer-note {
          text-align: center;
          font-size: 0.9rem;
          color: #999;
          font-weight: 500;
        }

        .gold-text { color: #bf953f; font-weight: 700; }

        /* Info Pill V2 */
        .luxury-info-pill {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: var(--white);
          backdrop-filter: blur(20px);
          border: 2.5px solid var(--accent-gold);
          border-radius: 100px;
          padding: 30px 60px;
          box-shadow: 0 30px 70px rgba(78, 46, 30, 0.12);
          max-width: 900px;
          margin: 0 auto;
          transition: all 0.5s ease;
        }

        .luxury-info-pill:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 70px rgba(217, 164, 125, 0.15);
          border-color: var(--accent-gold);
        }

        .pill-divider {
          width: 2px;
          height: 60px;
          background: var(--accent-gold);
          opacity: 0.4;
        }

        .pill-item {
          display: flex;
          align-items: center;
          gap: 20px;
          text-align: right;
        }

        .pill-icon {
          font-size: 2rem;
          color: var(--accent-gold);
          background: rgba(217, 164, 125, 0.1);
          width: 65px;
          height: 65px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: 0.3s;
        }

        .pill-text { display: flex; flex-direction: column; }

        .pill-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
        }

        .pill-value {
          font-size: 1.25rem;
          color: var(--primary-brown);
          font-weight: 800;
        }

        .luxury-info-pill-v2 {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border: 1px solid rgba(217,164,125,0.15);
          padding: 25px 50px;
          border-radius: 100px;
          gap: 50px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.03);
        }

        .pill-segment {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .pill-icon-box {
          font-size: 1.6rem;
          color: #bf953f;
        }

        .pill-info-text .label {
          display: block;
          font-size: 0.75rem;
          font-weight: 800;
          color: #bf953f;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 2px;
        }

        .pill-info-text .value {
          font-size: 1.1rem;
          font-weight: 700;
          color: #2d1b0e;
        }

        .pill-vertical-divider {
          width: 1px;
          height: 40px;
          background: rgba(217,164,125,0.2);
        }

        .friday-tag {
          font-size: 0.85rem;
          font-weight: 800;
          color: #d9a47d;
        }

        .luxury-divider-horizontal {
          width: 100px;
          height: 1px;
          background: #d9a47d40;
          margin: 0 auto;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .projects-header-hero {
            height: 50vh;
          }
          
          .hero-content h1 {
            font-size: 2.2rem;
          }

          .contact-card-luxury-v2 {
            flex-direction: row;
            text-align: start;
            padding: 20px 15px;
            gap: 15px;
            align-items: center;
          }

          .contact-icon-wrapper {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
            min-width: 50px;
          }

          .contact-text-content h3 {
            font-size: 1.1rem;
            margin-bottom: 2px;
          }

          .phone-number {
            font-size: 0.95rem;
          }

          .contact-status-badge {
            display: none; /* Hide badge on small mobile to save space if needed, or keep it small */
          }

          .vip-form-container {
            padding: 30px 20px !important;
            border-radius: 20px !important;
          }

          .luxury-info-pill {
            flex-direction: column;
            border-radius: 24px;
            padding: 30px 20px;
            gap: 30px;
          }

          .pill-divider {
            width: 50px;
            height: 1px;
            margin: 0;
          }

          .btn-vip-coordinate {
            height: 60px !important;
            font-size: 1.1rem !important;
          }
          
          .pill-item {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
        }
      `}</style>


      <Footer />
      <WhatsAppButton />
    </main>
  );
}
