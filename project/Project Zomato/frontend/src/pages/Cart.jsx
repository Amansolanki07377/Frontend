import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="max-w-2xl mx-auto text-center py-24 px-4">
                <div className="bg-white w-48 h-48 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-gray-100">
                    <ShoppingBag size={80} className="text-gray-200" />
                </div>
                <h2 className="text-3xl font-black mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-10 text-lg">Good food is always just a few clicks away. Go ahead, order some yummy items from the menu.</p>
                <Link to="/" className="inline-block bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
                    See Restaurants Near You
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-10">
                    <h1 className="text-4xl font-black">Your Cart</h1>
                    <span className="bg-gray-100 px-4 py-1 rounded-full text-sm font-bold text-gray-500">{cartItems.length} Items</span>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 p-6 md:p-8 space-y-8">
                    {cartItems.map((item) => (
                        <div key={item._id} className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-gray-50 last:border-0 last:pb-0">
                            <img src={item.image} alt={item.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover" />
                            
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                                <div className="text-primary font-bold text-lg mb-4">₹{item.price}</div>
                                
                                <div className="flex items-center justify-center sm:justify-start gap-4">
                                    <div className="flex items-center bg-gray-50 rounded-xl px-2 py-1 border border-gray-100">
                                        <button 
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="p-2 hover:bg-white rounded-lg transition-colors text-gray-500"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-10 text-center font-bold">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="p-2 hover:bg-white rounded-lg transition-colors text-primary"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <button 
                                            onClick={() => removeFromCart(item._id)}
                                            className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Trash2 size={20} />
                                        </button>

                                        <button
                                            onClick={() => navigate(item.restaurantId || item.restaurant || item.restaurant_id ? `/restaurant/${item.restaurantId || item.restaurant || item.restaurant_id}` : '/')}
                                            className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                                        >
                                            Add more <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right hidden sm:block">
                                <div className="text-sm text-gray-400 font-medium mb-1">Subtotal</div>
                                <div className="text-xl font-black">₹{item.price * item.quantity}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="sticky top-28 bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 p-8 border border-gray-50">
                    <h2 className="text-2xl font-bold mb-8">Bill Summary</h2>
                    
                    <div className="space-y-4 mb-8 text-lg">
                        <div className="flex justify-between text-gray-500">
                            <span>Item Total</span>
                            <span>₹{getCartTotal()}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Delivery Partner Fee</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-gray-500 pb-4 border-b border-gray-50">
                            <span>Platform Fee</span>
                            <span>₹40</span>
                        </div>
                        <div className="flex justify-between font-black text-2xl pt-2">
                            <span>Total</span>
                            <span>₹{getCartTotal() + 40}</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => navigate('/checkout')}
                        className="w-full bg-dark text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-dark/20 group"
                    >
                        Checkout <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="mt-8 p-4 bg-primary/5 rounded-2xl flex gap-3 text-sm text-primary font-medium">
                        <Info size={20} />
                        <p>Orders cannot be cancelled once placed. Please check details before ordering.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simple Info icon replacement since I missed importing it
const Info = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
);

export default Cart;
