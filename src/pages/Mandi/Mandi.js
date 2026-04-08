import React, { useState, useEffect } from 'react';
import { 
    Search, 
    TrendingUp, 
    TrendingDown, 
    MapPin, 
    Clock, 
    Filter,
    ArrowUpRight,
    IndianRupee,
    ChevronRight,
    Search as SearchIcon
} from 'lucide-react';

const Mandi = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedState, setSelectedState] = useState('All');
    
    // Mock data for Mandi prices
    const mandiData = [
        { id: 1, crop: 'Wheat (Grade A)', price: 2450, change: 1.5, state: 'Punjab', market: 'Khanna', trend: 'up' },
        { id: 2, crop: 'Paddy (Basmati)', price: 3800, change: -0.8, state: 'Haryana', market: 'Karnal', trend: 'down' },
        { id: 3, crop: 'Cotton (Long Staple)', price: 7200, change: 2.1, state: 'Maharashtra', market: 'Nagpur', trend: 'up' },
        { id: 4, crop: 'Maize (Yellow)', price: 1950, change: 0.5, state: 'Madhya Pradesh', market: 'Indore', trend: 'up' },
        { id: 5, crop: 'Mustard Seeds', price: 5600, change: -1.2, state: 'Rajasthan', market: 'Alwar', trend: 'down' },
        { id: 6, crop: 'Onion (Red)', price: 2100, change: 5.4, state: 'Maharashtra', market: 'Lasalgaon', trend: 'up' },
        { id: 7, crop: 'Potato (Jyoti)', price: 1200, change: 0.0, state: 'Uttar Pradesh', market: 'Agra', trend: 'stable' },
        { id: 8, crop: 'Soybean', price: 4800, change: -0.5, state: 'Madhya Pradesh', market: 'Ujjain', trend: 'down' },
    ];

    const states = ['All', 'Punjab', 'Haryana', 'Maharashtra', 'Madhya Pradesh', 'Rajasthan', 'Uttar Pradesh'];

    const filteredData = mandiData.filter(item => {
        const matchesSearch = item.crop.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             item.market.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesState = selectedState === 'All' || item.state === selectedState;
        return matchesSearch && matchesState;
    });

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Real-time Mandi Prices</h1>
                    <p className="text-gray-500 mt-1 font-medium">Daily market rates across major Indian APMCs</p>
                </div>
                <div className="flex items-center space-x-2 text-sm bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-100">
                    <Clock className="w-4 h-4" />
                    <span className="font-bold">Last Updated: Today, 10:30 AM</span>
                </div>
            </div>

            {/* Quick Stats / Trends */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-blue-50 p-3 rounded-xl">
                            <TrendingUp className="text-blue-600 w-6 h-6" />
                        </div>
                        <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs font-bold font-mono">+12.4%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Top Gainer Today</h3>
                    <p className="text-2xl font-black text-gray-900">Onion (Red)</p>
                    <p className="text-sm text-gray-500 mt-2">Driven by export demand in Lasalgaon</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-green-50 p-3 rounded-xl">
                            <MapPin className="text-green-600 w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Active Markets</h3>
                    <p className="text-2xl font-black text-gray-900">452 APMCs</p>
                    <p className="text-sm text-gray-500 mt-2">Across 22 States & UTs</p>
                </div>

                <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
                    <div className="relative z-10 font-bold">
                        <h3 className="text-green-100 text-sm uppercase tracking-wider mb-4">Market Outlook</h3>
                        <p className="text-xl leading-snug">Monsoon arrival likely to impact pulse prices in the coming week.</p>
                        <button className="mt-4 flex items-center text-sm font-bold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                            Read Full Report <ArrowUpRight className="ml-2 w-4 h-4" />
                        </button>
                    </div>
                    <TrendingUp className="absolute -right-8 -bottom-8 w-40 h-40 text-white/10" />
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search crop or market (e.g. Wheat, Indore)..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-green-500 focus:bg-white transition-all outline-none font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <select 
                        className="px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-green-500 focus:bg-white transition-all outline-none font-bold text-gray-700"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                    >
                        {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    <button className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
                        <Filter className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Price Table / Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredData.length > 0 ? (
                    filteredData.map(item => (
                        <div key={item.id} className="bg-white border border-gray-100 rounded-3xl p-6 hover:border-green-200 transition-all hover:shadow-xl hover:shadow-green-900/5 group">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-4 rounded-2xl ${
                                        item.trend === 'up' ? 'bg-green-50 text-green-600' : 
                                        item.trend === 'down' ? 'bg-red-50 text-red-600' : 
                                        'bg-gray-50 text-gray-600'
                                    }`}>
                                        {item.trend === 'up' ? <TrendingUp className="w-8 h-8" /> : 
                                         item.trend === 'down' ? <TrendingDown className="w-8 h-8" /> : 
                                         <Clock className="w-8 h-8" />}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-gray-900 group-hover:text-green-600 transition-colors">{item.crop}</h3>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500 font-bold mt-1">
                                            <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {item.market}, {item.state}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end text-2xl font-black text-gray-900">
                                        <IndianRupee className="w-5 h-5 mr-1" />
                                        <span>{item.price.toLocaleString()}</span>
                                    </div>
                                    <div className={`flex items-center justify-end text-sm font-bold mt-1 ${
                                        item.trend === 'up' ? 'text-green-600' : 
                                        item.trend === 'down' ? 'text-red-600' : 
                                        'text-gray-400'
                                    }`}>
                                        {item.trend === 'up' && '+'}
                                        {item.change}% {item.trend !== 'stable' && (item.trend === 'up' ? '▲' : '▼')}
                                        {item.trend === 'stable' && 'Steady'}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center font-bold">
                                <div className="flex space-x-4 text-xs tracking-widest uppercase text-gray-400">
                                    <div>Min: ₹{(item.price * 0.95).toFixed(0)}</div>
                                    <div>Max: ₹{(item.price * 1.05).toFixed(0)}</div>
                                </div>
                                <button className="text-green-600 text-sm flex items-center hover:translate-x-1 transition-transform">
                                    Details <ChevronRight className="ml-1 w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900">No prices found</h3>
                        <p className="text-gray-500">Try searching for a different crop or state</p>
                    </div>
                )}
            </div>
            
            {/* Disclaimer */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                    * Prices shown are weighted average modal prices of the day. Actual prices may vary depending on moisture content, quality grades, and local market conditions. Data is sourced from AGMARKNET and various state APMC boards.
                </p>
            </div>
        </div>
    );
};

export default Mandi;
