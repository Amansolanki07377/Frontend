import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault(); // Prevent navigating to product page
    // Using first available size and color as default for quick add
    addToCart(product, product.sizes[0], product.colors[0]);
  };

  return (
    <motion.div 
      className="product-card glass"
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`} className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <div className="product-overlay">
          <button className="quick-add-btn" onClick={handleQuickAdd}>
            <ShoppingBag size={20} />
            <span>Quick Add</span>
          </button>
        </div>
      </Link>
      
      <div className="product-info">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <p className="product-category">{product.category} • {product.brand}</p>
        <div className="product-price-row">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <div className="product-colors">
            {product.colors.slice(0, 3).map((color, index) => (
              <span 
                key={index} 
                className="color-swatch-sm"
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 3 && <span className="color-plus">+</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
