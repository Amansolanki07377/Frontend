import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 15.00 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart-container container flex-center">
        <motion.div 
          className="empty-cart-content text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p className="text-secondary">Looks like you haven't added any AntiGravity gear yet.</p>
          <button className="btn-primary mt-2" onClick={() => navigate('/products')}>
            Start Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1 className="text-gradient mb-2">Shopping Bag</h1>
      <p className="text-secondary mb-3">{cart.length} items in your order</p>

      <div className="cart-grid">
        <div className="cart-items-section">
          {cart.map((item, index) => (
            <motion.div 
              key={`${item.id}-${item.size}-${item.color}`}
              className="cart-item glass"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="cart-item-image-wrapper">
                <img src={item.image} alt={item.name} className="cart-item-image" />
              </div>

              <div className="cart-item-details">
                <div className="flex-between">
                  <h3><Link to={`/product/${item.id}`} className="cart-item-title">{item.name}</Link></h3>
                  <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <p className="cart-item-meta">
                  Size: {item.size} • Color: 
                  <span 
                    className="cart-color-dot" 
                    style={{ backgroundColor: item.color }} 
                    title={item.color}
                  />
                </p>

                <div className="cart-item-actions flex-between">
                  <div className="quantity-controls">
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                  >
                    <Trash2 size={18} /> Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="cart-summary-section">
          <div className="cart-summary glass sticky">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span className="text-secondary">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="text-secondary">Estimated Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total-row">
              <span>Total</span>
              <span className="text-gradient">${total.toFixed(2)}</span>
            </div>

            <button 
              className="btn-primary checkout-btn full-width"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout <ArrowRight size={20} />
            </button>
            
            <p className="secure-checkout-msg text-center text-secondary">
              🔒 Secure checkout • AntiGravity guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
