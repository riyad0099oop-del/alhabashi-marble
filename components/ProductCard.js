export default function ProductCard({ product }) {
  const waLink = `https://wa.me/967777079288?text=${encodeURIComponent(
    `السلام عليكم، استفسار عن: ${product.name}`
  )}`;

  return (
    <div className="product-card project-card-premium">
      <div className="img-container">
        <div className="origin-badge">
          <i className="fas fa-globe-africa"></i>
          {product.origin}
        </div>
        <img 
          src={product.img} 
          alt={`${product.name} - ${product.type} فاخر من ${product.origin}`}
          className="product-img object-cover w-full h-full"
        />
        <div className="project-mask"></div>
        <div className="project-info-overlay" style={{ padding: '20px' }}>
          <span className="project-type-tag" style={{ fontSize: '0.65rem' }}>{product.type}</span>
          <h3 style={{ fontSize: '1.2rem' }}>{product.name}</h3>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ marginTop: '10px', fontSize: '0.8rem', padding: '8px 15px' }}>
            <i className="fab fa-whatsapp"></i>
            استفسر الآن
          </a>
        </div>
      </div>
    </div>
  );
}
