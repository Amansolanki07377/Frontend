import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                // In a real app we'd have a separate categories endpoint or just static data
                const res = await api.get('/restaurants');
                setRestaurants(res.data);
                
                // For demo, let's use some static categories
                setCategories([
                    { name: 'Burger', image: 'https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg' },
                    { name: 'Pizza', image: 'https://img.freepik.com/free-photo/fresh-pizza-with-mushrooms-ham-cheese-tomato-isolated-white-background-top-view_639032-229.jpg' },
                    { name: 'Sushi', image: 'https://img.freepik.com/free-photo/sushi-set-maki-and-nigiri-sushi-with-salmon-shrimp-and-tuna_2829-14224.jpg' },
                    { name: 'Curry', image: 'https://img.freepik.com/free-photo/chicken-tikka-masala-spicy-curry-meat-food-in-pot-with-rice-and-naan-bread-dark-background_1150-42861.jpg' },
                    { name: 'Desserts', image: 'https://www.bing.com/th/id/OIP.1cecmCCk9WRuRVm11Qe82gHaIB?w=193&h=209&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' }
                ]);
            } catch (err) {
                console.error(err);
                toast.error('Could not fetch restaurants. Please check if backend is running.');
            } finally {
                setLoading(false);
            }
        };
        fetchHomeData();
    }, []);

    const filteredRestaurants = Array.isArray(restaurants) 
        ? restaurants.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : [];

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            {/* Hero Section */}
            <section className="relative min-h-[62vh] overflow-hidden rounded-[2rem] mb-16">
                <div className="absolute inset-0 opacity-80">
                    <img 
                        src="https://img.freepik.com/free-photo/delicious-burgers-on-wooden-board_23-2148290632.jpg" 
                        alt="Hero BG" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/30 to-slate-800/10"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 sm:px-10">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
                        <div>
                            <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] mb-6">
                                Best food, easy ordering
                            </span>
                            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-tight text-white mb-6">Delicious meals from top restaurants, delivered in minutes.</h1>
                            <p className="max-w-2xl text-lg text-slate-200/90 mb-10">Browse curated restaurants, order your favorite dishes, and get them delivered fresh and fast. A simple food experience for busy days.</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input 
                                        type="text"
                                        placeholder="Search restaurants, cuisine, or dish"
                                        className="w-full rounded-3xl border border-white/10 bg-white/95 px-14 py-4 text-slate-900 shadow-lg shadow-slate-900/10 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="inline-flex items-center justify-center rounded-3xl bg-primary px-10 py-4 text-white font-bold shadow-xl shadow-primary/25 hover:bg-primary-dark transition">
                                    Find food
                                    <ArrowRight className="ml-2" />
                                </button>
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[2rem] bg-white/95 p-6 shadow-2xl shadow-slate-900/10 border border-white/80">
                                <div className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-3">Fast Delivery</div>
                                <p className="text-lg font-semibold text-slate-900">Hot meals delivered quick with trusted local restaurants.</p>
                            </div>
                            <div className="rounded-[2rem] bg-white/95 p-6 shadow-2xl shadow-slate-900/10 border border-white/80">
                                <div className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-3">Top chefs</div>
                                <p className="text-lg font-semibold text-slate-900">Explore menus from handpicked restaurants with real reviews.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Categories */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-10">What's on your mind?</h2>
                <div className="flex gap-6 md:gap-10 overflow-x-auto pb-4 scrollbar-hide">
                    {categories.map((cat, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="flex-shrink-0 cursor-pointer"
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-3 border-4 border-white shadow-md">
                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-center font-semibold text-gray-700">{cat.name}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Restaurant Listing */}
            <section className="mb-20">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-bold">Top Restaurants</h2>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-all font-medium">Ratings 4.0+</button>
                        <button className="px-4 py-2 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-all font-medium">Fast Delivery</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {loading ? (
                        [...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 h-52 rounded-3xl mb-4"></div>
                                <div className="bg-gray-200 h-6 w-3/4 rounded-full mb-2"></div>
                                <div className="bg-gray-200 h-4 w-1/2 rounded-full"></div>
                            </div>
                        ))
                    ) : filteredRestaurants.length > 0 ? (
                        filteredRestaurants.map((res) => (
                            <Link to={`/restaurant/${res._id}`} key={res._id} className="group cursor-pointer">
                                <div className="relative rounded-3xl overflow-hidden mb-4 aspect-[4/3] card-hover">
                                    <img src={res.image} alt={res.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <button className="bg-white text-dark px-6 py-2 rounded-xl font-bold text-sm shadow-xl">View Menu</button>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 font-bold text-sm shadow-sm">
                                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                        {res.rating}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{res.name}</h3>
                                    <div className="flex items-center gap-4 text-gray-500 text-sm">
                                        <div className="flex items-center gap-1">
                                            <Clock size={16} />
                                            {res.deliveryTime}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            {res.location}
                                        </div>
                                    </div>
                                <p className="mt-2 text-gray-500 text-sm line-clamp-1">
                                    {res.categories?.join(', ')}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                            <p className="text-xl text-gray-500 font-medium font-sans">No restaurants found matching your search.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
