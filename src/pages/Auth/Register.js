import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
    Sprout, 
    Eye, 
    EyeOff, 
    Shield, 
    MapPin, 
    Phone, 
    User, 
    Mail, 
    Building, 
    ArrowRight, 
    ArrowLeft,
    CheckCircle2,
    Lock
} from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        farmName: '',
        location: '',
        phoneNumber: '',
        farmSize: '',
        primaryCrop: '',
        experience: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateStep1 = () => {
        if (!formData.name.trim()) return 'Please enter your full name.';
        if (!formData.email.trim()) return 'Email address is required.';
        if (!formData.phoneNumber.trim()) return 'Phone number is required for alerts.';
        if (formData.password.length < 6) return 'Password must be at least 6 characters.';
        if (formData.password !== formData.confirmPassword) return 'Passwords do not match.';
        return null;
    };

    const validateStep2 = () => {
        if (!formData.farmName.trim()) return 'Farm name helps identify your data.';
        if (!formData.location.trim()) return 'Location is needed for weather alerts.';
        if (!formData.farmSize.trim()) return 'Please select your farm size.';
        if (!formData.primaryCrop.trim()) return 'Primary crop is required.';
        return null;
    };

    const handleNextStep = () => {
        const step1Error = validateStep1();
        if (step1Error) {
            setError(step1Error);
            return;
        }
        setError('');
        setCurrentStep(2);
    };

    const handlePrevStep = () => {
        setCurrentStep(1);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (currentStep === 1) {
            handleNextStep();
            return;
        }

        const step2Error = validateStep2();
        if (step2Error) {
            setError(step2Error);
            return;
        }

        setLoading(true);

        try {
            const result = await register(formData);
            if (result.success) {
                navigate('/app/dashboard');
            } else {
                setError(result.error || 'Registration failed. Try again.');
            }
        } catch (err) {
            setError('An error occurred. Check your connection.');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
            {/* Left Side: Brand Visuals */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-green-900 items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <pattern id="grid-reg" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100" height="100" fill="url(#grid-reg)" />
                    </svg>
                </div>
                
                <div className="absolute top-0 -left-20 w-96 h-96 bg-green-500 rounded-full blur-[120px] opacity-20"></div>
                <div className="absolute bottom-0 -right-20 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-20"></div>

                <div className="relative z-10 max-w-xl">
                    <div className="flex items-center space-x-3 mb-12 animate-fadeIn">
                        <div className="bg-white p-3 rounded-2xl shadow-xl shadow-green-950/20">
                            <Sprout className="text-green-600 w-10 h-10" />
                        </div>
                        <span className="text-4xl font-black text-white tracking-tighter">KrishiSahayak</span>
                    </div>

                    <h1 className="text-5xl font-black text-white leading-tight mb-8 animate-slideUp">
                        Join 10,000+ <br />
                        <span className="text-green-400">Indian Farmers</span> <br />
                        growing smarter.
                    </h1>

                    <div className="space-y-8 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                        {[
                            { title: "Smart Inventory", desc: "Know exactly what's in your shed at any time." },
                            { title: "Weather Insights", desc: "Get real-time weather alerts and agricultural reports." },
                            { title: "Automated Reports", desc: "Get financial reports tailored for agricultural loans." }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start space-x-4">
                                <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg">
                                    <CheckCircle2 className="text-green-400 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                                    <p className="text-green-100/70">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: Registration Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gray-50/50">
                <div className="w-full max-w-lg">
                    {/* Mobile Branding */}
                    <div className="lg:hidden flex items-center justify-center space-x-2 mb-12">
                        <div className="bg-green-600 p-2 rounded-xl">
                            <Sprout className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black text-gray-900">KrishiSahayak</span>
                    </div>

                    <div className="bg-white rounded-[40px] shadow-2xl shadow-green-900/5 p-8 sm:p-10 border border-gray-100 animate-slideUp relative">
                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100 rounded-t-[40px] overflow-hidden">
                            <div 
                                className="h-full bg-green-600 transition-all duration-500 ease-out" 
                                style={{ width: currentStep === 1 ? '50%' : '100%' }}
                            />
                        </div>

                        <div className="mb-10 text-center lg:text-left pt-4">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-3xl font-black text-gray-900">
                                    {currentStep === 1 ? 'Personal Details' : 'Farm Profile'}
                                </h2>
                                <span className="text-xs font-black bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase tracking-widest">
                                    Step {currentStep}/2
                                </span>
                            </div>
                            <p className="text-gray-500 font-medium">
                                {currentStep === 1 ? 'Tell us who you are.' : 'Tell us about your farm setup.'}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl flex items-center space-x-3 animate-shake">
                                <p className="text-red-700 text-sm font-bold">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {currentStep === 1 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5" />
                                                <input 
                                                    type="text" name="name" required placeholder="Your full name"
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none font-medium"
                                                    value={formData.name} onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                                            <div className="relative group">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5" />
                                                <input 
                                                    type="tel" name="phoneNumber" required placeholder="+91 98765 43210"
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none font-medium"
                                                    value={formData.phoneNumber} onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5" />
                                            <input 
                                                type="email" name="email" required placeholder="email@address.com"
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none font-medium"
                                                value={formData.email} onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                                            <div className="relative group">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5" />
                                                <input 
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password" required placeholder="••••••••"
                                                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none font-bold tracking-widest"
                                                    value={formData.password} onChange={handleChange}
                                                />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600">
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Confirm Password</label>
                                            <div className="relative group">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5" />
                                                <input 
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    name="confirmPassword" required placeholder="••••••••"
                                                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none font-bold tracking-widest"
                                                    value={formData.confirmPassword} onChange={handleChange}
                                                />
                                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600">
                                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Farm Name</label>
                                        <div className="relative group">
                                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5" />
                                            <input 
                                                type="text" name="farmName" required placeholder="Your farm name"
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none font-medium"
                                                value={formData.farmName} onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Location</label>
                                        <div className="relative group">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors w-5 h-5" />
                                            <input 
                                                type="text" name="location" required placeholder="City, State"
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none font-medium"
                                                value={formData.location} onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Farm Size</label>
                                            <select 
                                                name="farmSize" required
                                                className="w-full px-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none font-bold"
                                                value={formData.farmSize} onChange={handleChange}
                                            >
                                                <option value="">Select Size</option>
                                                <option value="small">0-5 Acres</option>
                                                <option value="medium">5-20 Acres</option>
                                                <option value="large">20-100 Acres</option>
                                                <option value="commercial">100+ Acres</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Primary Crop</label>
                                            <select 
                                                name="primaryCrop" required
                                                className="w-full px-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none font-bold"
                                                value={formData.primaryCrop} onChange={handleChange}
                                            >
                                                <option value="">Select Crop</option>
                                                <option value="wheat">🌾 Wheat</option>
                                                <option value="paddy">🍚 Paddy</option>
                                                <option value="cotton">☁️ Cotton</option>
                                                <option value="maize">🌽 Maize</option>
                                                <option value="mustard">🌼 Mustard</option>
                                                <option value="sugarcane">🎋 Sugarcane</option>
                                                <option value="vegetables">🥕 Vegetables</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="flex gap-4 pt-6">
                                {currentStep === 2 && (
                                    <button 
                                        type="button" onClick={handlePrevStep}
                                        className="flex-1 bg-white border-2 border-green-100 text-green-700 font-bold py-4 rounded-2xl hover:bg-green-50 transition-all flex items-center justify-center space-x-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        <span>Back</span>
                                    </button>
                                )}
                                <button 
                                    type="submit" disabled={loading}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-green-950/10 hover:shadow-green-950/20 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <span>{currentStep === 1 ? 'Go to Step 2' : 'Complete Registration'}</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="text-center pt-6">
                                <p className="text-gray-500 font-medium">
                                    Already have an account? {' '}
                                    <Link to="/login" className="text-green-600 font-black hover:underline underline-offset-4">Sign in here</Link>
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

export default Register;