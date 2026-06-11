import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, MapPin, Plus, Heart, Share2, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [foodItems, setFoodItems] = useState([]);
    const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await api.get(`/restaurants/${id}`);
                const restaurantData = res.data;
                setRestaurant(restaurantData);

                const foodRes = await api.get(`/food/restaurant/${id}`);
                setFoodItems(foodRes.data);

                const allRes = await api.get('/restaurants');
                const nearby = allRes.data.filter((item) => item._id !== id && item.location === restaurantData.location);
                if (!nearby.length) {
                    const categoryMatch = allRes.data.filter((item) => item._id !== id && item.categories.some((cat) => restaurantData.categories.includes(cat)));
                    setNearbyRestaurants(categoryMatch.slice(0, 4));
                } else {
                    setNearbyRestaurants(nearby.slice(0, 4));
                }
            } catch (err) {
                console.error(err);
                toast.error('Failed to load menu');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <div className="p-20 text-center">Loading...</div>;
    if (!restaurant) return <div className="p-20 text-center">Restaurant not found</div>;

    const handleAddToCart = (item) => {
        addToCart(item);
        toast.success(`${item.name} added to cart`);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-0">
            {/* Header */}
            <div className="mb-10">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <span>Home</span> / <span>{restaurant.location}</span> / <span className="text-gray-600">{restaurant.name}</span>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black mb-2">{restaurant.name}</h1>
                        <p className="text-gray-500 mb-4">{restaurant.categories.join(', ')}</p>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} className="text-gray-400" />
                                <span className="font-medium text-gray-600">{restaurant.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-gray-400" />
                                <span className="font-medium text-gray-600">{restaurant.deliveryTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start md:items-end flex-col gap-4">
                        <div className="border border-gray-100 rounded-2xl p-3 flex items-center gap-4 bg-white shadow-sm">
                            <div className="border-r border-gray-100 pr-4">
                                <div className="flex items-center gap-1 text-green-600 font-bold text-lg">
                                    <Star size={20} className="fill-green-600" />
                                    {restaurant.rating}
                                </div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Ratings</div>
                            </div>
                            <div>
                                <div className="font-bold text-lg">100+</div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Orders</div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="p-3 hover:bg-gray-100 rounded-full transition-colors border border-gray-100"><Heart size={20} /></button>
                            <button className="p-3 hover:bg-gray-100 rounded-full transition-colors border border-gray-100"><Share2 size={20} /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-px bg-gray-100 mb-10 w-full"></div>

            {/* Map */}
            <div className="mb-12 rounded-[2rem] overflow-hidden border border-gray-200 shadow-xl">
                <div className="bg-slate-950/95 px-6 py-5 text-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] font-semibold text-slate-200">
                            <MapPin size={18} /> Hotels near {restaurant.location}
                        </div>
                        <p className="text-slate-300 text-sm">Showing nearby places for a faster ‘near me’ experience.</p>
                    </div>
                </div>
                <div className="h-[360px] sm:h-[420px]">
                    <iframe
                        title="Nearby hotels"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(`hotels near ${restaurant.location}`)}&output=embed`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

            {nearbyRestaurants.length > 0 && (
                <div className="mb-20">
                    <div className="flex items-center justify-between mb-8 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold">Nearby places</h2>
                            <p className="text-gray-500">Restaurants close to this location.</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">{nearbyRestaurants.length} nearby</span>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {nearbyRestaurants.map((item) => (
                            <div key={item._id} className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition">
                                <div className="flex items-center gap-4 mb-4">
                                    <img src={item.image} alt={item.name} className="h-20 w-20 rounded-3xl object-cover" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                                        <p className="text-sm text-slate-500">{item.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-slate-600">
                                    <span className="font-semibold">{item.rating} ★</span>
                                    <span className="text-sm">{item.deliveryTime}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Menu */}
            <div className="mb-20">
                <h2 className="text-2xl font-bold mb-8">Recommended Items ({foodItems.length})</h2>
                
                <div className="space-y-8">
                    {foodItems.map((item) => (
                        <div key={item._id} className="flex flex-col md:flex-row justify-between gap-8 pb-10 border-b border-gray-50 last:border-0 group">
                            <div className="flex-1">
                                <div className={`w-4 h-4 border-2 ${item.isVeg ? 'border-green-600' : 'border-red-600'} rounded-sm flex items-center justify-center mb-2`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                                <div className="font-bold text-gray-700 mb-3">₹{item.price}</div>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-xl">{item.description}</p>
                            </div>

                            <div className="relative">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden shadow-lg">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <button 
                                    onClick={() => handleAddToCart(item)}
                                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white text-green-600 border border-gray-200 shadow-xl px-8 py-2 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
                                >
                                    ADD <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;
