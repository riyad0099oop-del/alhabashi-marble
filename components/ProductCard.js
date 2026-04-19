"use client";

import { useTranslations } from "next-intl";

export default function ProductCard({ product }) {
  const t = useTranslations("Showroom");
  
  const productName = t(`products.${product.key}`);
  const productType = t(`filter.${product.category}`);

  const waLink = `https://wa.me/967777079288?text=${encodeURIComponent(
    `${t("labels.waMessage")} ${productName}`
  )}`;

  return (
    <div className="product-card project-card-premium">
      <div className="img-container">
        <img 
          src={product.img} 
          alt={`${productName} - ${productType}`}
          className="product-img object-cover w-full h-full"
        />
        <div className="project-mask"></div>
        <div className="project-info-overlay" style={{ padding: '20px' }}>
          <span className="project-type-tag" style={{ fontSize: '0.65rem' }}>{productType}</span>
          <h3 style={{ fontSize: '1.2rem' }}>{productName}</h3>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ marginTop: '10px', fontSize: '0.8rem', padding: '8px 15px' }}>
            <i className="fab fa-whatsapp"></i>
            {t("labels.inquire")}
          </a>
        </div>
      </div>
    </div>
  );
}
