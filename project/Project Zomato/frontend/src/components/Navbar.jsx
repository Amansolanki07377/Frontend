import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-xl border-b border-slate-200/70 px-4 py-4 md:px-10">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
                <Link to="/" className="inline-flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-900">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 text-white shadow-lg">F</span>
                    Foodie
                </Link>

                <div className="flex items-center gap-6 text-sm font-medium text-slate-700">
                    <Link to="/" className="rounded-full px-4 py-2 hover:bg-slate-100 transition">Home</Link>
                    {user?.role === 'admin' && (
                        <Link to="/admin" className="rounded-full px-4 py-2 text-slate-900 bg-slate-100 hover:bg-slate-200 transition">Admin</Link>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <Link to="/cart" className="relative inline-flex items-center justify-center p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition">
                        <ShoppingCart size={22} />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full border border-white">
                                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/profile" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 hover:shadow-md transition">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white font-semibold">{user.name[0]}</div>
                                <span className="hidden md:inline">{user.name}</span>
                            </Link>
                            <button onClick={() => { logout(); navigate('/login'); }} className="p-3 rounded-full text-slate-600 hover:text-red-500 transition">
                                <LogOut size={22} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="rounded-full px-4 py-2 text-slate-700 hover:bg-slate-100 transition">Login</Link>
                            <Link to="/register" className="rounded-full bg-primary px-5 py-2 text-white font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition">Sign Up</Link>
                        </div>
                    )}

                    <button className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
