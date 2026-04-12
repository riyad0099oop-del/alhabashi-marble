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
                        <h3>مصنع الحبشي</h3>
                    </a>
                    <p>الرائد الأول في اليمن لاستيراد وتجهيز الرخام والجرانيت العالمي منذ أكثر من عقدين من الزمان. جودتنا سر بقائنا.</p>
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
                            <span>صنعاء - جولة عمران<br/>خط جدر الرئيسي</span>
                        </li>
                        <li>
                            <i className="fas fa-phone-alt"></i> 
                            <span>+967 777 079 288</span>
                        </li>
                        <li>
                            <i className="fas fa-envelope"></i> 
                            <span>sales@alhabashi.com</span>
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
            <div className="footer-bottom-bar">
                <span>تم التصميم بكل حب &copy; {new Date().getFullYear()} - مصنع الحبشي للرخام والجرانيت</span>
                
                <button onClick={scrollToTop} className="back-to-top" aria-label="العودة للأعلى">
                    <i className="fas fa-arrow-up"></i>
                </button>
            </div>
        </footer>
    );
}
