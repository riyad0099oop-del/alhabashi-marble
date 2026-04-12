"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";
import MotionWrapper from "../../components/MotionWrapper";
import Image from "next/image";

const services = [
  {
    title: "توريد الرخام والجرانيت العالمي",
    desc: "نحن جسركم نحو أرقى مقالع الحجر في العالم. نستورد خاماتنا مباشرة من إيطاليا، تركيا، والبرازيل، مع فحص دقيق للجودة قبل الشحن لضمان خلوها من العيوب الطبيعية وتناسق عروقها.",
    features: ["أرقى أنواع الكرارة الإيطالي", "جرانيت برازيلي شديد الصلابة", "رخام تركي بلمسات عصرية"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070",
    icon: "fas fa-ship"
  },
  {
    title: "هندسة القص وتشكيل الحجر",
    desc: "نحول الكتل الصخرية الضخمة إلى قطع فنية بدقة الليزر. نستخدم أحدث التقنيات لضمان تطابق العروق (Bookmatch) وتنفيذ أدق التفاصيل المعمارية للأدراج والكونترات والمغاسل.",
    features: ["قص ليزر متناهي الدقة", "تنسيق عروق احترافي", "تشكيل حواف يدوياً وآلياً"],
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cb61402?auto=format&fit=crop&q=80&w=2070",
    icon: "fas fa-vector-square"
  },
  {
    title: "التركيب الفني والجلي الإيطالي",
    desc: "لا ينتهي عملنا عند التسليم، بل يبدأ في موقعكم. فريقنا يتبع أعلى معايير التركيب الهندسي مع استخدام أفضل المواد الإيطالية لجلي وتلميع الرخام حتى يصبح كالمرايا العاكسة.",
    features: ["تركيب ميكانيكي وعادي", "تلميع كريستالي يدوم طويلاً", "عزل وحماية ضد البقع"],
    image: "https://images.unsplash.com/photo-1581092921461-eab62e92c733?auto=format&fit=crop&q=80&w=2070",
    icon: "fas fa-magic"
  },
  {
    title: "نحت الواجهات والديكورات",
    desc: "نصنع هوية فريدة لمبانيكم من خلال نحت الواجهات الخارجية والتيجان والأعمدة. ندمج بين صلابة الحجر الطبيعي وجمال التصميم المعماري الكلاسيكي والحديث.",
    features: ["نحت أعمدة وتيجان", "واجهات قصور وفلل", "ديكورات داخلية منحوتة"],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2070",
    icon: "fas fa-monument"
  }
];

export default function ServicesPage() {
  return (
    <main className="projects-page-wrapper">
      <Navbar />
      
      {/* Cinematic Hero */}
      <section className="projects-header-hero" style={{ background: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070') center/cover" }}>
        <div className="hero-overlay-dark"></div>
        <div className="hero-content">
          <MotionWrapper variant="scaleReveal">
            <span className="badge-premium-large">فخامة الحداثة</span>
            <h1>خدماتنا الحصرية</h1>
            <p>
              بين أصالة الأرض ودقة التكنولوجيا، نصيغ لكم عالماً من الرخام والجرانيت يعيد تعريف مفهوم الفخامة المعمارية.
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* Luxury Services Grid Section */}
      <section className="services-grid-luxury">
        {services.map((service, index) => (
          <MotionWrapper 
            key={index} 
            delay={index * 0.15} 
            variant="blurIn" 
            className="service-card-premium-dark"
          >
            <div className="service-icon-luxury">
              <i className={service.icon}></i>
            </div>
            <h2>{service.title}</h2>
            <p>{service.desc}</p>
            <div className="feature-tag-list">
              {service.features.map((feat, i) => (
                <div key={i} className="feature-tag-item">
                  <i className="fas fa-check-circle" style={{ color: 'var(--accent-gold)' }}></i>
                  {feat}
                </div>
              ))}
            </div>
          </MotionWrapper>
        ))}
      </section>

      {/* Craftsmanship Process Timeline */}
      <section className="process-section">
        <MotionWrapper variant="fadeUp">
          <span className="accent-badge" style={{ background: 'rgba(217, 164, 125, 0.15)' }}>من المقلع إلى القصر</span>
          <h2 className="title-expert" style={{ color: 'white' }}>دقة متناهية في كل مرحلة</h2>
        </MotionWrapper>

        <div className="process-grid">
          {[
            { t: "انتقاء الخام", i: "fas fa-search" },
            { t: "القص الدقيق", i: "fas fa-microchip" },
            { t: "الجلي الفائق", i: "fas fa-gem" },
            { t: "التركيب الفني", i: "fas fa-house-chimney" }
          ].map((step, i) => (
            <MotionWrapper key={i} delay={i * 0.2} variant="blurIn" className="process-item">
              <div className="process-icon">
                <i className={step.i}></i>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>{step.t}</h3>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Final Premium CTA */}
      <section className="final-cta-luxury">
        <div className="cta-overlay-glow"></div>
        <div className="container relative z-10">
          <MotionWrapper variant="scaleReveal">
            <span className="accent-badge" style={{ background: 'rgba(217, 164, 125, 0.2)', color: 'var(--accent-gold)' }}>خطوتك الأولى نحو التميز</span>
            <h2 className="cta-title">ابدأ رحلة الفخامة الآن</h2>
            <p className="cta-desc">فريقنا جاهز لتحويل تطلعاتكم المعمارية إلى واقع ملموس من الرخام والجرانيت.</p>
            
            <div className="cta-button-wrapper">
              <a 
                href="https://wa.me/967777079288" 
                className="btn-luxury-pulsing"
              >
                <i className="fab fa-whatsapp"></i>
                <span>اطلب استشارتك المجانية</span>
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

