import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Sprout, Eye, EyeOff, Wheat, Shield, Users, Mail, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/app/dashboard';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(formData);
            if (result.success) {
                navigate(from, { replace: true });
            } else {
                setError(result.error || 'Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('An error occurred during login');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
            {/* Left Side: Brand & Visuals */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-green-900 items-center justify-center p-12 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grid)" />
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                    </svg>
                </div>
                
                {/* Decorative Blobs */}
                <div className="absolute top-0 -left-20 w-96 h-96 bg-green-500 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 -right-20 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-20"></div>

                <div className="relative z-10 max-w-xl">
                    <div className="flex items-center space-x-3 mb-12 animate-fadeIn">
                        <div className="bg-white p-3 rounded-2xl shadow-xl shadow-green-950/20">
                            <Sprout className="text-green-600 w-10 h-10" />
                        </div>
                        <span className="text-4xl font-black text-white tracking-tighter">KrishiSahayak</span>
                    </div>

                    <h1 className="text-5xl font-black text-white leading-tight mb-8 animate-slideUp">
                        Empowering the <br />
                        <span className="text-green-400">Indian Farmer</span> <br />
                        with Smart Data.
                    </h1>

                    <div className="space-y-8 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                        {[
                            { icon: CheckCircle2, title: "Precision Inventory", desc: "Track every seed and fertilizer bag with ease." },
                            { icon: CheckCircle2, title: "Market Smart", desc: "Real-time Mandi prices at your fingertips." },
                            { icon: CheckCircle2, title: "Finance First", desc: "Simple, transparent savings and expense tracking." }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start space-x-4 group">
                                <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg group-hover:bg-green-500/20 transition-colors">
                                    <item.icon className="text-green-400 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                                    <p className="text-green-100/70">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                        <p className="text-green-100 italic text-lg leading-relaxed">
                            "This app has completely changed how I manage my farm in Punjab. I finally feel in control of my costs."
                        </p>
                        <div className="mt-4 flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/20"></div>
                            <div>
                                <p className="text-white font-bold">Harpreet Singh</p>
                                <p className="text-green-400 text-sm">Wheat Farmer, Amritsar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gray-50/50">
                <div className="w-full max-w-md">
                    {/* Mobile Branding */}
                    <div className="lg:hidden flex items-center justify-center space-x-2 mb-12">
                        <div className="bg-green-600 p-2 rounded-xl">
                            <Sprout className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black text-gray-900">KrishiSahayak</span>
                    </div>

                    <div className="bg-white rounded-[40px] shadow-2xl shadow-green-900/5 p-8 sm:p-12 border border-gray-100 animate-slideUp">
                        <div className="mb-10 text-center lg:text-left">
                            <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h2>
                            <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
                        </div>

                        {error && (
                            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl flex items-center space-x-3 animate-shake">
                                <div className="bg-red-500/10 p-1.5 rounded-lg">
                                    <Shield className="text-red-500 w-5 h-5" />
                                </div>
                                <p className="text-red-700 text-sm font-bold">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5" />
                                    <input 
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Enter your email"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none font-medium"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-sm font-bold text-gray-700">Password</label>
                                    <Link to="#" className="text-xs font-bold text-green-600 hover:text-green-700">Forgot Password?</Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5" />
                                    <input 
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none font-medium text-lg tracking-widest"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center px-1">
                                <input 
                                    type="checkbox" 
                                    id="remember"
                                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-500 font-medium">Remember for 30 days</label>
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-green-950/10 hover:shadow-green-950/20 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <div className="text-center pt-4">
                                <p className="text-gray-500 font-medium">
                                    New to KrishiSahayak? {' '}
                                    <Link to="/register" className="text-green-600 font-black hover:underline underline-offset-4">Create account</Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    <p className="mt-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                        SECURED BY KRISHISAHAYAK PROTECT
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;