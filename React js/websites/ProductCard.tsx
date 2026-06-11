import React, { useState } from 'react';
import type { Product } from './product';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      onAddToCart(product);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="group relative border rounded-lg p-3 hover:shadow-lg transition-all duration-300">

      {/* Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-200 h-80">
          <Image 
            src={product.imageUrl} 
            alt={product.name} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="mt-4 flex justify-between">
        <div>
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm text-gray-700 font-medium hover:underline">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-bold text-gray-900">
          ₹{product.price.toLocaleString()}
        </p>
      </div>

      {/* Button */}
      <button 
        onClick={handleAddToCart}
        disabled={loading}
        className="mt-4 w-full bg-black text-white py-2 text-sm uppercase tracking-widest hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add to Bag"}
      </button>

    </div>
  );
};