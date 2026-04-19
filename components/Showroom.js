"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { products } from "../data/products";
import { useTranslations, useLocale } from "next-intl";

const ITEMS_PER_PAGE = 6;

export default function Showroom() {
  const [filter, setFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const t = useTranslations("Showroom");
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.category === filter);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll to showroom top
    document.getElementById('showroom')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="showroom" className="showroom">
      <h2 className="section-title">{t("title")}</h2>
      
      <div className="filter-container">
        <button 
          className={filter === "all" ? "active" : ""} 
          onClick={() => handleFilterChange("all")}
        >
          {t("filter.all")}
        </button>
        <button 
          className={filter === "marble" ? "active" : ""} 
          onClick={() => handleFilterChange("marble")}
        >
          {t("filter.marble")}
        </button>
        <button 
          className={filter === "granite" ? "active" : ""} 
          onClick={() => handleFilterChange("granite")}
        >
          {t("filter.granite")}
        </button>
      </div>

      <motion.div layout className="product-grid">
        <AnimatePresence mode="popLayout">
          {paginatedProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProduct(product)}
              style={{ cursor: "pointer" }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="showroom-pagination">
          {/* Previous Button */}
          <button
            className="pagination-arrow"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label={isRtl ? "الصفحة السابقة" : "Previous page"}
          >
            <i className={`fas fa-chevron-${isRtl ? 'right' : 'left'}`}></i>
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
              aria-label={isRtl ? `صفحة ${page}` : `Page ${page}`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            className="pagination-arrow"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label={isRtl ? "الصفحة التالية" : "Next page"}
          >
            <i className={`fas fa-chevron-${isRtl ? 'left' : 'right'}`}></i>
          </button>
        </div>
      )}

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
}
