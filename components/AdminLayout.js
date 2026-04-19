"use client";

import { Link } from "../i18n/routing";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function AdminLayout({ children, locale }) {
  const pathname = usePathname();
  const isRtl = locale === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = isRtl ? [
    { label: "نظرة عامة", icon: "fas fa-chart-line", href: "/admin" },
    { label: "المشاريع", icon: "fas fa-project-diagram", href: "/admin/projects" },
    { label: "المنتجات", icon: "fas fa-gem", href: "/admin/products" },
    { label: "الترجمات", icon: "fas fa-language", href: "/admin/translations" },
    { label: "الإعدادات", icon: "fas fa-cog", href: "/admin/settings" },
  ] : [
    { label: "Overview", icon: "fas fa-chart-line", href: "/admin" },
    { label: "Projects", icon: "fas fa-project-diagram", href: "/admin/projects" },
    { label: "Products", icon: "fas fa-gem", href: "/admin/products" },
    { label: "Translations", icon: "fas fa-language", href: "/admin/translations" },
    { label: "Settings", icon: "fas fa-cog", href: "/admin/settings" },
  ];

  const handleLogout = async () => {
    const { logout } = await import("@/lib/auth");
    await logout();
    window.location.href = `/${locale}/admin/login`;
  };

  return (
    <div className="admin-dashboard-wrapper" dir={isRtl ? "rtl" : "ltr"}>
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="admin-logo">
            <span className="logo-accent">R</span>
            {isRtl ? " لوحة التحكم" : " IYAD ADMIN"}
          </div>
          <button className="btn-close-sidebar" onClick={() => setIsSidebarOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = pathname === `/${pathname.split('/')[1]}${item.href}`;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-nav" 
                    className="active-indicator" 
                  />
                )}
              </Link>
            );
          })}
          
          <button onClick={handleLogout} className="nav-item logout-btn" style={{ marginTop: 'auto', border: 'none', background: 'none', cursor: 'pointer', width: '100%', textAlign: 'inherit' }}>
            <i className="fas fa-sign-out-alt"></i>
            <span>{isRtl ? "تسجيل الخروج" : "Logout"}</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <Link href="/" className="btn-back-site">
            <i className="fas fa-external-link-alt"></i>
            <span>{isRtl ? "عرض الموقع" : "View Site"}</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-top-bar">
          <div className="top-bar-left">
            <button className="btn-menu-toggle" onClick={() => setIsSidebarOpen(true)}>
              <i className="fas fa-bars"></i>
            </button>
            <div className="page-info">
               <h1>{isRtl ? "لوحة التحكم" : "Dashboard"}</h1>
            </div>
          </div>
          <div className="admin-profile">
            <div className="profile-badge">A</div>
            <span>{isRtl ? "المدير العام" : "Administrator"}</span>
          </div>
        </header>



        <section className="admin-content-area">
          {children}
        </section>
      </main>

      <style jsx global>{`
        :root {
          --adm-bg: #0f0a07;
          --adm-surface: #1a120b;
          --adm-surface2: #231810;
          --adm-border: rgba(217,164,125,0.12);
          --adm-gold: #d9a47d;
          --adm-text: #f3e5d8;
          --adm-muted: rgba(243,229,216,0.45);
        }
        .admin-dashboard-wrapper {
          display: flex;
          min-height: 100vh;
          background: var(--adm-bg);
          color: var(--adm-text);
          font-family: var(--font-tajawal), sans-serif;
        }
        .admin-sidebar {
          width: 270px;
          background: var(--adm-surface);
          border-inline-end: 1px solid var(--adm-border);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          padding: 30px;
          z-index: 1001;
          transition: transform 0.3s ease;
        }

        .btn-close-sidebar, .btn-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--adm-text);
          font-size: 1.5rem;
          cursor: pointer;
        }

        .admin-logo {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-accent {
          color: #d9a47d;
          margin-inline-end: 2px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px 15px;
          color: var(--adm-muted);
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-item i {
          width: 20px;
          font-size: 1.1rem;
        }

        .nav-item:hover, .nav-item.active {
          color: var(--adm-text);
          background: rgba(217,164,125,0.08);
        }

        .active-indicator {
          position: absolute;
          inset-inline-start: 0;
          width: 3px;
          height: 20px;
          background: #d9a47d;
          border-radius: 0 4px 4px 0;
        }

        .btn-back-site {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #d9a47d;
          text-decoration: none;
          font-size: 0.9rem;
          padding: 10px;
          border: 1px solid rgba(191, 149, 63, 0.2);
          border-radius: 8px;
          transition: 0.3s;
        }

        .btn-back-site:hover {
          background: rgba(191, 149, 63, 0.1);
        }

        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .admin-top-bar {
          height: 80px;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--adm-border);
          background: rgba(15,10,7,0.7);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .top-bar-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .page-info h1 {
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--adm-text);
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .profile-badge {
          width: 35px;
          height: 35px;
          background: linear-gradient(135deg, #d9a47d, #fcf6ba, #b38728);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #000;
        }

        .admin-content-area {
          padding: 40px;
          flex: 1;
        }

        /* Common Page Styling */
        .admin-card-glass {
          background: var(--adm-surface);
          border: 1px solid var(--adm-border);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        /* Dashboard Home Specific */
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }
        .stat-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 25px;
        }
        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }
        .stat-content h3 {
          font-size: 0.85rem;
          color: var(--adm-muted);
          margin-bottom: 5px;
          font-weight: 400;
        }
        .stat-content p {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--adm-text);
        }
        .welcome-banner {
          grid-column: span 3;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, rgba(191,149,63,0.1) 0%, rgba(10,10,10,0.5) 100%);
          border: 1px solid rgba(191,149,63,0.2);
        }
        .banner-text h2 {
          font-size: 1.8rem;
          margin-bottom: 10px;
          color: #d9a47d;
        }
        .banner-text p {
          color: var(--adm-muted);
          max-width: 500px;
          line-height: 1.6;
        }
        .quick-actions {
          grid-column: span 1;
        }
        .quick-actions h3 {
          font-size: 1rem;
          margin-bottom: 20px;
          font-weight: 500;
        }
        .actions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .action-item {
          background: var(--adm-surface);
          border: 1px solid var(--adm-border);
          padding: 12px 15px;
          border-radius: 10px;
          color: var(--adm-text);
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: 0.3s;
          text-align: inherit;
          font-size: 0.9rem;
        }
        .action-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(5px);
        }
        .action-item i {
          color: #d9a47d;
        }
        .btn-primary-admin {
          background: #d9a47d;
          color: #000;
          border: none;
          padding: 12px 25px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }
        .btn-primary-admin:hover {
          background: #d4a74a;
          box-shadow: 0 5px 15px rgba(191,149,63,0.4);
        }

        /* Projects/Header Specific */
        .projects-admin-header, .admin-page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 30px;
        }
        .header-text h2 {
          font-size: 1.8rem;
          color: var(--adm-text);
          margin-bottom: 5px;
        }
        .header-text p {
          color: var(--adm-muted);
        }

        /* Projects Editor Styling */
        .projects-editor-container {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .editor-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .search-box {
          position: relative;
          width: 350px;
        }
        .search-box i {
          position: absolute;
          inset-inline-start: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--adm-muted);
        }
        .search-box input {
          width: 100%;
          background: var(--adm-surface);
          border: 1px solid var(--adm-border);
          padding: 12px 15px;
          padding-inline-start: 45px;
          border-radius: 12px;
          color: var(--adm-text);
          outline: none;
        }
        .btn-add-project {
          background: #d9a47d;
          color: #000;
          border: none;
          padding: 12px 25px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: 0.3s;
        }
        .status-banner {
          background: rgba(191,149,63,0.1);
          border: 1px solid rgba(191,149,63,0.3);
          color: #d9a47d;
          padding: 15px;
          border-radius: 12px;
          text-align: center;
          margin-bottom: 20px;
        }
        .projects-list-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
        }
        .project-item-row {
          display: flex;
          align-items: center;
          gap: 25px;
          padding: 15px 25px;
          transition: 0.3s;
        }
        .project-item-row:hover { background: var(--adm-surface2); }
        .project-details { flex: 1; }
        .project-details h4 { font-size: 1.1rem; margin-bottom: 5px; }
        .project-details p { font-size: 0.9rem; color: var(--adm-muted); }
        .type-badge {
          background: rgba(191,149,63,0.1);
          color: #d9a47d;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          text-transform: uppercase;
        }
        .project-actions { display: flex; gap: 10px; }
        .btn-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid var(--adm-border);
          background: transparent;
          color: var(--adm-muted);
          cursor: pointer;
          transition: 0.3s;
        }
        .btn-edit:hover { background: rgba(63, 142, 191, 0.1); color: #d9a47d; border-color: #d9a47d; }
        .btn-delete:hover { background: rgba(255, 75, 43, 0.1); color: #ff4b2b; border-color: #ff4b2b; }

        /* Modal Styling */
        .admin-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }
        .admin-modal {
          width: 100%;
          max-width: 650px;
          padding: 40px;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .btn-close { background: none; border: none; color: var(--adm-text); font-size: 2rem; cursor: pointer; opacity: 0.5; }
        .project-form { display: flex; flex-direction: column; gap: 20px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 10px; }
        .form-group label { font-size: 0.85rem; color: var(--adm-muted); text-transform: uppercase; }
        .form-group input, .form-group select, .form-group textarea, .search-box input, .input-field textarea {
          background: #1a120b !important;
          border: 1px solid rgba(217, 164, 125, 0.2) !important;
          padding: 12px 15px;
          border-radius: 10px;
          color: #f3e5d8 !important;
          outline: none;
          width: 100%;
          transition: 0.3s;
          font-family: inherit;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus, .search-box input:focus, .input-field textarea:focus {
          border-color: #d9a47d !important;
          background: #231810 !important;
          box-shadow: 0 0 0 3px rgba(217, 164, 125, 0.1);
        }
        .form-group label { font-size: 0.85rem; color: var(--adm-muted); text-transform: uppercase; margin-bottom: 8px; }

        .image-upload-wrapper { display: flex; gap: 10px; }
        .btn-upload-label {
          width: 50px; background: rgba(191,149,63,0.1); color: #d9a47d;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px; cursor: pointer; border: 1px dashed #d9a47d;
        }
        .form-actions { margin-top: 20px; display: flex; justify-content: flex-end; gap: 15px; }
        .btn-cancel { background: var(--adm-surface2); color: var(--adm-text); border: none; padding: 12px 25px; border-radius: 10px; cursor: pointer; }
        .btn-save-project { background: #d9a47d; color: #000; border: none; padding: 12px 30px; border-radius: 10px; font-weight: 700; cursor: pointer; }

        /* Translations Editor Styling */
        .translations-editor { display: flex; flex-direction: column; gap: 20px; }
        .sections-tabs { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 5px; }
        .tab-btn {
          background: var(--adm-surface2); border: 1px solid var(--adm-border);
          color: var(--adm-muted); padding: 8px 15px; border-radius: 10px; cursor: pointer; white-space: nowrap; transition: 0.3s;
        }
        .tab-btn.active { background: #d9a47d; color: #000; border-color: #d9a47d; }
        .editor-panel { display: flex; flex-direction: column; gap: 25px; }
        .panel-header { display: flex; justify-content: space-between; align-items: center; }
        .btn-save-translations {
          background: linear-gradient(135deg, #d9a47d, #fcf6ba, #b38728);
          color: #000; border: none; padding: 12px 25px; border-radius: 12px; font-weight: 700; cursor: pointer;
        }
        .translations-list { display: flex; flex-direction: column; gap: 30px; }
        .translation-row { display: flex; flex-direction: column; gap: 10px; }
        .inputs-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .input-field { position: relative; }
        .lang-tag { position: absolute; inset-inline-end: 15px; top: 10px; font-size: 0.65rem; font-weight: 700; color: var(--adm-muted); }
        .translation-group { background: rgba(217,164,125,0.03); border-radius: 15px; padding: 20px; border: 1px solid rgba(217,164,125,0.06); }
        .group-label { font-size: 1rem; font-weight: 600; margin-bottom: 20px; color: #d9a47d; }

        /* Settings Specific */
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
        }
        .settings-card {
          display: flex;
          gap: 20px;
          padding: 30px;
        }
        .card-icon {
          width: 50px;
          height: 50px;
          background: rgba(191,149,63,0.1);
          color: #d9a47d;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          flex-shrink: 0;
        }
        .card-content h3 {
          font-size: 1.1rem;
          margin-bottom: 15px;
          color: var(--adm-text);
        }
        .card-content p {
          font-size: 0.95rem;
          color: var(--adm-muted);
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .card-content code {
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          color: #d9a47d;
        }
        .current-config-box {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          font-size: 0.85rem;
        }
        .secure-tag {
          color: #6dbf78;
          font-weight: 700;
        }
        .settings-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .settings-list li {
          background: rgba(255,255,255,0.05);
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 0.8rem;
          color: #d9a47d;
        }
        .btn-link-admin {
          color: #d9a47d;
          text-decoration: none;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-link-admin:hover {
          text-decoration: underline;
        }

        /* Responsive Design Overrides */
        @media (max-width: 1200px) {
          .dashboard-grid { grid-template-columns: repeat(2, 1fr); }
          .welcome-banner, .quick-actions { grid-column: span 2; }
        }

        @media (max-width: 900px) {
          .settings-grid { grid-template-columns: 1fr; }
          .admin-sidebar {
            position: fixed;
            inset-inline-start: 0;
            transform: translateX(calc(var(--is-rtl, 0) * 100% - 100%));
          }
           /* Logic for RTL transform in CSS is tricky, simpler with classes */
          [dir="ltr"] .admin-sidebar { transform: translateX(-100%); }
          [dir="rtl"] .admin-sidebar { transform: translateX(100%); }
          
          .admin-sidebar.open { transform: translateX(0) !important; }
          
          .btn-menu-toggle, .btn-close-sidebar { display: block; }
          .admin-top-bar { padding: 0 20px; }
          .admin-content-area { padding: 20px; }
          
          .sidebar-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            backdrop-filter: blur(5px);
          }
          
          .welcome-banner { flex-direction: column; align-items: flex-start; gap: 20px; }
          .form-row, .inputs-pair { grid-template-columns: 1fr; }
          .search-box { width: 100%; }
          .editor-controls { flex-direction: column; gap: 15px; align-items: stretch; }
          .projects-admin-header { flex-direction: column; align-items: flex-start; gap: 15px; }
          .project-item-row { flex-direction: column; align-items: flex-start; gap: 15px; }
          .project-actions { width: 100%; justify-content: flex-end; }
        }

        @media (max-width: 600px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .welcome-banner, .quick-actions { grid-column: span 1; }
          .panel-header { flex-direction: column; gap: 15px; align-items: stretch; }
          .stat-card { padding: 20px; }
        }
      `}</style>
    </div>
  );
}



