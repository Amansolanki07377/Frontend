import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Wallet, Smartphone, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 15.00 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call for checkout
    setTimeout(() => {
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="checkout-page container flex-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <h2>Your cart is empty</h2>
          <button className="btn-primary mt-4" onClick={() => navigate('/products')}>Return to Shop</button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="checkout-page container flex-center" style={{ minHeight: '80vh' }}>
        <motion.div 
          className="success-message glass text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle size={80} color="var(--success)" className="mx-auto mb-4" />
          </motion.div>
          <h2>Order Confirmed!</h2>
          <p className="text-secondary mt-2 mb-4">Your AntiGravity gear is preparing for liftoff. We'll send shipping updates to your email.</p>
          <button className="btn-primary" onClick={() => navigate('/')}>Back to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <button className="back-btn mt-4 mb-4" onClick={() => navigate('/cart')}>
        <ArrowLeft size={20} /> Back to Cart
      </button>

      <div className="checkout-grid">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit} className="checkout-form glass">
            <h3>Shipping Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" required placeholder="John" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" required placeholder="Doe" />
              </div>
            </div>
            
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" required placeholder="john@example.com" />
            </div>

            <div className="form-group">
              <label>Street Address</label>
              <input type="text" required placeholder="123 Gravity Way" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" required placeholder="New York" />
              </div>
              <div className="form-group">
                <label>ZIP / Postal Code</label>
                <input type="text" required placeholder="10001" />
              </div>
            </div>

            <h3 className="mt-4">Payment Method</h3>
            <div className="payment-methods">
              <div 
                className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard size={24} />
                <span>Credit Card</span>
              </div>
              <div 
                className={`payment-method ${paymentMethod === 'upi' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                <Smartphone size={24} />
                <span>UPI</span>
              </div>
              <div 
                className={`payment-method ${paymentMethod === 'wallet' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('wallet')}
              >
                <Wallet size={24} />
                <span>Wallet</span>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" required placeholder="0000 0000 0000 0000" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" required placeholder="MM/YY" />
                  </div>
                  <div className="form-group">
                    <label>CVC</label>
                    <input type="text" required placeholder="123" />
                  </div>
                </div>
              </motion.div>
            )}

            {paymentMethod === 'upi' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
                <div className="form-group">
                  <label>UPI ID</label>
                  <input type="text" required placeholder="username@upi" />
                </div>
              </motion.div>
            )}

            <button type="submit" className="btn-primary full-width mt-4 place-order-btn">
              Place Order - ${total.toFixed(2)}
            </button>
          </form>
        </div>

        <div className="checkout-summary-section">
          <div className="checkout-summary glass sticky">
            <h3>Order Summary</h3>
            <div className="checkout-items">
              {cart.map(item => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="checkout-item">
                  <img src={item.image} alt={item.name} className="checkout-item-img" />
                  <div className="checkout-item-info">
                    <h4>{item.name}</h4>
                    <p className="text-secondary text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="checkout-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>
            
            <div className="summary-row">
              <span className="text-secondary">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="text-secondary">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total-row">
              <span>Total</span>
              <span className="text-gradient">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
