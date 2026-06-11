import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { User, MapPin, Package, Settings, ChevronRight, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get('/orders/history');
                setOrders(res.data);
            } catch (err) {
                toast.error('Failed to load orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const totalSpent = orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
    const totalOrders = orders.length;

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="rounded-[2.5rem] bg-white/95 border border-slate-200 shadow-2xl shadow-slate-300/10 p-8 lg:p-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-3">Your account</p>
                            <h1 className="text-4xl font-black text-slate-900">Hi, {user?.name}</h1>
                            <p className="mt-3 text-slate-600 max-w-2xl">Welcome back! Here’s your profile overview and recent order activity. Continue exploring restaurants or manage your account from the quick actions below.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            <div className="rounded-3xl bg-slate-50 p-5 border border-slate-200">
                                <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">Orders</p>
                                <p className="mt-4 text-3xl font-extrabold text-slate-900">{totalOrders}</p>
                            </div>
                            <div className="rounded-3xl bg-slate-50 p-5 border border-slate-200">
                                <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">Spent</p>
                                <p className="mt-4 text-3xl font-extrabold text-slate-900">₹{totalSpent}</p>
                            </div>
                            <div className="rounded-3xl bg-slate-50 p-5 border border-slate-200">
                                <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">Role</p>
                                <p className="mt-4 text-3xl font-extrabold text-slate-900">{user?.role || 'user'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
                    <aside className="space-y-6">
                        <div className="rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-300/10 p-6">
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-white text-4xl font-black shadow-lg shadow-primary/30">{user?.name[0]}</div>
                                <div>
                                    <p className="text-xl font-bold text-slate-900">{user?.name}</p>
                                    <p className="text-sm text-slate-500">{user?.email}</p>
                                </div>
                                <span className="inline-flex rounded-full bg-primary/10 text-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em]">{user?.role}</span>
                            </div>
                        </div>

                        <div className="rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-300/10 p-6 space-y-3">
                            <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
                            <Link to="/" className="block rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 font-semibold text-slate-700 hover:bg-slate-100 transition">Browse restaurants</Link>
                            <Link to="/cart" className="block rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 font-semibold text-slate-700 hover:bg-slate-100 transition">View cart</Link>
                            <button className="w-full rounded-3xl bg-primary px-5 py-4 text-white font-semibold hover:bg-primary-dark transition">Update profile</button>
                        </div>
                    </aside>

                    <section className="space-y-6">
                        <div className="rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-300/10 p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900">Order History</h2>
                                    <p className="mt-2 text-slate-500">Review your recent orders and check status updates.</p>
                                </div>
                                <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                                    <Package size={18} /> {totalOrders} orders placed
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="space-y-6">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-40 rounded-[2rem] bg-slate-100 animate-pulse"></div>
                                ))}
                            </div>
                        ) : orders.length > 0 ? (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order._id} className="rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-300/10 p-8 transition hover:-translate-y-1">
                                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <p className="text-sm text-slate-500 uppercase tracking-[0.2em] mb-2">Order #{order._id.slice(-6).toUpperCase()}</p>
                                                <p className="text-lg font-semibold text-slate-900">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                            </div>
                                            <span className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${order.status === 'Placed' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="mt-6 space-y-4">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="flex items-center justify-between gap-4 text-slate-600">
                                                    <div className="flex items-center gap-3">
                                                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 font-bold">{item.quantity}x</span>
                                                        <div>
                                                            <p className="font-semibold text-slate-900">{item.name}</p>
                                                            <p className="text-sm text-slate-500">₹{item.price} each</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-semibold text-slate-900">₹{item.price * item.quantity}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 border-t border-slate-100 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <p className="text-sm text-slate-500">Total amount paid</p>
                                            <p className="text-2xl font-black text-slate-900">₹{order.totalAmount}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-[2.5rem] bg-white border border-dashed border-slate-200 px-8 py-16 text-center">
                                <p className="text-xl font-semibold text-slate-700">No orders yet</p>
                                <p className="mt-4 text-slate-500">Your orders will appear here when you make your first purchase.</p>
                                <Link to="/" className="mt-8 inline-flex rounded-3xl bg-primary px-6 py-3 text-white font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition">Start ordering</Link>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;
