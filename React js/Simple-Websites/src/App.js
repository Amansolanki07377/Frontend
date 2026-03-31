import React, { useState } from 'react';
import './App.css';
import { products } from './data';

function App() {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <div className="App">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="logo">LUMINA FASHION</div>
                <div className="nav-links">
                    <span className="cart-icon">
                        🛒 Cart <span className="cart-count">{cart.length}</span>
                    </span>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero">
                <h1>Elevate Your Style</h1>
                <p>Discover the latest trends in premium apparel.</p>
            </header>

            {/* Product Listing */}
            <main>
                <h2 style={{ textAlign: 'center', marginTop: '3rem' }}>Our Collection</h2>
                <div className="product-grid">
                    {products.map(product => (
                        <div key={product.id} className="product-card">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="product-image" 
                            />
                            <div className="product-info">
                                <p style={{ fontSize: '0.8rem', color: '#888' }}>{product.category}</p>
                                <h3>{product.name}</h3>
                                <p className="product-price">${product.price.toFixed(2)}</p>
                                <button 
                                    className="add-btn" 
                                    onClick={() => addToCart(product)}
                                >
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer style={{ textAlign: 'center', padding: '2rem', background: '#fff' }}>
                <p>&copy; 2024 Lumina Fashion Store. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
