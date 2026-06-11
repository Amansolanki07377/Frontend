import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, ChevronRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (!address) return toast.error('Please enter delivery address');
        if (!phone) return toast.error('Please enter your phone number');
        
        setLoading(true);
        try {
            const res = await api.post('/orders/', {
                items: cartItems,
                totalAmount: getCartTotal() + 5,
                address: address,
                phone: phone
            });
            clearCart();
            toast.success('Order placed successfully!');
            navigate(`/order-success/${res.data.orderId}`);
        } catch (err) {
            toast.error('Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-black mb-12">Checkout</h1>
            
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                <MapPin size={24} />
                            </div>
                            <h2 className="text-xl font-bold">Delivery Address</h2>
                        </div>
                        <textarea 
                            className="w-full h-32 p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 outline-none transition-all resize-none"
                            placeholder="Apartment, Street, City, Landmark..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                <MapPin size={24} />
                            </div>
                            <h2 className="text-xl font-bold">Phone Number</h2>
                        </div>
                        <input
                            type="tel"
                            className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 outline-none transition-all"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-50 opacity-60">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-secondary/10 p-2 rounded-lg text-secondary">
                                <CreditCard size={24} />
                            </div>
                            <h2 className="text-xl font-bold">Payment Method</h2>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border-2 border-primary/20">
                            <div className="flex items-center gap-3 font-bold">
                                <span>Cash on Delivery</span>
                            </div>
                            <div className="w-6 h-6 border-4 border-primary rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-gray-400 text-center">Online payment coming soon...</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-dark text-white p-8 rounded-[2rem] shadow-2xl shadow-dark/20">
                        <h2 className="text-2xl font-bold mb-8">Order Overview</h2>
                        <div className="space-y-4 max-h-60 overflow-y-auto mb-8 pr-2">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex justify-between items-center text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-white">{item.quantity}x</span>
                                        <span className="truncate w-32">{item.name}</span>
                                    </div>
                                    <span className="text-white font-medium">₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="border-t border-white/10 pt-6 space-y-4">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span className="text-white">₹{getCartTotal()}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Fees</span>
                                <span className="text-white">₹5</span>
                            </div>
                            <div className="flex justify-between text-2xl font-black pt-2">
                                <span>To Pay</span>
                                <span className="text-primary-light">₹{getCartTotal() + 5}</span>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full mt-10 bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95 shadow-xl shadow-primary/20"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>Finish My Order <ChevronRight size={20}/></>}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
