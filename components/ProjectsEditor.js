"use client";

import { useState } from "react";
import Image from "next/image";
import { saveData, uploadImage } from "@/lib/admin-actions";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsEditor({ initialProjects, locale }) {
  const isRtl = locale === 'ar';
  const [projects, setProjects] = useState(initialProjects);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "floors",
    image: "",
    size: "medium"
  });

  const categories = ["floors", "stairs", "kitchens"];
  const sizes = ["small", "medium", "large"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append('image', file);

    const result = await uploadImage(form);
    if (result.success) {
      setFormData(prev => ({ ...prev, image: result.url }));
      setMessage(isRtl ? "تم رفع الصورة بنجاح!" : "Image uploaded successfully!");
    } else {
      alert(isRtl ? "فشل الرفع: " : "Upload failed: " + result.error);
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let updatedProjects;
    if (editingProject) {
      updatedProjects = projects.map(p => p.id === editingProject.id ? { ...formData, id: p.id } : p);
    } else {
      const nextId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
      updatedProjects = [{ ...formData, id: nextId }, ...projects];
    }

    const result = await saveData('data', updatedProjects, 'projectsData.json');
    if (result.success) {
      setProjects(updatedProjects);
      setIsAdding(false);
      setEditingProject(null);
      setFormData({ title: "", category: "", type: "floors", image: "", size: "medium" });
      setMessage(isRtl ? "تم الحفظ بنجاح!" : result.message);
    } else {
      alert(isRtl ? "خطأ في الحفظ: " : "Error saving: " + result.error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm(isRtl ? "هل أنت متأكد من حذف هذا المشروع؟" : "Are you sure you want to delete this project?")) return;

    setLoading(true);
    const updatedProjects = projects.filter(p => p.id !== id);
    const result = await saveData('data', updatedProjects, 'projectsData.json');
    if (result.success) {
      setProjects(updatedProjects);
      setMessage(result.message);
    } else {
      alert("Error deleting: " + result.error);
    }
    setLoading(false);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      type: project.type,
      image: project.image,
      size: project.size || "medium"
    });
    setIsAdding(true);
  };

  return (
    <div className="projects-editor-container">
      {/* Search and Add Bar */}
      <div className="editor-controls">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input type="text" placeholder={isRtl ? "بحث في المشاريع..." : "Search projects..."} />
        </div>
        <button className="btn-add-project" onClick={() => { setIsAdding(true); setEditingProject(null); }}>
          <i className="fas fa-plus"></i> {isRtl ? "مشروع جديد" : "New Project"}
        </button>
      </div>

      {message && <div className="status-banner">{message}</div>}

      {/* Projects List View */}
      <div className="projects-list-grid">
        {projects.map((project) => (
          <div key={project.id} className="admin-card-glass project-item-row">
            <div className="project-preview">
              <Image src={project.image} alt={project.title} width={80} height={80} style={{ objectFit: 'cover', borderRadius: '10px' }} />
            </div>
            <div className="project-details">
              <h4>{project.title}</h4>
              <p>{project.category}</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span className="type-badge">
                  {isRtl ? (project.type === 'floors' ? 'أرضيات' : project.type === 'stairs' ? 'سلالم' : 'مطابخ') : project.type}
                </span>
                {project.size && (
                  <span className="type-badge" style={{ opacity: 0.7 }}>
                    {isRtl ? (project.size === 'small' ? 'صغير' : project.size === 'medium' ? 'متوسط' : 'كبير') : project.size}
                  </span>
                )}
              </div>
            </div>
            <div className="project-actions">
              <button className="btn-icon btn-edit" onClick={() => handleEdit(project)}>
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn-icon btn-delete" onClick={() => handleDelete(project.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="admin-modal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="admin-card-glass admin-modal"
            >
              <div className="modal-header">
                <h3>{editingProject ? (isRtl ? 'تعديل المشروع' : 'Edit Project') : (isRtl ? 'إضافة مشروع جديد' : 'Add New Project')}</h3>
                <button className="btn-close" onClick={() => setIsAdding(false)}>&times;</button>
              </div>

              <form onSubmit={handleSubmit} className="project-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>{isRtl ? "عنوان المشروع (عربي/إنجليزي)" : "Project Title (Arabic/English)"}</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder={isRtl ? "مثال: تصميم أرضية فاخرة" : "e.g., Luxury Floor Design"} />
                  </div>
                  <div className="form-group">
                    <label>{isRtl ? "الفئة / الوصف" : "Category/Description"}</label>
                    <input type="text" name="category" value={formData.category} onChange={handleInputChange} required placeholder={isRtl ? "مثال: دمج ألوان رخام مختلفة" : "e.g., Mixing different marble colors"} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{isRtl ? "نوع المشروع" : "Project Type"}</label>
                    <select name="type" value={formData.type} onChange={handleInputChange}>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {isRtl ? (cat === 'floors' ? 'أرضيات' : cat === 'stairs' ? 'سلالم' : 'مطابخ') : cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{isRtl ? "حجم العرض (Bento)" : "Bento Size"}</label>
                    <select name="size" value={formData.size} onChange={handleInputChange}>
                      {sizes.map(s => (
                        <option key={s} value={s}>
                          {isRtl ? (s === 'small' ? 'صغير' : s === 'medium' ? 'متوسط' : 'كبير') : s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>{isRtl ? "رابط صورة المشروع" : "Project Image URL"}</label>
                  <div className="image-upload-wrapper">
                    <input type="text" name="image" value={formData.image} onChange={handleInputChange} required placeholder={isRtl ? "أدخل الرابط أو ارفع صورة" : "Enter or upload image URL"} />
                    <label className="btn-upload-label">
                      {uploading ? "..." : <i className="fas fa-upload"></i>}
                      <input type="file" onChange={handleImageUpload} hidden accept="image/*" />
                    </label>
                  </div>
                  {formData.image && (
                    <div className="preview-small-box">
                      <Image src={formData.image} alt="Preview" width={40} height={40} />
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setIsAdding(false)}>{isRtl ? "إلغاء" : "Cancel"}</button>
                  <button type="submit" disabled={loading} className="btn-save-project">
                    {loading ? (isRtl ? 'جاري الحفظ...' : 'Saving Changes...') : (editingProject ? (isRtl ? 'تحديث' : 'Update Project') : (isRtl ? 'إنشاء مشروع' : 'Create Project'))}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
