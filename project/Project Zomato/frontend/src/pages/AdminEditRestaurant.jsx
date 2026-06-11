import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Loader2, Plus } from 'lucide-react';

const AdminEditRestaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [restaurant, setRestaurant] = useState({ name: '', location: '', image: '', rating: 4.5, deliveryTime: '30 min', categories: [] });

    useEffect(() => {
        fetchRestaurant();
    }, []);

    const fetchRestaurant = async () => {
        try {
            const res = await api.get(`/restaurants/${id}`);
            const data = res.data;
            setRestaurant({
                name: data.name || '',
                location: data.location || '',
                image: data.image || '',
                rating: data.rating || 4.5,
                deliveryTime: data.deliveryTime || '30 min',
                categories: Array.isArray(data.categories) ? data.categories : (data.categories ? data.categories.split(',').map(c => c.trim()) : [])
            });
        } catch (err) {
            toast.error('Failed to load restaurant');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...restaurant,
                categories: typeof restaurant.categories === 'string' ? restaurant.categories.split(',').map(c => c.trim()) : restaurant.categories
            };
            await api.put(`/admin/restaurants/${id}`, payload);
            toast.success('Restaurant updated');
            navigate('/admin');
        } catch (err) {
            toast.error('Update failed');
        }
    };

    if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin inline mr-2" /> Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto p-8">
            <h2 className="text-3xl font-black mb-6">Edit Restaurant</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-500 mb-2">Restaurant Name</label>
                    <input className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" value={restaurant.name} onChange={e => setRestaurant({...restaurant, name: e.target.value})} required />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-500 mb-2">Location</label>
                    <input className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" value={restaurant.location} onChange={e => setRestaurant({...restaurant, location: e.target.value})} required />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-500 mb-2">Categories (comma separated)</label>
                    <input className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" value={Array.isArray(restaurant.categories) ? restaurant.categories.join(', ') : restaurant.categories} onChange={e => setRestaurant({...restaurant, categories: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-500 mb-2">Image URL</label>
                    <input className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" value={restaurant.image} onChange={e => setRestaurant({...restaurant, image: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-500 mb-2">Rating</label>
                        <input type="number" min="0" max="5" step="0.1" className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" value={restaurant.rating} onChange={e => setRestaurant({...restaurant, rating: Number(e.target.value)})} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-500 mb-2">Delivery Time</label>
                        <input className="w-full bg-gray-50 border-0 rounded-2xl p-4 outline-none focus:ring-4 ring-primary/10" value={restaurant.deliveryTime} onChange={e => setRestaurant({...restaurant, deliveryTime: e.target.value})} />
                    </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                    <button type="submit" className="bg-primary text-white px-6 py-3 rounded-2xl font-bold">Save Changes</button>
                    <button type="button" onClick={() => navigate('/admin')} className="bg-white border border-gray-200 px-6 py-3 rounded-2xl font-bold">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AdminEditRestaurant;
