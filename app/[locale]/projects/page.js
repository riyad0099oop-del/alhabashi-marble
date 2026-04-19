"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import WhatsAppButton from "../../../components/WhatsAppButton";
import MotionWrapper from "../../../components/MotionWrapper";
import Image from "next/image";
import { projectsData } from "../../../data/projectsData";
import { useTranslations } from "next-intl";

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12); // Initial count: 12 projects
  const t = useTranslations("Projects");

  const filteredProjects = filter === "all" 
    ? projectsData 
    : projectsData.filter(p => p.type === filter);

  // Get only the visible subset of projects
  const visibleProjects = filteredProjects.slice(0, visibleCount);

  // Helper to get translated project info with fallback
  const getProjectInfo = (project) => {
    const hasTranslation = t.has(`items.${project.id}.title`);
    return {
      title: hasTranslation ? t(`items.${project.id}.title`) : project.title,
      category: hasTranslation ? t(`items.${project.id}.cat`) : project.category
    };
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  return (
    <main className="projects-page-wrapper">
      <Navbar />
      
      {/* Cinematic Hero Header */}
      <section className="projects-header-hero" style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2070')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="hero-overlay-dark"></div>
        <div className="hero-content">
          <MotionWrapper variant="scaleReveal">
            <span className="badge-premium-large">{t("badge")}</span>
            <h1>{t("title")}</h1>
            <p>{t("subtitle")}</p>
          </MotionWrapper>
        </div>
      </section>

      {/* Advanced Filter Navigation */}
      <section className="filter-luxury-bar">
        <div className="filter-nav-pills">
          {["all", "floors", "stairs", "kitchens"].map((f) => (
            <button 
              key={f}
              className={`filter-pill ${filter === f ? 'active' : ''}`}
              onClick={() => {
                setFilter(f);
                setVisibleCount(12); // Reset count on filter change
              }}
            >
              {t(`filters.${f}`)}
            </button>
          ))}
        </div>
      </section>

      {/* High-End Projects Masonry-like Grid */}
      <section className="projects-grid-premium">
        {visibleProjects.map((project, index) => {
          const info = getProjectInfo(project);
          return (
            <MotionWrapper 
              key={project.id} 
              delay={index % 12 * 0.05} 
              variant="blurIn" 
              className={`project-card-premium ${project.size || 'small'}`}
            >
              <div className="project-img-inner">
                <Image 
                  src={project.image} 
                  alt={info.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }} 
                  className="project-next-image"
                  loading={index < 4 ? "eager" : "lazy"} // Prioritize first 4
                />
                <div className="project-mask"></div>
                <div className="project-info-overlay">
                  <span className="project-type-tag">{t(`filters.${project.type}`)}</span>
                  <h3>{info.title}</h3>
                  <p>{info.category}</p>
                </div>
              </div>
            </MotionWrapper>
          );
        })}
      </section>

      {/* Load More Button */}
      {visibleCount < filteredProjects.length && (
        <section style={{ textAlign: 'center', padding: '40px 0 100px' }}>
          <button 
            onClick={handleLoadMore}
            className="btn-luxury-pulsing"
            style={{ cursor: 'pointer', border: 'none' }}
          >
            <i className="fas fa-plus-circle"></i>
            <span>{t.has("exploreMore") ? t("exploreMore") : "عرض المزيد"}</span>
          </button>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
