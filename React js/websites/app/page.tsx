'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../Navbar';
import Link from 'next/link';
import { ProductCard } from '../ProductCard';
import type { Product } from '../product';
import Image from 'next/image';

const mockProducts: Product[] = [
  { id: 1, name: 'Essential Boxy Tee', price: 45, category: 'T-Shirts', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Raw Denim Jacket', price: 120, category: 'Outerwear', imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Linen Pleated Trousers', price: 85, category: 'Pants', imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Cashmere Oversized Knit', price: 160, category: 'Sweaters', imageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=800' },
];

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    try {
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (error) {
      console.error("Cart loading error:", error);
      setCart([]);
    }
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product): void => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        alert('Already in cart ✅');
        return prev;
      }
      return [...prev, product];
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar cartCount={cart.length} />
      
      {/* Hero Section */}
      <header className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1600"
          alt="Hero background"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            SPRING / SUMMER '24
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wide mb-8 italic">
            Define your silhouette.
          </p>
          <Link href="/collections">
            <button className="bg-white text-black px-8 py-3 uppercase text-sm font-bold tracking-widest hover:bg-gray-200 transition-colors">
              Shop Collection
            </button>
          </Link>
        </div>
      </header>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
            <p className="text-gray-500 mt-2">The latest pieces from our studio.</p>
          </div>
          <Link href="/shop" className="text-sm font-bold border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-all">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {mockProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}
