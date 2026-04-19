"use client";

import { useState } from "react";
import Image from "next/image";
import { saveData, uploadImage } from "@/lib/admin-actions";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductsEditor({ initialProducts, locale }) {
  const isRtl = locale === 'ar';
  const [products, setProducts] = useState(initialProducts);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    key: "",
    originKey: "",
    category: "marble",
    img: ""
  });

  const categories = ["marble", "granite", "quartz"];
  const origins = ["italy", "turkey", "spain", "india", "greece", "egypt", "oman"];

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
      setFormData(prev => ({ ...prev, img: result.url }));
      setMessage(isRtl ? "تم رفع الصورة بنجاح!" : "Image uploaded successfully!");
    } else {
      alert(isRtl ? "فشل الرفع: " : "Upload failed: " + result.error);
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? { ...formData, id: p.id } : p);
    } else {
      const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      updatedProducts = [{ ...formData, id: nextId }, ...products];
    }

    const result = await saveData('data', updatedProducts, 'products.json');
    if (result.success) {
      setProducts(updatedProducts);
      setIsAdding(false);
      setEditingProduct(null);
      setFormData({ key: "", originKey: "", category: "marble", img: "" });
      setMessage(isRtl ? "تم الحفظ بنجاح!" : "Saved successfully!");
    } else {
      alert(isRtl ? "خطأ في الحفظ: " : "Error saving: " + result.error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm(isRtl ? "هل أنت متأكد من حذف هذا المنتج؟" : "Are you sure you want to delete this product?")) return;

    setLoading(true);
    const updatedProducts = products.filter(p => p.id !== id);
    const result = await saveData('data', updatedProducts, 'products.json');
    if (result.success) {
      setProducts(updatedProducts);
      setMessage(isRtl ? "تم الحذف بنجاح!" : "Deleted successfully!");
    } else {
      alert("Error deleting: " + result.error);
    }
    setLoading(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      key: product.key,
      originKey: product.originKey,
      category: product.category,
      img: product.img
    });
    setIsAdding(true);
  };

  return (
    <div className="projects-editor-container">
      <div className="editor-controls">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input type="text" placeholder={isRtl ? "بحث في المنتجات..." : "Search products..."} />
        </div>
        <button className="btn-add-project" onClick={() => { setIsAdding(true); setEditingProduct(null); }}>
          <i className="fas fa-plus"></i> {isRtl ? "إضافة منتج" : "Add Product"}
        </button>
      </div>

      {message && <div className="status-banner">{message}</div>}

      <div className="projects-list-grid">
        {products.map((product) => (
          <div key={product.id} className="admin-card-glass project-item-row">
            <div className="project-preview">
              <Image src={product.img} alt={product.key} width={80} height={80} style={{ objectFit: 'cover', borderRadius: '10px' }} />
            </div>
            <div className="project-details">
              <h4>{product.key}</h4>
              <p>{product.category}</p>
              <span className="type-badge">
                {isRtl ? (product.originKey === 'italy' ? 'إيطاليا' : product.originKey === 'spain' ? 'إسبانيا' : product.originKey === 'turkey' ? 'تركيا' : product.originKey) : product.originKey}
              </span>
            </div>
            <div className="project-actions">
              <button className="btn-icon btn-edit" onClick={() => handleEdit(product)}>
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn-icon btn-delete" onClick={() => handleDelete(product.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

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
                <h3>{editingProduct ? (isRtl ? 'تعديل المنتج' : 'Edit Product') : (isRtl ? 'إضافة منتج جديد' : 'Add New Product')}</h3>
                <button className="btn-close" onClick={() => setIsAdding(false)}>&times;</button>
              </div>

              <form onSubmit={handleSubmit} className="project-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>{isRtl ? "اسم المنتج (مفتاح الترجمة)" : "Product Name (Key)"}</label>
                    <input type="text" name="key" value={formData.key} onChange={handleInputChange} required placeholder={isRtl ? "مثال: كالاكاتا" : "e.g., calacatta"} />
                  </div>
                  <div className="form-group">
                    <label>{isRtl ? "الفئة" : "Category"}</label>
                    <select name="category" value={formData.category} onChange={handleInputChange}>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{isRtl ? (cat === 'marble' ? 'رخام' : cat === 'granite' ? 'جرانيت' : 'كوارتز') : cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{isRtl ? "بلد المنشأ" : "Origin"}</label>
                    <select name="originKey" value={formData.originKey} onChange={handleInputChange}>
                      {origins.map(origin => (
                        <option key={origin} value={origin}>{origin}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{isRtl ? "رابط الصورة" : "Image URL"}</label>
                    <div className="image-upload-wrapper">
                      <input type="text" name="img" value={formData.img} onChange={handleInputChange} required placeholder={isRtl ? "أدخل الرابط أو ارفع صورة" : "Enter or upload image URL"} />
                      <label className="btn-upload-label">
                        {uploading ? "..." : <i className="fas fa-upload"></i>}
                        <input type="file" onChange={handleImageUpload} hidden accept="image/*" />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setIsAdding(false)}>{isRtl ? "إلغاء" : "Cancel"}</button>
                  <button type="submit" disabled={loading} className="btn-save-project">
                    {loading ? (isRtl ? 'جاري الحفظ...' : 'Saving...') : (editingProduct ? (isRtl ? 'تحديث' : 'Update') : (isRtl ? 'إضافة' : 'Add'))}
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
