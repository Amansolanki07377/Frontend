'use client';
import React from 'react';
import { ShoppingBag, Search, User } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Collections", href: "/collections" },
  { name: "Sale", href: "/sale" },
];

export const Navbar: React.FC<{ cartCount: number }> = ({ cartCount }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/">
            <span className="font-bold text-2xl tracking-tighter hover:text-gray-700 transition-colors">
              URBAN THREADS
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
              >
                <span className="hover:text-gray-500 transition-colors">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-5">
            
            {/* Search */}
            <button type="button" aria-label="Search">
              <Search className="w-5 h-5 hover:text-gray-500" />
            </button>

            {/* User */}
            <button type="button" aria-label="User Profile">
              <User className="w-5 h-5 hover:text-gray-500" />
            </button>

            {/* Cart */}
            <Link href="/cart">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 hover:text-gray-500" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

          </div>
        </div>

      </div>
    </nav>
  );
};