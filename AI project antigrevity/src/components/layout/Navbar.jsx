import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: 'Men', path: '/category/Men' },
    { name: 'Women', path: '/category/Women' },
    { name: 'Kids', path: '/category/Kids' },
    { name: 'Collection', path: '/products' }
  ];

  return (
    <nav className="navbar glass">
      <div className="container navbar-container">
        {/* Mobile Menu Toggle */}
        <button 
          className="menu-toggle md-hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="navbar-logo text-gradient">
          <span className="font-bold">Anti</span>Gravity
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links sm-hidden">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="nav-link">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="navbar-icons">
          <button className="icon-btn" onClick={() => navigate('/products')}>
            <Search size={20} />
          </button>
          
          <div className="user-dropdown-container">
            <button className="icon-btn" onClick={() => user ? navigate('/admin') : navigate('/auth')}>
              <User size={20} />
            </button>
            {user && (
              <div className="dropdown-menu glass">
                <p className="dropdown-user">Hi, {user.name}</p>
                {user.isAdmin && (
                  <Link to="/admin" className="dropdown-item">Admin Panel</Link>
                )}
                <button onClick={logout} className="dropdown-item">Logout</button>
              </div>
            )}
          </div>

          <Link to="/cart" className="icon-btn cart-btn">
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Open State */}
      {isMenuOpen && (
        <div className="mobile-menu glass">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
