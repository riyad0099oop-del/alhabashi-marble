"use client";
import Image from "next/image";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer id="footer" className="footer-premium">
            <div className="footer-top-grid">
                
                {/* Brand & Socials Column */}
                <div className="footer-brand-info">
                    <a href="#" className="footer-logo-premium">
                        <Image src="/images/logo.png" alt="Al Habashi" width={55} height={55} unoptimized />
                        <h3>الحبشي للرخام والجرانيت</h3>
                    </a>
                    <p>نفتخر في الحبشي للرخام والجرانيت بكوننا الوجهة الأولى في اليمن لاستيراد وتجهيز أرقى أنواع الحجر الطبيعي العالمي منذ أكثر من عقدين. جودتنا دائماً هي سر ثقتكم بمنتجاتنا.</p>
                    <div className="social-links-premium">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>

                {/* Quick Links Column */}
                <div className="footer-column">
                    <h4>روابط سريعة</h4>
                    <ul className="footer-quick-links">
                        <li><a href="/#home">الرئيسية</a></li>
                        <li><a href="/#showroom">صالة العرض</a></li>
                        <li><a href="/projects">مشاريعنا</a></li>
                        <li><a href="/care-guide">دليل العناية</a></li>
                    </ul>
                </div>

                {/* Contact Column */}
                <div className="footer-column">
                    <h4>تواصل معنا</h4>
                    <ul className="footer-contact-info">
                        <li>
                            <i className="fas fa-map-marker-alt"></i> 
                            <span>صنعاء - اليمن</span>
                        </li>
                        <li>
                            <i className="fas fa-phone-alt"></i> 
                            <span>المدير التنفيذي: 777079288</span>
                        </li>
                        <li>
                            <i className="fas fa-headset"></i> 
                            <span>المبيعات: 777713545</span>
                        </li>
                    </ul>
                </div>

                {/* Map Box */}
                <div className="footer-column">
                    <h4>موقعنا</h4>
                    <div className="footer-map-glass">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15383.18!2d44.2!3d15.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDI0JzAwLjAiTiA0NMKwMTInMDAuMCJF!5e0!3m2!1sar!2sye!4v1650000000000!5m2!1sar!2sye" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Al Habashi Location on Google Maps"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom-bar" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '30px 0' }}>
                <span style={{ opacity: 0.9 }}>&copy; {new Date().getFullYear()} جميع الحقوق محفوظة - الحبشي للرخام والجرانيت</span>
                <a href="https://wa.me/967774303491" target="_blank" rel="noopener noreferrer" className="dev-signature">
                    تصميم وتطوير: <span style={{ color: 'var(--accent-gold)', fontWeight: '700' }}>Riyad & Emad</span> 
                    <span style={{ margin: '0 8px', opacity: 0.5 }}>|</span>
                    <i className="fab fa-whatsapp" style={{ fontSize: '12px', marginLeft: '5px' }}></i>
                    774303491
                </a>
                
                <button onClick={scrollToTop} className="back-to-top" aria-label="العودة للأعلى">
                    <i className="fas fa-arrow-up"></i>
                </button>
            </div>
        </footer>
    );
}
