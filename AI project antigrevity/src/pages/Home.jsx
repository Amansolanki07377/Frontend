import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { PRODUCTS } from '../data/products';
import './Home.css';

const Home = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Defy Gravity. <br />
              <span className="text-gradient">Elevate Performance.</span>
            </h1>
            <p className="hero-subtitle">
              Experience the future of footwear with our revolutionary AntiGravity tech series. Next level comfort meets undeniable style.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn-primary">
                Shop Collection <ArrowRight size={20} />
              </Link>
              <Link to="/category/Men" className="btn-secondary">
                Explore Men
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="glow-circle animate-float"></div>
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80" 
              alt="Floating Shoe" 
              className="floating-shoe animate-float"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section container">
        <div className="section-header">
          <h2>Trending <span className="text-gradient">Drops</span></h2>
          <Link to="/products" className="view-all-link">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <motion.div 
          className="product-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProducts.map(product => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Categories Banner */}
      <section className="categories-section container">
        <motion.div 
          className="category-cards"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {['Men', 'Women', 'Kids'].map((cat, index) => (
            <motion.div key={cat} variants={itemVariants} className={`category-card cat-${index + 1}`}>
              <div className="category-overlay">
                <h3>{cat}'s Collection</h3>
                <Link to={`/category/${cat}`} className="category-link">Shop Now ➔</Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
