"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "../i18n/routing";
import { projectsData } from "../data/projectsData";
import { useTranslations } from "next-intl";

export default function Projects() {
    const t = useTranslations("Projects");

    return (
        <section id="projects" className="projects-section-modern">
            <div className="container">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="projects-header"
                >
                    <span className="accent-badge">{t("badge")}</span>
                    <h2 className="section-title-modern">{t("title")}</h2>
                    <p className="projects-subtitle">{t("subtitle")}</p>
                </motion.div>

                <div className="projects-bento-grid">
                    {projectsData.slice(0, 5).map((project, index) => {
                        // Advanced Bento Logic
                        let bentoClass = "bento-small";
                        if (index === 0) bentoClass = "bento-large";
                        if (index === 1 || index === 2) bentoClass = "bento-wide";

                        return (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                                className={`project-card-premium ${bentoClass}`}
                            >
                                <div className="project-img-inner">
                                    <Image 
                                        src={project.image} 
                                        alt={project.title} 
                                        fill 
                                        style={{ objectFit: 'cover' }} 
                                        className="project-next-image"
                                    />
                                    <div className="project-mask"></div>
                                    <div className="project-info-overlay">
                                        <span className="project-type-tag">{t(`filters.${project.type}`)}</span>
                                        <h3>{project.title}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="projects-action-center"
                >
                    <Link href="/projects" className="btn-explore-luxury">
                        <span>{t("exploreMore")}</span>
                        <i className={`fas ${t("filters.all") === "كل الإبداعات" ? "fa-arrow-left" : "fa-arrow-right"}`}></i>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
