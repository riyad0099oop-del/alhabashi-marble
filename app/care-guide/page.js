"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CareGuidePage() {
    return (
        <main className="care-page-wrapper">
            <Navbar />
            
            {/* الواجهة الأمامية - Hero */}
            <section className="care-hero">
                <div className="care-hero-overlay"></div>
                <div className="care-hero-content">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="care-badge"
                    >
                        خدمة ما بعد البيع
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="care-title"
                    >
                        دليل العناية بالرخام والحجر
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="care-subtitle"
                    >
                        لأننا نصنع تحفاً لتدوم أجيالاً، صممنا هذا الدليل لمساعدتك في الحفاظ 
                        على تألق رخام وحجر مسكنك بأساليب بسيطة وفعالة.
                    </motion.p>
                </div>
            </section>

            {/* القسم الأول: نصائح التنظيف */}
            <section className="care-section">
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="care-section-title"
                >
                    نصائح التنظيف للحفاظ على اللمعان
                </motion.h2>
                
                <div className="advice-grid">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="advice-card"
                    >
                        <div className="advice-icon-wrapper">
                            <i className="fas fa-broom"></i>
                        </div>
                        <h3>التنظيف اليومي</h3>
                        <p>
                            استخدم قطعة قماش ناعمة (مايكروفايبر) مبللة بقليل من الماء الدافئ لمسح الأتربة بدلاً من المكنسة القاسية التي قد تسبب خدوشاً مجهرية وتُطفئ لمعة الرخام.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="advice-card"
                    >
                        <div className="advice-icon-wrapper">
                            <i className="fas fa-soap"></i>
                        </div>
                        <h3>الصابون المناسب</h3>
                        <p>
                            اعتمد على الصابون المحايد (pH 7) المخصص للرخام الطبيعي. تجنب استخدام الإسفنجات الخشنة أو أدوات الجلي المعدنية للحفاظ على الطبقة الملساء في الحجر.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="advice-card"
                    >
                        <div className="advice-icon-wrapper">
                            <i className="fas fa-tint"></i>
                        </div>
                        <h3>التجفيف الفوري</h3>
                        <p>
                            المياه المتروكة على سطح الرخام لفترات طويلة قد تترك بقعاً جيرية بيضاء. احرص دائماً على تجفيف السطح فوراً بعد المسح المبلل باستخدام ممسحة قطنية.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* القسم الثاني: التعامل مع البقع */}
            <section className="care-section" style={{ background: 'var(--white)', padding: '100px 5%' }}>
                <div className="stains-layout">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="stains-content-box"
                    >
                        <h2 className="care-section-title" style={{ textAlign: 'right' }}>
                            التعامل مع البقع باحترافية
                        </h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '1.1rem', lineHeight: '1.8' }}>
                            المناطق المزدحمة مثل المطابخ أو كاونترات استقبال الصرافة معرضة بشكل دائم للانسكابات. السر كله يكمن في سرعة الاستجابة وخطوات العلاج الصحيحة:
                        </p>
                        
                        <div className="stain-item">
                            <div className="stain-item-icon"><i className="fas fa-stopwatch"></i></div>
                            <div className="stain-item-text">
                                <h4>سرعة الاستجابة</h4>
                                <p>امسح الانسكابات فور حدوثها (خاصة في المطابخ وكاونترات العمل) بطريقة "التربيت" والامتصاص بدلاً من فركها لكي لا تنتشر البقعة، خاصة المشروبات الملونة.</p>
                            </div>
                        </div>

                        <div className="stain-item">
                            <div className="stain-item-icon"><i className="fas fa-coffee"></i></div>
                            <div className="stain-item-text">
                                <h4>بقع الشاي والقهوة</h4>
                                <p>استخدم محلولاً خفيفاً من بيروكسيد الهيدروجين مع بضع قطرات من الأمونيا (بحذر شديد للرخام الفاتح فقط) واشطفه بماء نقي بسرعة.</p>
                            </div>
                        </div>

                        <div className="stain-item">
                            <div className="stain-item-icon"><i className="fas fa-burn"></i></div>
                            <div className="stain-item-text">
                                <h4>البقع الزيتية العميقة</h4>
                                <p>للزيوت الموجودة في المطابخ، يمكنك صنع معجون (poultice) من صودا الخبز والماء، ضعه على البقعة وغطه بغلاف بلاستيكي لـ 24 ساعة لامتصاص الزيت من أعماق الحجر.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="stains-image-box"
                    >
                        <Image 
                            src="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1000" 
                            alt="Clean Marble Kitchen Surface" 
                            fill 
                            style={{ objectFit: 'cover' }} 
                        />
                    </motion.div>
                </div>
            </section>

            {/* القسم الثالث: القاعدة الذهبية */}
            <section className="golden-rule-section">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="golden-rule-card"
                >
                    <div className="golden-content">
                        <i className="fas fa-exclamation-circle golden-icon"></i>
                        <h3>القاعدة الذهبية</h3>
                        <p>
                            الرخام والحجر الطبيعي يحتويان في تكوينهما الأساسي على كربونات الكالسيوم، مما يجعلها شديدة التفاعل والحساسية للأحماض. لحماية استثمارك في الرخام الفاخر، يُمنع منعاً باتاً استخدام المواد التالية:
                        </p>
                        <ul className="chemicals-list">
                            <li><i className="fas fa-times"></i> الخل والليمون</li>
                            <li><i className="fas fa-times"></i> منظفات الزجاج العادية</li>
                            <li><i className="fas fa-times"></i> الكلور (المبيضات) المباشرة</li>
                            <li><i className="fas fa-times"></i> الفلاش والأسيد المنظف للحمامات</li>
                            <li><i className="fas fa-times"></i> أي منظف كيميائي قاسي</li>
                        </ul>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
