import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantDetails from './pages/RestaurantDetails';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminEditRestaurant from './pages/AdminEditRestaurant';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
    return children;
};

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
                        <Navbar />
                        <main className="pt-28 pb-12">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                                <Route path="/order-success/:id" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
                                <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
                                <Route path="/admin/restaurants/edit/:id" element={<ProtectedRoute adminOnly><AdminEditRestaurant /></ProtectedRoute>} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </main>
                        <Toaster position="bottom-right" />
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
