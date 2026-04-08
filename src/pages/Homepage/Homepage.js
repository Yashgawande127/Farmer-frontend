import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Sprout, 
    TrendingUp, 
    CloudSun, 
    ShieldCheck, 
    MessageCircle, 
    ArrowRight, 
    Globe, 
    ChevronRight,
    Search,
    IndianRupee,
    Truck,
    MapPin
} from 'lucide-react';

const Homepage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed w-full z-50 glass-enhanced border-b border-green-100 px-4 py-3">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="bg-green-600 p-2 rounded-lg">
                            <Sprout className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold gradient-text">KrishiSahayak</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium px-4">Login</Link>
                        <Link to="/register" className="btn-primary flex items-center space-x-2 px-6 py-2.5">
                            <span>Get Started</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative">
                    {/* Decorative glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-green-500/5 rounded-full blur-[120px] -z-10" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-slideUp">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-sm font-bold mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Trusted by 10,000+ Indian Farmers
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
                                Smart Farming for a <br />
                                <span className="text-green-600">Prosperous India</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                                Track your seeds, fertilizers, and machinery with ease. Get real-time Mandi prices and weather alerts specially designed for the Indian farmer.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link to="/register" className="btn-primary text-center px-10 py-5 text-lg shadow-xl shadow-green-100 flex items-center justify-center space-x-3">
                                    <span>Start Your Journey</span>
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                        
                        <div className="relative animate-fadeIn">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-100 rounded-full blur-3xl opacity-30 -z-10 animate-pulse"></div>
                        <img 
                            src="/assets/hero_farmer.png" 
                            alt="Indian Farmer using App" 
                            className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-500 shadow-green-200/50"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-green-50 animate-bounce-slow">
                            <div className="flex items-center space-x-3">
                                <TrendingUp className="text-green-600 w-8 h-8" />
                                <div>
                                    <p className="text-2xl font-bold">+25%</p>
                                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Crop Yield Increase</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

            {/* Quick Mandi & Weather Bar */}
            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass shadow-xl rounded-2xl p-6 border border-white hover-lift flex items-center space-x-6 backdrop-blur-md">
                        <img src="/assets/mandi_prices.png" alt="Mandi" className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                            <h3 className="font-bold text-gray-900">Today's Mandi</h3>
                            <div className="flex items-center text-green-600 font-semibold space-x-2">
                                <IndianRupee className="w-4 h-4" />
                                <span>Wheat: ₹2,450 / Quintal</span>
                            </div>
                            <Link to="/app/mandi" className="text-xs text-blue-600 flex items-center space-x-1 mt-1 font-bold uppercase">
                                <span>See all prices</span>
                                <ChevronRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    <div className="glass shadow-xl rounded-2xl p-6 border border-white hover-lift flex items-center space-x-6 backdrop-blur-md">
                        <img src="/assets/weather_icon.png" alt="Weather" className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                            <h3 className="font-bold text-gray-900">Weather Forecast</h3>
                            <div className="flex items-center text-orange-600 font-semibold space-x-2">
                                <CloudSun className="w-5 h-5" />
                                <span>32°C • Clear Sky</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Perfect day for harvesting in Maharashtra</p>
                        </div>
                    </div>

                    <div className="bg-green-600 shadow-xl rounded-2xl p-6 border border-green-500 hover-lift flex items-center space-x-6 text-white overflow-hidden relative group">
                        <div className="absolute right-0 top-0 opacity-10 transform scale-150 rotate-12 transition-transform group-hover:scale-[1.7]">
                            <Sprout className="w-32 h-32" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Join the Revolution</h3>
                            <p className="text-green-50 opacity-90 text-sm mb-3">Maximize your farm profits today.</p>
                            <Link to="/register" className="bg-white text-green-700 px-6 py-2 rounded-xl font-bold text-sm inline-block shadow-lg">
                                Register Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Features */}
            <section id="features" className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-sm text-green-600 font-bold tracking-widest uppercase mb-4">Powerful Features</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">Everything you need to <br /> run a modern farm</h3>
                        <p className="text-lg text-gray-600">Manage your entire agricultural lifecycle from pre-sowing to final market sale.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Sprout,
                                title: "Seed Inventory",
                                desc: "Track seed quality, varieties, and stock levels effortlessly.",
                                color: "bg-emerald-100 text-emerald-600"
                            },
                            {
                                icon: TrendingUp,
                                title: "Input Management",
                                desc: "Monitor fertilizer and pesticide usage for maximum efficiency.",
                                color: "bg-blue-100 text-blue-600"
                            },
                            {
                                icon: Truck,
                                title: "Machinery Log",
                                desc: "Schedule maintenance and track usage of your tractors & equipment.",
                                color: "bg-orange-100 text-orange-600"
                            },
                            {
                                icon: ShieldCheck,
                                title: "Financial Tracker",
                                desc: "Keep a transparent record of all your farming expenses and incomes.",
                                color: "bg-purple-100 text-purple-600"
                            }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover-lift group">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-6 ${feature.color}`}>
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-500 mb-6 leading-relaxed">{feature.desc}</p>
                                <div className="flex items-center text-sm font-bold text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span>Learn more</span>
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why KrishiSahayak? */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="order-2 lg:order-1 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-12">
                                <div className="bg-green-600 text-white p-8 rounded-3xl shadow-xl hover-scale">
                                    <p className="text-4xl font-bold mb-2">95%</p>
                                    <p className="text-sm font-medium opacity-80">Farmer Satisfaction Rate</p>
                                </div>
                                <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 hover-scale">
                                    <p className="text-4xl font-bold text-orange-600 mb-2">₹12k</p>
                                    <p className="text-sm font-medium text-gray-500">Avg. Savings per Acre</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 hover-scale">
                                    <p className="text-4xl font-bold text-blue-600 mb-2">24/7</p>
                                    <p className="text-sm font-medium text-gray-500">Dedicated Helpline</p>
                                </div>
                                <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 hover-scale">
                                    <p className="text-4xl font-bold text-emerald-600 mb-2">15+</p>
                                    <p className="text-sm font-medium text-gray-500">Agri-Experts Team</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 animate-slideUp">
                        <h2 className="text-green-600 font-bold tracking-widest uppercase mb-4">Why KrishiSahayak?</h2>
                        <h3 className="text-4xl font-extrabold text-gray-900 mb-8 leading-tight">Built specifically for the <br /> Indian agricultural landscape</h3>
                        <div className="space-y-6">
                            {[
                                { title: "Localized Content", desc: "Available in Hindi, Marathi, Telugu and 12 other local languages." },
                                { title: "Offline Mode", desc: "Access your critical data even in areas with poor internet connectivity." },
                                { title: "Government Integration", desc: "Stay updated with latest PM-Kisan schemes and government subsidies." }
                            ].map((item, i) => (
                                <div key={i} className="flex space-x-4">
                                    <div className="bg-green-100 text-green-600 flex-none w-12 h-12 rounded-xl flex items-center justify-center">
                                        <ChevronRight className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-gray-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-green-600 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <Sprout className="w-[800px] h-[800px] absolute -top-40 -left-40 rotate-45" />
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16 text-white">
                        <h2 className="text-5xl font-black mb-4">Success Stories</h2>
                        <p className="text-green-100 text-xl font-medium">Hear it from farmers who changed their future</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Rajesh Gaikwad",
                                location: "Nashik, Maharashtra",
                                img: "https://randomuser.me/api/portraits/men/44.jpg",
                                quote: "Digital record keeping seemed hard, but this app made it so simple. I saved ₹50,000 last season by optimizing my fertilizer use."
                            },
                            {
                                name: "Anil Sharma",
                                location: "Ludhiana, Punjab",
                                img: "https://randomuser.me/api/portraits/men/32.jpg",
                                quote: "The machinery log helps me keep my tractors in top condition. No more unexpected breakdowns during harvest time!"
                            },
                            {
                                name: "Suresh Reddy",
                                location: "Warangal, Telangana",
                                img: "https://randomuser.me/api/portraits/men/85.jpg",
                                quote: "Mandi price alerts are a lifesaver. I now know exactly when and where to sell my crops for the best profit."
                            }
                        ].map((t, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-xl p-8 rounded-[40px] border border-white/20 text-white hover-lift">
                                <p className="text-lg italic mb-8 opacity-90 leading-relaxed">"{t.quote}"</p>
                                <div className="flex items-center space-x-4 border-t border-white/10 pt-6">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-400">
                                        <div className="w-full h-full bg-green-200"></div>
                                    </div>
                                    <div>
                                        <p className="font-bold">{t.name}</p>
                                        <p className="text-xs text-green-200 uppercase tracking-widest">{t.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[50px] p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/10 blur-[100px]"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px]"></div>
                        
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">Ready to take your farm <br /> to the digital age?</h2>
                        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                            Join thousands of Indian farmers who are already managing their farms smarter.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-green-900/40">
                                Start Your Trial
                            </Link>
                            <button className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-12 py-5 rounded-2xl font-bold text-xl transition-all">
                                Watch Tutorial
                            </button>
                        </div>
                        
                        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-40">
                            <div className="flex items-center space-x-2">
                                <ShieldCheck className="text-white w-5 h-5" />
                                <span className="text-white text-sm font-medium whitespace-nowrap">Secure Data</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MessageCircle className="text-white w-5 h-5" />
                                <span className="text-white text-sm font-medium whitespace-nowrap">Expert Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 divide-y divide-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-8">
                                <div className="bg-green-600 p-2 rounded-lg text-white">
                                    <Sprout className="w-6 h-6" />
                                </div>
                                <span className="text-2xl font-bold text-gray-900">KrishiSahayak</span>
                            </div>
                            <p className="text-gray-500 text-lg mb-8 max-w-sm">
                                Dedicated to improving the lives of Indian farmers through smart, accessible technology and data-driven insights.
                            </p>
                            <div className="flex space-x-4">
                                {/* Social Media Mock */}
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors cursor-pointer text-gray-400">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-sm">Product</h4>
                            <ul className="space-y-4 font-medium text-gray-500">
                                <li className="hover:text-green-600 transition-colors cursor-pointer">Seed Management</li>
                                <li className="hover:text-green-600 transition-colors cursor-pointer">Inventory Tracking</li>
                                <li className="hover:text-green-600 transition-colors cursor-pointer">Market Prices</li>
                                <li className="hover:text-green-600 transition-colors cursor-pointer">Weather Alerts</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-sm">Company</h4>
                            <ul className="space-y-4 font-medium text-gray-500">
                                <li className="hover:text-green-600 transition-colors cursor-pointer">About Us</li>
                                <li className="hover:text-green-600 transition-colors cursor-pointer">Success Stories</li>
                                <li className="hover:text-green-600 transition-colors cursor-pointer">Contact</li>
                                <li className="hover:text-green-600 transition-colors cursor-pointer">Terms & Privacy</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm font-medium">
                        <p>© 2025 KrishiSahayak. All rights reserved.</p>
                        <div className="flex items-center space-x-2 mt-4 md:mt-0">
                            <MapPin className="w-4 h-4" />
                            <span>Made with ❤️ for Indian Agriculture</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;