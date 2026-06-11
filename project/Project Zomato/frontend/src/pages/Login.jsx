import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await login(email, password);
            toast.success('Welcome back!');
            if (res.user?.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            const msg = err.response?.data?.error || err.message || 'Login failed';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 p-4">
            <div className="w-full max-w-md rounded-[2.5rem] bg-white/95 border border-slate-200 shadow-2xl shadow-slate-300/20 backdrop-blur-xl overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="text-center mb-10">
                        <span className="inline-flex rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] mb-4">Welcome back</span>
                        <h2 className="text-4xl font-black text-slate-900 mb-3">Login</h2>
                        <p className="text-slate-500">Sign in to continue your food journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input 
                                    type="email"
                                    className="w-full pl-12 pr-4 py-4 rounded-3xl bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white outline-none transition-all shadow-sm"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input 
                                    type="password"
                                    className="w-full pl-12 pr-4 py-4 rounded-3xl bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white outline-none transition-all shadow-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-primary text-white py-4 rounded-3xl font-bold text-lg hover:bg-primary-dark transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>Login <ArrowRight size={20} /></>}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-slate-600 font-medium">
                        Don't have an account? <Link to="/register" className="text-primary hover:underline ml-1">Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
