"use client";

import { motion } from "framer-motion";
import { features } from "../data/features";

export default function WhyUs() {
    return (
        <section id="why-us" className="why-us-premium">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="why-us-header"
            >
                <span className="badge-expert">الاحترافية في التفاصيل</span>
                <h2 className="title-expert">لماذا يختارنا الخبراء؟</h2>
                <p className="subtitle-expert">
                    صياغة قصص الفخامة والجمال بأسلوب فني رفيع يجمع بين أصالة الحجر ودقة المعمار.
                </p>
            </motion.div>

            <div className="editorial-features-grid">
                {features.map((f, i) => {
                    // Make the middle card slightly taller (center-card)
                    const isCenter = i === 1;
                    return (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                            className={`editorial-card ${isCenter ? 'center-card' : ''}`}
                        >
                            <i className={`${f.icon} editorial-icon`}></i>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
