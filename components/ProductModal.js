"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ProductModal({ product, onClose }) {
  const t = useTranslations("Showroom");
  if (!product) return null;

  const productName = t(`products.${product.key}`);
  const productOrigin = t(`origins.${product.originKey}`);
  const productType = t(`filter.${product.category}`);

  const waLink = `https://wa.me/967777079288?text=${encodeURIComponent(
    `${t("labels.waMessage")} ${productName}`
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
              <h2>{productName}</h2>
              <p className="product-meta">{productType} | {productOrigin}</p>
              <div className="product-desc">
                  <p>{t("details.desc")}</p>
                  <ul>
                      <li><i className="fas fa-check"></i> {t("details.features.0")}</li>
                      <li><i className="fas fa-check"></i> {t("details.features.1")}</li>
                      <li><i className="fas fa-check"></i> {t("details.features.2")}</li>
                  </ul>
              </div>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <i className="fab fa-whatsapp"></i>
                {t("labels.requestQuote")}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
