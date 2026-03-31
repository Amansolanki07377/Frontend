import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = PRODUCTS.find(p => p.id === parseInt(id));
  
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container error-page">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')} className="btn-secondary">
          Return to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    // Optional: show a toast or feedback
  };

  return (
    <div className="product-detail-page container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Back
      </button>

      <div className="product-detail-grid">
        <motion.div 
          className="product-detail-image-container glass"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={product.image} alt={product.name} className="product-detail-image animate-float" />
        </motion.div>

        <motion.div 
          className="product-detail-info"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="product-meta">
            <span className="product-brand">{product.brand}</span>
            <span className="product-category-tag">{product.category}</span>
          </div>
          
          <h1 className="product-detail-title text-gradient">{product.name}</h1>
          <div className="product-rating">
            <div className="stars">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} />
            </div>
            <span className="reviews-count">(124 Reviews)</span>
          </div>

          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-description">{product.description}</p>

          <div className="product-options">
            <div className="option-group">
              <h4>Select Color</h4>
              <div className="color-options">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            <div className="option-group">
              <div className="flex-between">
                <h4>Select Size</h4>
                <button className="size-guide-btn">Size Guide</button>
              </div>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    US {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="product-actions">
            <button className="btn-primary add-to-cart-btn" onClick={handleAddToCart}>
              <ShoppingBag size={20} /> Add to Cart
            </button>
            <button className="btn-secondary wishlist-btn">
              <Heart size={24} />
            </button>
          </div>

          <div className="product-details-extra">
            <div className="extra-item">✓ Free Global Shipping</div>
            <div className="extra-item">✓ 30-Day Returns</div>
            <div className="extra-item">✓ AntiGravity Guarantee</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
