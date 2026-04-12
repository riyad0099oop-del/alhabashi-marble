export default function ProductCard({ product }) {
  const waLink = `https://wa.me/967777079288?text=${encodeURIComponent(
    `السلام عليكم، استفسار عن: ${product.name}`
  )}`;

  return (
    <div className="product-card">
      <div className="img-container">
        <div className="origin-badge">
          <i className="fas fa-globe-africa"></i>
          {product.origin}
        </div>
        <div
          className="product-img"
          style={{ backgroundImage: `url('${product.img}')` }}
        ></div>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <span className="type-text">{product.type} فاخر</span>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-wa">
          <i className="fab fa-whatsapp"></i>
          استفسر الآن
        </a>
      </div>
    </div>
  );
}
