"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "../data/projectsData";

export default function Projects() {
    return (
        <section id="projects" className="projects-section-modern">
            <div className="container">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="projects-header"
                >
                    <span className="accent-badge">معرض الإنجازات</span>
                    <h2 className="section-title-modern">إبداعات صُنعت لتبقى</h2>
                    <p className="projects-subtitle">نحن لا نبيع الرخام فحسب، بل نصنع تحفاً فنية تزين مسكنك وتدوم للأجيال.</p>
                </motion.div>

                <div className="projects-bento-grid">
                    {projectsData.slice(0, 3).map((project, index) => {
                        // Creating a beautiful asymmetrical bento layout
                        const isLarge = index === 0;
                        const bentoClass = isLarge ? "bento-large" : "bento-wide";

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
                        <span>استكشف كافة مشروعاتنا</span>
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
