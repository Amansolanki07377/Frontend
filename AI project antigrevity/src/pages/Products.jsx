import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/product/ProductCard';
import { PRODUCTS } from '../data/products';
import './Products.css';

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState(PRODUCTS);
  const [activeFilter, setActiveFilter] = useState(category || 'All');

  useEffect(() => {
    setActiveFilter(category || 'All');
  }, [category]);

  useEffect(() => {
    if (activeFilter === 'All') {
      setProducts(PRODUCTS);
    } else {
      setProducts(PRODUCTS.filter(p => p.category === activeFilter));
    }
  }, [activeFilter]);

  const filters = ['All', 'Men', 'Women', 'Kids'];

  return (
    <div className="products-page container">
      <div className="products-header">
        <h1 className="text-gradient">{activeFilter === 'All' ? 'Complete Collection' : `${activeFilter}'s Collection`}</h1>
        <p className="products-count text-secondary">{products.length} Products</p>
      </div>

      <div className="filter-bar glass">
        <div className="filter-options">
          {filters.map(filter => (
            <button 
              key={filter} 
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <button className="advanced-filter-btn">
          <Filter size={18} /> Filters
        </button>
      </div>

      <motion.div 
        className="product-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {products.map((product, index) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
      
      {products.length === 0 && (
        <div className="empty-state text-center" style={{ padding: '4rem 0' }}>
          <h3>No products found for this category.</h3>
        </div>
      )}
    </div>
  );
};

export default Products;
