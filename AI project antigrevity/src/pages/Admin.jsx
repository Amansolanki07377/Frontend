import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, Users, Settings, Plus, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { PRODUCTS } from '../data/products';
import './Admin.css';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState(PRODUCTS);

  // Simple admin protection
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) return null;

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="admin-page container">
      <div className="admin-sidebar glass">
        <h2 className="admin-logo text-gradient mb-4">AntiGravity Admin</h2>
        
        <nav className="admin-nav">
          <button 
            className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Settings size={20} /> Dashboard
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={20} /> Products
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingCart size={20} /> Orders
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={20} /> Customers
          </button>
        </nav>
      </div>

      <div className="admin-content">
        <div className="admin-header glass flex-between mb-4">
          <h2>
            {activeTab === 'dashboard' && 'Admin Dashboard'}
            {activeTab === 'products' && 'Product Management'}
            {activeTab === 'orders' && 'Recent Orders'}
            {activeTab === 'users' && 'Customer Management'}
          </h2>
          {activeTab === 'products' && (
            <button className="btn-primary">
              <Plus size={18} /> Add Product
            </button>
          )}
        </div>

        <motion.div 
          className="admin-panel glass"
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && (
            <div className="dashboard-stats grid-3 gap-2">
              <div className="stat-card glass">
                <h3>Total Sales</h3>
                <p className="text-gradient stat-value">$24,590.50</p>
                <span className="text-success">+12.5% this month</span>
              </div>
              <div className="stat-card glass">
                <h3>Active Orders</h3>
                <p className="text-gradient stat-value">142</p>
                <span className="text-success">+5.2% this month</span>
              </div>
              <div className="stat-card glass">
                <h3>Total Products</h3>
                <p className="text-gradient stat-value">{products.length}</p>
                <span className="text-secondary">Across 3 categories</span>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <div className="flex-center" style={{ gap: '1rem', justifyContent: 'flex-start' }}>
                          <img src={product.image} alt={product.name} className="admin-product-img" />
                          <span className="font-bold">{product.name}</span>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td><span className="status-badge success">In Stock</span></td>
                      <td>
                        <div className="admin-actions">
                          <button className="action-btn edit" title="Edit"><Edit2 size={16} /></button>
                          <button className="action-btn delete" title="Delete" onClick={() => handleDelete(product.id)}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="table-container">
               <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#ORD-8921</td>
                    <td>Today, 10:42 AM</td>
                    <td>Jane Doe</td>
                    <td><span className="status-badge pending">Processing</span></td>
                    <td>$189.99</td>
                  </tr>
                  <tr>
                    <td>#ORD-8920</td>
                    <td>Yesterday</td>
                    <td>John Smith</td>
                    <td><span className="status-badge success">Shipped</span></td>
                    <td>$320.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="text-center text-secondary py-4">
              <Users size={48} className="mx-auto mb-2 opacity-50" />
              <h3>Customer Management</h3>
              <p>Module coming soon.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
