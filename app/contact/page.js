"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MotionWrapper from "../../components/MotionWrapper";
import WhatsAppButton from "../../components/WhatsAppButton";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    projectType: "قصور"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct WhatsApp Message
    const message = `السلام عليكم، أود طلب استشارة VIP مع خبراء الحبشي.\n\nالاسم: ${formData.name}\nرقم الهاتف: ${formData.phone}\nنوع المشروع: ${formData.projectType}\n\nأتطلع للتواصل معكم لتنسيق الموعد.`;
    
    const waUrl = `https://wa.me/967777079288?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
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
            <span className="badge-premium-large">تواصل معنا</span>
            <h1>نحن هنا لتنفيذ رؤيتكم</h1>
            <p>
              سواء كنت تخطط لمشروع قادم أو تحتاج لاستشارة فنية، فإن خبراء الحبشي للرخام والجرانيت مستعدون لتحويل رؤيتك إلى واقع ملموس.
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* Direct Contact Cards */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <MotionWrapper variant="scaleReveal" delay={0.1}>
            <a href="tel:777079288" className="contact-card-luxury">
              <div style={{ background: 'rgba(217,164,125,0.1)', padding: '20px', borderRadius: '50%', color: 'var(--accent-gold)', fontSize: '2rem' }}>
                <i className="fas fa-user-tie"></i>
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-brown)', marginBottom: '5px' }}>المدير التنفيذي</h3>
                <p style={{ color: 'var(--text-muted)', fontWeight: 800, direction: 'ltr', display: 'inline-block', letterSpacing: '1px' }}>777-079-288</p>
              </div>
              <span className="accent-badge" style={{ fontSize: '0.8rem', padding: '5px 15px' }}>اتصال مباشر</span>
            </a>
          </MotionWrapper>

          <MotionWrapper variant="scaleReveal" delay={0.2}>
            <a href="tel:777713545" className="contact-card-luxury">
              <div style={{ background: 'rgba(217,164,125,0.1)', padding: '20px', borderRadius: '50%', color: 'var(--accent-gold)', fontSize: '2rem' }}>
                <i className="fas fa-headset"></i>
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-brown)', marginBottom: '5px' }}>قسم المبيعات</h3>
                <p style={{ color: 'var(--text-muted)', fontWeight: 800, direction: 'ltr', display: 'inline-block', letterSpacing: '1px' }}>777-713-545</p>
              </div>
              <span className="accent-badge" style={{ fontSize: '0.8rem', padding: '5px 15px' }}>استفسارات المبيعات</span>
            </a>
          </MotionWrapper>
        </div>
      </section>

      {/* VIP Inquiry Form - Ultra Refined Version */}
      <section className="py-24 px-4" style={{ background: 'var(--bg-light)' }}>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <MotionWrapper variant="scaleReveal">
            <div className="flex flex-col items-center gap-4">
              <span className="accent-badge" style={{ background: 'var(--accent-gold)', color: 'white', padding: '6px 20px', borderRadius: '50px', fontSize: '0.85rem' }}>بوابة المشاريع الكبرى</span>
              <h2 style={{ color: 'var(--primary-brown)', fontSize: '3rem', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: '1.2' }}>
                احجز موقعك في <span style={{ color: 'var(--accent-gold)' }}>قائمة النخبة</span>
              </h2>
              <div style={{ width: '60px', height: '3px', background: 'var(--accent-gold)', borderRadius: '2px' }}></div>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '650px', margin: '10px auto 0', lineHeight: '1.8', fontWeight: 500 }}>
                سيتواصل معك أحد مستشارينا لتنسيق تفاصيل مشروعك وضمان أعلى جودة تنفيذ.
              </p>
            </div>
          </MotionWrapper>
        </div>

        <MotionWrapper variant="blurIn" className="vip-form-container" style={{ background: 'white', border: '1px solid rgba(78, 46, 30, 0.08)', boxShadow: '0 40px 80px rgba(0,0,0,0.06)', borderRadius: '40px' }}>
          <form onSubmit={handleSubmit}>
            <div className="vip-input-group">
              <label className="vip-label" style={{ color: 'var(--primary-brown)', fontWeight: 700 }}>لمن نتشرف بتقديم الاستشارة؟</label>
              <input 
                type="text" 
                name="name" 
                className="vip-input" 
                style={{ background: '#fcfaf8', borderRadius: '15px' }}
                placeholder="الاسم الكامل" 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="vip-input-group">
              <label className="vip-label" style={{ color: 'var(--primary-brown)', fontWeight: 700 }}>كيف يمكن لخبراءنا الوصول إليكم؟</label>
              <input 
                type="tel" 
                name="phone" 
                className="vip-input" 
                style={{ background: '#fcfaf8', borderRadius: '15px' }}
                placeholder="رقم الهاتف" 
                value={formData.phone}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="vip-input-group">
              <label className="vip-label" style={{ color: 'var(--primary-brown)', fontWeight: 700 }}>ما هو نوع المشروع؟</label>
              <select 
                name="projectType" 
                className="vip-select"
                style={{ background: '#fcfaf8', borderRadius: '15px' }}
                value={formData.projectType}
                onChange={handleInputChange}
              >
                <option value="قصور">قصور</option>
                <option value="فلل فاخرة">فلل فاخرة</option>
                <option value="فنادق">فنادق</option>
                <option value="أبراج سكنية">أبراج سكنية</option>
                <option value="مطاعم وكافيهات">مطاعم وكافيهات</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>

            <button type="submit" className="btn-vip-coordinate" style={{ height: '70px', borderRadius: '20px', fontSize: '1.2rem' }}>
              <span>نسق موعدك مع الخبراء</span>
              <i className="fas fa-calendar-check"></i>
            </button>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '30px', textAlign: 'center', fontWeight: 'bold' }}>
              * سيتم تحويلك مباشرة للواتساب للتواصل مع <span style={{ color: 'var(--accent-gold)' }}>المدير</span>.
            </p>
          </form>
        </MotionWrapper>
      </section>

      {/* Cohesive Luxury Info Bar - Non-Square Concept */}
      <section className="py-32 bg-white" style={{ position: 'relative' }}>
        {/* Subtle Section Divider */}
        <div style={{ width: '100px', height: '1px', background: 'var(--accent-gold)', margin: '0 auto 80px', opacity: 0.3 }}></div>

        <div className="max-w-4xl mx-auto px-4 ultimate-center-wrapper">
          <MotionWrapper variant="scaleReveal">
            <div className="luxury-info-pill">
              
              {/* Address Header */}
              <div className="pill-item">
                <div className="pill-icon">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <div className="pill-text">
                  <span className="pill-label">الموقع الرئيسي</span>
                  <p className="pill-value">صنعاء - اليمن</p>
                </div>
              </div>

              {/* Elegant Vertical Divider */}
              <div className="pill-divider"></div>

              {/* Hours Header */}
              <div className="pill-item">
                <div className="pill-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="pill-text">
                  <span className="pill-label">ساعات العمل</span>
                  <div className="flex flex-col">
                    <p className="pill-value">السبت - الخميس: 8ص - 8م</p>
                    <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 800 }}>الجمعة: إجازة رسمية</span>
                  </div>
                </div>
              </div>

            </div>
          </MotionWrapper>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
