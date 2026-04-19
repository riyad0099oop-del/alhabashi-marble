"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function WhyUs() {
    const t = useTranslations("Home.WhyUs");

    const icons = ["fas fa-gem", "fas fa-microchip", "fas fa-medal"];

    return (
        <section id="why-us" className="why-us-premium">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="why-us-header"
            >
                <span className="badge-expert">{t("badge")}</span>
                <h2 className="title-expert">{t("title")}</h2>
                <p className="subtitle-expert">{t("desc")}</p>
            </motion.div>

            <div className="editorial-features-grid">
                {[0, 1, 2].map((i) => {
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
                            <i className={`${icons[i]} editorial-icon`}></i>
                            <h3>{t(`cards.${i}.title`)}</h3>
                            <p>{t(`cards.${i}.desc`)}</p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
