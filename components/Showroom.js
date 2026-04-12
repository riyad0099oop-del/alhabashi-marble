"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { products } from "../data/products";

export default function Showroom() {
  const [filter, setFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.category === filter);

  return (
    <section id="showroom" className="showroom">
      <h2 className="section-title">صالة العرض</h2>
      
      <div className="filter-container">
        <button 
          className={filter === "all" ? "active" : ""} 
          onClick={() => setFilter("all")}
        >
          الكل
        </button>
        <button 
          className={filter === "marble" ? "active" : ""} 
          onClick={() => setFilter("marble")}
        >
          رخام
        </button>
        <button 
          className={filter === "granite" ? "active" : ""} 
          onClick={() => setFilter("granite")}
        >
          جرانيت
        </button>
      </div>

      <motion.div layout className="product-grid">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
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

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
}
