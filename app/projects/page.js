"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projectsData } from "../../data/projectsData";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ProjectsPage() {
    const [activeTab, setActiveTab] = useState("all");

    // Filter projects based on active tab
    const filteredProjects = activeTab === "all" 
        ? projectsData 
        : projectsData.filter(project => project.type === activeTab);

    return (
        <main className="projects-page-wrapper">
            <Navbar />
            
            {/* Page Hero */}
            <section className="projects-header-hero">
                <div className="hero-overlay-dark"></div>
                <div className="hero-content">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="badge-premium-large"
                    >
                        معرضنا الشامل
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        مشاريع الحبشي للرخام والجرانيت
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        تجوّل في معرضنا الرقمي واكتشف أرقى المنحوتات وتصاميم الحجر 
                        التي نفذناها لنخبة من عملائنا في اليمن.
                    </motion.p>
                </div>
            </section>

            {/* Sticky Filters Tab */}
            <section className="filters-wrapper">
                <div className="filter-tabs-luxury">
                    {[
                        { id: "all", label: "الكل" },
                        { id: "stairs", label: "الدرج" },
                        { id: "floors", label: "الصالات والأرضيات" },
                        { id: "kitchens", label: "المطابخ والمغاسل" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`filter-btn-luxury ${activeTab === tab.id ? "active" : ""}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Projects Gallery */}
            <motion.section layout className="projects-gallery-full">
                <AnimatePresence>
                    {filteredProjects.map((project, index) => (
                        <motion.div 
                            layout
                            key={project.id}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="project-card-gallery"
                        >
                            <div className="project-img-inner">
                                {/* The background color of .project-card-gallery handles the placeholder look while loading */}
                                <Image 
                                    src={project.image} 
                                    alt={project.title} 
                                    fill 
                                    style={{ objectFit: 'cover' }} 
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="project-next-image"
                                />
                                <div className="project-mask"></div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.section>

            <Footer />
        </main>
    );
}
