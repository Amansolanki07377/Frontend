import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { LayoutDashboard, Utensils, Users, ShoppingBag, DollarSign, Plus, Trash2, Loader2, ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddResModal, setIsAddResModal] = useState(false);
    const [isAddFoodModal, setIsAddFoodModal] = useState(false);
    
    // Form states
    const [newRes, setNewRes] = useState({ name: '', location: '', image: '', rating: 4.5, deliveryTime: '30 min', categories: [] });
    const [newFood, setNewFood] = useState({ name: '', description: '', price: '', image: '', category: '', isVeg: true, restaurantId: '' });
    const navigate = useNavigate();
    const videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const [statsRes, resRes, notificationsRes] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/restaurants'),
                api.get('/admin/notifications')
            ]);
            setStats(statsRes.data);
            setRestaurants(resRes.data);
            setNotifications(notificationsRes.data);
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                toast.error('Admin access required. Please login again.');
                navigate('/login');
                return;
            }
            toast.error('Failed to load admin data');
        } finally {
            setLoading(false);
        }
    };

    const handleAddRestaurant = async (e) => {
        e.preventDefault();
        try {
            const resData = { ...newRes, categories: typeof newRes.categories === 'string' ? newRes.categories.split(',').map(c => c.trim()) : newRes.categories };
            await api.post('/admin/restaurants', resData);
            toast.success('Restaurant added successfully!');
            setIsAddResModal(false);
            setNewRes({ name: '', location: '', image: '', rating: 4.5, deliveryTime: '30 min', categories: [] });
            fetchAdminData();
        } catch (err) {
            toast.error('Failed to add restaurant');
        }
    };

    const handleAddFoodItem = async (e) => {
        e.preventDefault();
        if (!newFood.restaurantId) {
            toast.error('Please select a restaurant for this menu item.');
            return;
        }
        try {
            const resData = {
                name: newFood.name,
                description: newFood.description,
                price: Number(newFood.price),
                image: newFood.image,
                category: newFood.category,
                isVeg: newFood.isVeg,
                restaurantId: newFood.restaurantId
            };
            await api.post('/admin/food', resData);
            toast.success('Menu item added successfully!');
            setIsAddFoodModal(false);
            setNewFood({ name: '', description: '', price: '', image: '', category: '', isVeg: true, restaurantId: '' });
        } catch (err) {
            toast.error('Failed to add menu item');
        }
    };

    const handleDeleteRestaurant = async (id) => {
        if (!window.confirm('Are you sure you want to delete this restaurant? All menu items will also be deleted.')) return;
        try {
            await api.delete(`/admin/restaurants/${id}`);
            toast.success('Restaurant deleted');
            fetchAdminData();
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    const markNotificationRead = async (id) => {
        try {
            await api.post(`/admin/notifications/${id}/read`);
            fetchAdminData();
        } catch (err) {
            toast.error('Failed to update notification');
        }
    };

    if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin inline mr-2" /> Loading Admin Panel...</div>;

    return (
        <div className="max-w-[1400px] mx-auto px-4 lg:px-12 py-10">
            <h1 className="text-4xl font-black mb-8 flex items-center gap-4">
                <LayoutDashboard size={40} className="text-primary" /> Admin Command Center
            </h1>

            <div className="grid gap-8 lg:grid-cols-[1.45fr_1fr] mb-16">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-300 border border-slate-200">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full min-h-[320px] object-cover"
                        src={videoUrl}
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="rounded-[2.5rem] bg-white border border-slate-200 shadow-2xl shadow-slate-300/30 p-10 flex flex-col justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-4">Admin Start Guide</p>
                        <h2 className="text-4xl font-black text-slate-900 mb-5">Quick admin walkthrough</h2>
                        <p className="text-slate-600 leading-relaxed">This video gives you a quick start with restaurant and menu management, order tracking, and performance overview. Use the buttons below to jump directly into the most important admin actions.</p>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-4 text-white font-semibold hover:bg-primary-dark transition">Play video</button>
                        <button onClick={() => window.scrollTo({ top: 420, behavior: 'smooth' })} className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-4 text-slate-700 hover:bg-slate-100 transition">Go to restaurant list</button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <StatCard title="Total Revenue" value={`₹${stats?.totalRevenue}`} icon={<DollarSign />} color="bg-green-500" trend="+12.5%" />
                <StatCard title="Total Orders" value={stats?.totalOrders} icon={<ShoppingBag />} color="bg-blue-500" trend="+8.2%" />
                <StatCard title="Total Users" value={stats?.totalUsers} icon={<Users />} color="bg-purple-500" trend="+3.1%" />
                <StatCard title="Restaurants" value={stats?.totalRestaurants} icon={<Utensils />} color="bg-orange-500" trend="+2 new" />
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 p-8 mb-16">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-2">Admin notifications</p>
                        <h2 className="text-3xl font-black text-slate-900">Order alerts</h2>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                        {stats?.unreadNotifications || 0} unread
                    </div>
                </div>
                <div className="grid gap-4">
                    {notifications.length > 0 ? notifications.map((note) => (
                        <div key={note._id} className="rounded-[2rem] border border-slate-200 p-5 bg-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <p className="font-semibold text-slate-900">{note.message}</p>
                                <p className="text-sm text-slate-500 mt-2">{new Date(note.createdAt).toLocaleString()}</p>
                            </div>
                            <button onClick={() => markNotificationRead(note._id)} className="self-start sm:self-auto rounded-full bg-primary text-white px-5 py-3 text-sm font-semibold hover:bg-primary-dark transition">Mark read</button>
                        </div>
                    )) : (
                        <div className="rounded-[2rem] border border-slate-200 p-8 bg-slate-50 text-slate-500 text-center">No new notifications yet.</div>
                    )}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-4">
                <div>
                    <h2 className="text-2xl font-black">Manage Restaurants</h2>
                    <p className="text-gray-500 mt-2">Add restaurants and menu items for your customers.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button 
                        onClick={() => setIsAddFoodModal(true)}
                        className="bg-white text-dark border border-gray-200 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <Plus size={20} /> Add Menu Item
                    </button>
                    <button 
                        onClick={() => setIsAddResModal(true)}
                        className="bg-primary text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
                    >
                        <Plus size={20} /> Add Restaurant
                    </button>
                </div>
            </div>

            {/* Restaurants Table */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 overflow-hidden border border-gray-50">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-6 font-black text-gray-400 uppercase tracking-widest text-xs">Restaurant</th>
                            <th className="px-8 py-6 font-black text-gray-400 uppercase tracking-widest text-xs">Location</th>
                            <th className="px-8 py-6 font-black text-gray-400 uppercase tracking-widest text-xs">Rating</th>
                            <th className="px-8 py-6 font-black text-gray-400 uppercase tracking-widest text-xs text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {restaurants.map((res) => (
                            <tr key={res._id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <img src={res.image} className="w-14 h-14 rounded-2xl object-cover" />
                                        <span className="font-bold text-lg">{res.name}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-gray-500 font-medium">{res.location}</td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-1 font-black text-green-600">
                                        {res.rating} ★
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition-all" title="View details" onClick={() => navigate(`/restaurant/${res._id}`)} >
                                            <ArrowUpRight size={20} />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/admin/restaurants/edit/${res._id}`)}
                                            className="p-3 text-yellow-500 hover:bg-yellow-50 rounded-xl transition-all"
                                            title="Edit"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteRestaurant(res._id)}
                                            className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all" 
                                            title="Delete"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Modal Placeholder */}
            {isAddResModal && (
                <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl relative">
                        <button onClick={() => setIsAddResModal(false)} className="absolute top-8 right-8 text-gray-400 hover:text-dark"><Plus size={30} className="rotate-45" /></button>
                        <h3 className="text-3xl font-black mb-8">New Restaurant</h3>
                        <form onSubmit={handleAddRestaurant} className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-500 mb-2">Restaurant Name</label>
                                <input className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" placeholder="e.g. Taco Bell" value={newRes.name} onChange={e => setNewRes({...newRes, name: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-2">Location</label>
                                <input className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" placeholder="e.g. 5th Ave" value={newRes.location} onChange={e => setNewRes({...newRes, location: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-2">Categories (comma separated)</label>
                                <input className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" placeholder="Burger, Fast Food" value={Array.isArray(newRes.categories) ? newRes.categories.join(', ') : newRes.categories} onChange={e => setNewRes({...newRes, categories: e.target.value})} required />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-500 mb-2">Image URL</label>
                                <input className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" placeholder="https://images.unsplash.com/..." value={newRes.image} onChange={e => setNewRes({...newRes, image: e.target.value})} required />
                            </div>
                            <button type="submit" className="col-span-2 bg-primary text-white py-5 rounded-2xl font-black text-xl mt-4 hover:shadow-2xl hover:shadow-primary/30 transition-all">Create Restaurant</button>
                        </form>
                    </div>
                </div>
            )}
            {isAddFoodModal && (
                <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl relative">
                        <button onClick={() => setIsAddFoodModal(false)} className="absolute top-8 right-8 text-gray-400 hover:text-dark"><Plus size={30} className="rotate-45" /></button>
                        <h3 className="text-3xl font-black mb-8">New Menu Item</h3>
                        <form onSubmit={handleAddFoodItem} className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-500 mb-2">Menu Item Name</label>
                                <input className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" placeholder="e.g. Chicken Burger" value={newFood.name} onChange={e => setNewFood({...newFood, name: e.target.value})} required />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-500 mb-2">Restaurant</label>
                                <select className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" value={newFood.restaurantId} onChange={e => setNewFood({...newFood, restaurantId: e.target.value})} required>
                                    <option value="">Select restaurant</option>
                                    {restaurants.map((res) => (
                                        <option key={res._id} value={res._id}>{res.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-2">Category</label>
                                <input className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" placeholder="e.g. Burger" value={newFood.category} onChange={e => setNewFood({...newFood, category: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-2">Price</label>
                                <input type="number" min="0" step="0.01" className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" placeholder="e.g. 200" value={newFood.price} onChange={e => setNewFood({...newFood, price: e.target.value})} required />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-500 mb-2">Description</label>
                                <textarea className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" rows="4" placeholder="Delicious chicken burger..." value={newFood.description} onChange={e => setNewFood({...newFood, description: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-2">Image URL</label>
                                <input className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" placeholder="https://images.unsplash.com/..." value={newFood.image} onChange={e => setNewFood({...newFood, image: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-2">Veg / Non-veg</label>
                                <select className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" value={newFood.isVeg ? 'veg' : 'nonveg'} onChange={e => setNewFood({...newFood, isVeg: e.target.value === 'veg'})}>
                                    <option value="veg">Veg</option>
                                    <option value="nonveg">Non-Veg</option>
                                </select>
                            </div>
                            <button type="submit" className="col-span-2 bg-primary text-white py-5 rounded-2xl font-black text-xl mt-4 hover:shadow-2xl hover:shadow-primary/30 transition-all">Create Menu Item</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ title, value, icon, color, trend }) => (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50 relative overflow-hidden group">
        <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-[0.03] rounded-bl-[5rem] group-hover:scale-110 transition-transform`}></div>
        <div className="flex justify-between items-start mb-6">
            <div className={`${color} p-4 rounded-3xl text-white shadow-lg`}>
                {React.cloneElement(icon, { size: 28, stroke: 'white' })}
            </div>
            <div className="text-green-500 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">{trend}</div>
        </div>
        <div>
            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-1">{title}</div>
            <div className="text-4xl font-black text-dark">{value}</div>
        </div>
    </div>
);

export default AdminDashboard;
