import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
    const { id } = useParams();

    return (
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
            <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-gray-200 border border-gray-50"
            >
                <div className="flex justify-center mb-8">
                    <div className="bg-green-100 p-6 rounded-full text-green-600">
                        <CheckCircle size={80} />
                    </div>
                </div>
                
                <h1 className="text-4xl font-black mb-4">Mmm, Yummy!</h1>
                <p className="text-xl text-gray-500 mb-2">Your order has been placed successfully.</p>
                <p className="text-gray-400 font-medium mb-10">Order ID: #{id.slice(-6).toUpperCase()}</p>

                <div className="bg-gray-50 p-6 rounded-2xl mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                        <div className="bg-white p-3 rounded-xl shadow-sm text-primary">
                            <Package size={24} />
                        </div>
                        <div>
                            <div className="font-bold">Next Step</div>
                            <div className="text-sm text-gray-500 whitespace-nowrap">Restaurant is preparing your food</div>
                        </div>
                    </div>
                    <div className="h-1 w-12 bg-gray-200 rounded-full hidden sm:block"></div>
                    <div className="text-primary font-bold text-sm hidden sm:block">Track Status</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                        to="/profile" 
                        className="flex-1 bg-dark text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all"
                    >
                        View Order History
                    </Link>
                    <Link 
                        to="/" 
                        className="flex-1 border-2 border-gray-100 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
                    >
                        <Home size={20} /> Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;
