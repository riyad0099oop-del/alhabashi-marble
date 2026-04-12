"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const waLink = `https://wa.me/967777079288?text=${encodeURIComponent(
    `السلام عليكم، استفسار عن منتج: ${product.name}`
  )}`;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>&times;</button>
          
          <div className="modal-body">
            <div className="modal-img" style={{ backgroundImage: `url('${product.img}')` }}></div>
            <div className="modal-info">
              <h2>{product.name}</h2>
              <p className="product-meta">{product.type} | {product.origin}</p>
              <div className="product-desc">
                  <p>يتميز هذا الصنف بعروقه الرائعة وجودته العالية، مما يجعله الخيار الأمثل للواجهات، المطابخ، والأرضيات الفاخرة.</p>
                  <ul>
                      <li><i className="fas fa-check"></i> مقاوم للخدش والحرارة</li>
                      <li><i className="fas fa-check"></i> لمعان طبيعي يدوم طويلاً</li>
                      <li><i className="fas fa-check"></i> متوفر بمقاسات مختلفة</li>
                  </ul>
              </div>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <i className="fab fa-whatsapp"></i>
                طلب تسعيرة عبر واتساب
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
