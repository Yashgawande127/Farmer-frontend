import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    Sprout,
    Truck,
    Leaf,
    Wallet,
    TrendingUp,
    TrendingDown,
    Plus,
    Package,
    DollarSign,
    Calendar,
    AlertTriangle,
    Cloud,
    Sun,
    Droplets,
    Thermometer,
    Wind,
    Activity,
    Target,
    Clock,
    Phone,
    MapPin,
    Bell,
    Shield,
    Users,
    BarChart3,
    TrendingDown as ArrowDown,
    TrendingUp as ArrowUp,
    Eye,
    RefreshCw,
    PieChart,
    LineChart,
    Star,
    Award,
    Zap,
    Crown,
    Sunrise,
    Settings,
    ChevronRight,
    Globe,
    Wifi
} from 'lucide-react';
import {
    ResponsiveContainer,
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart as RechartsBarChart,
    Bar,
    PieChart as RechartsPieChart,
    Cell,
    Pie,
    AreaChart,
    Area
} from 'recharts';

const Dashboard = () => {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState({
        totalSeeds: 156,
        totalMachinery: 8,
        totalFertilizers: 24,
        savingsBalance: 45000,
        cropHealth: 85,
        activeFields: 12,
        weatherData: {
            temperature: 28,
            humidity: 65,
            windSpeed: 12,
            condition: 'Partly Cloudy',
            forecast: [
                { day: 'Today', temp: 28, condition: 'sunny', rain: 0 },
                { day: 'Tomorrow', temp: 26, condition: 'cloudy', rain: 20 },
                { day: 'Thu', temp: 24, condition: 'rainy', rain: 80 },
                { day: 'Fri', temp: 25, condition: 'sunny', rain: 10 }
            ]
        },
        recentTransactions: [
            { id: 1, type: 'seed_sale', amount: 5000, date: '2024-01-15', description: 'Wheat Seeds Sale', category: 'income' },
            { id: 2, type: 'machinery_rent', amount: -2000, date: '2024-01-14', description: 'Tractor Rent', category: 'expense' },
            { id: 3, type: 'fertilizer_purchase', amount: -1500, date: '2024-01-13', description: 'NPK Fertilizer', category: 'expense' },
            { id: 4, type: 'seed_purchase', amount: -3000, date: '2024-01-12', description: 'Rice Seeds', category: 'expense' }
        ],
        inventoryInsights: [
            { name: 'Wheat Seeds', current: 15, optimal: 25, status: 'low', trend: 'decreasing', nextDelivery: '2024-01-20' },
            { name: 'NPK Fertilizer', current: 8, optimal: 15, status: 'critical', trend: 'stable', nextDelivery: '2024-01-18' },
            { name: 'Pesticide Spray', current: 3, optimal: 10, status: 'low', trend: 'increasing', nextDelivery: '2024-01-22' }
        ],
        upcomingTasks: [
            { task: 'Wheat Field Irrigation', dueDate: '2024-01-17', priority: 'high', field: 'Field A' },
            { task: 'Fertilizer Application', dueDate: '2024-01-19', priority: 'medium', field: 'Field B' },
            { task: 'Crop Health Inspection', dueDate: '2024-01-21', priority: 'low', field: 'Field C' }
        ],
        monthlyRevenue: [
            { month: 'Jul', income: 45000, expenses: 32000, profit: 13000 },
            { month: 'Aug', income: 52000, expenses: 35000, profit: 17000 },
            { month: 'Sep', income: 48000, expenses: 28000, profit: 20000 },
            { month: 'Oct', income: 61000, expenses: 42000, profit: 19000 },
            { month: 'Nov', income: 55000, expenses: 38000, profit: 17000 },
            { month: 'Dec', income: 58000, expenses: 40000, profit: 18000 }
        ],
        cropYieldData: [
            { crop: 'Wheat', currentYear: 85, lastYear: 78, target: 90 },
            { crop: 'Rice', currentYear: 92, lastYear: 88, target: 95 },
            { crop: 'Corn', currentYear: 76, lastYear: 82, target: 85 },
            { crop: 'Barley', currentYear: 89, lastYear: 85, target: 92 }
        ],
        expenseBreakdown: [
            { name: 'Seeds', value: 35, amount: 14000, color: '#10B981' },
            { name: 'Fertilizers', value: 28, amount: 11200, color: '#059669' },
            { name: 'Machinery', value: 22, amount: 8800, color: '#3B82F6' },
            { name: 'Labor', value: 15, amount: 6000, color: '#8B5CF6' }
        ],
        inventoryTrends: [
            { month: 'Jul', seeds: 120, fertilizers: 45, machinery: 8 },
            { month: 'Aug', seeds: 145, fertilizers: 38, machinery: 8 },
            { month: 'Sep', seeds: 156, fertilizers: 42, machinery: 8 },
            { month: 'Oct', seeds: 142, fertilizers: 35, machinery: 9 },
            { month: 'Nov', seeds: 138, fertilizers: 28, machinery: 9 },
            { month: 'Dec', seeds: 156, fertilizers: 24, machinery: 8 }
        ]
    });

    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeChart, setActiveChart] = useState('revenue'); // State for chart switching

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const getSeasonalGreeting = () => {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 'Spring is here! Perfect time for planting.';
        if (month >= 5 && month <= 7) return 'Summer season - Keep your crops well watered!';
        if (month >= 8 && month <= 10) return 'Harvest season is approaching!';
        return 'Winter planning time - Prepare for next season!';
    };

    const getWeatherIcon = (condition) => {
        switch (condition.toLowerCase()) {
            case 'sunny': return <Sun className="h-5 w-5 text-yellow-500" />;
            case 'cloudy': return <Cloud className="h-5 w-5 text-gray-500" />;
            case 'rainy': return <Droplets className="h-5 w-5 text-blue-500" />;
            default: return <Sun className="h-5 w-5 text-yellow-500" />;
        }
    };

    const quickActions = [
        {
            name: 'Seeds Inventory',
            icon: Sprout,
            href: '/seeds',
            color: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
            description: 'Manage seed stock',
            badge: dashboardData.totalSeeds
        },
        {
            name: 'Machinery',
            icon: Truck,
            href: '/machinery',
            color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
            description: 'Equipment & rentals',
            badge: dashboardData.totalMachinery
        },
        {
            name: 'Fertilizers',
            icon: Leaf,
            href: '/fertilizers',
            color: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
            description: 'Nutrition & care',
            badge: dashboardData.totalFertilizers
        },
        {
            name: 'Savings',
            icon: Wallet,
            href: '/savings',
            color: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
            description: 'Financial planning',
            badge: `₹${(dashboardData.savingsBalance / 1000).toFixed(0)}K`
        },
        {
            name: 'Weather Alert',
            icon: Cloud,
            href: '#',
            color: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
            description: '7-day forecast',
            badge: `${dashboardData.weatherData.temperature}°C`
        },

        {
            name: 'Emergency',
            icon: Phone,
            href: '#',
            color: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
            description: 'Quick contacts',
            badge: 'SOS'
        },
        {
            name: 'Crop Planning',
            icon: Target,
            href: '#',
            color: 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700',
            description: 'Season planning',
            badge: 'New'
        }
    ];

    const statCards = [
        {
            name: 'Total Seeds',
            value: dashboardData.totalSeeds,
            icon: Sprout,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
            change: '+12%',
            changeType: 'increase',
            subtitle: 'Varieties available',
            progress: 78
        },
        {
            name: 'Machinery',
            value: dashboardData.totalMachinery,
            icon: Truck,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            change: '+2',
            changeType: 'increase',
            subtitle: 'Equipment ready',
            progress: 90
        },
        {
            name: 'Fertilizers',
            value: dashboardData.totalFertilizers,
            icon: Leaf,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100',
            change: '-5%',
            changeType: 'decrease',
            subtitle: 'Types in stock',
            progress: 65
        },
        {
            name: 'Savings Balance',
            value: `₹${dashboardData.savingsBalance.toLocaleString()}`,
            icon: Wallet,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
            change: '+8%',
            changeType: 'increase',
            subtitle: 'Monthly growth',
            progress: 85
        },
        {
            name: 'Crop Health',
            value: `${dashboardData.cropHealth}%`,
            icon: Activity,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
            change: '+5%',
            changeType: 'increase',
            subtitle: 'Overall status',
            progress: dashboardData.cropHealth
        },
        {
            name: 'Active Fields',
            value: dashboardData.activeFields,
            icon: MapPin,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
            change: 'Same',
            changeType: 'stable',
            subtitle: 'Under cultivation',
            progress: 100
        }
    ];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTransactionIcon = (type) => {
        switch (type) {
            case 'seed_sale':
                return <Sprout className="h-4 w-4" />;
            case 'machinery_rent':
                return <Truck className="h-4 w-4" />;
            case 'fertilizer_purchase':
                return <Leaf className="h-4 w-4" />;
            case 'seed_purchase':
                return <Package className="h-4 w-4" />;
            default:
                return <DollarSign className="h-4 w-4" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Premium Professional Header */}
            <div className="relative">
                {/* Background with animated patterns */}
                <div className="bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                    {/* Animated background elements */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

                    {/* Decorative floating elements */}
                    <div className="absolute top-4 right-4">
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse delay-75"></div>
                            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-150"></div>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                            {/* Main Welcome Section */}
                            <div className="xl:col-span-7">
                                <div className="flex items-center mb-4">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
                                        <Crown className="h-8 w-8 text-yellow-300" />
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                                                Welcome back, {user?.name}!
                                            </h1>
                                            <div className="flex space-x-1">
                                                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                                <Zap className="h-5 w-5 text-yellow-300" />
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-2 space-x-4">
                                            <div className="flex items-center space-x-2 text-green-100">
                                                <MapPin className="h-4 w-4" />
                                                <span className="text-lg font-medium">{user?.farmName}</span>
                                                <span className="text-green-200">•</span>
                                                <span className="text-green-200">{user?.location}</span>
                                            </div>
                                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                                <span className="text-sm font-medium">Premium Member</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Date and Time Section */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-white/20 rounded-lg p-2">
                                                <Calendar className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold">
                                                    {currentTime.toLocaleDateString('en-IN', {
                                                        weekday: 'long',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                                <p className="text-green-200 text-sm">{currentTime.getFullYear()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-white/20 rounded-lg p-2">
                                                <Clock className="h-5 w-5" />
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white font-semibold">
                                                    {currentTime.toLocaleTimeString('en-IN', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                                <p className="text-green-200 text-sm">Local Time</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Seasonal Advice */}
                                <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-yellow-400/30 rounded-lg p-2">
                                            <Sunrise className="h-5 w-5 text-yellow-300" />
                                        </div>
                                        <div>
                                            <p className="text-yellow-100 font-medium">Seasonal Insight</p>
                                            <p className="text-white text-sm">{getSeasonalGreeting()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Weather and Status Panel */}
                            <div className="xl:col-span-5 space-y-4">
                                {/* Weather Widget */}
                                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            <Cloud className="h-5 w-5 text-blue-300" />
                                            <h3 className="text-white font-semibold">Weather Now</h3>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Wifi className="h-4 w-4 text-green-300" />
                                            <span className="text-xs text-green-300">Live</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="text-center">
                                                {getWeatherIcon(dashboardData.weatherData.condition)}
                                                <p className="text-xs text-blue-200 mt-1">
                                                    {dashboardData.weatherData.condition}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-3xl font-bold text-white">
                                                    {dashboardData.weatherData.temperature}°C
                                                </p>
                                                <p className="text-blue-200 text-sm">Feels perfect</p>
                                            </div>
                                        </div>

                                        <div className="text-right space-y-2">
                                            <div className="flex items-center text-sm text-blue-200">
                                                <Droplets className="h-4 w-4 mr-2" />
                                                <span>{dashboardData.weatherData.humidity}% humidity</span>
                                            </div>
                                            <div className="flex items-center text-sm text-blue-200">
                                                <Wind className="h-4 w-4 mr-2" />
                                                <span>{dashboardData.weatherData.windSpeed} km/h wind</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Status Cards */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-green-400/30 rounded-lg p-2">
                                                <Activity className="h-5 w-5 text-green-300" />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-lg">87%</p>
                                                <p className="text-green-200 text-xs">Farm Health</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-blue-400/30 rounded-lg p-2">
                                                <Award className="h-5 w-5 text-blue-300" />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-lg">A+</p>
                                                <p className="text-blue-200 text-xs">Performance</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions Button */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                    <button className="w-full flex items-center justify-between text-white hover:bg-white/10 transition-colors rounded-lg p-2">
                                        <div className="flex items-center space-x-3">
                                            <Settings className="h-5 w-5" />
                                            <span className="font-medium">Dashboard Settings</span>
                                        </div>
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`flex-shrink-0 ${stat.bgColor} rounded-lg p-3`}>
                                    <Icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <div className={`flex items-center text-sm font-semibold ${stat.changeType === 'increase' ? 'text-green-600' :
                                    stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                                    }`}>
                                    {stat.changeType === 'increase' ? (
                                        <ArrowUp className="h-4 w-4 mr-1" />
                                    ) : stat.changeType === 'decrease' ? (
                                        <ArrowDown className="h-4 w-4 mr-1" />
                                    ) : (
                                        <RefreshCw className="h-4 w-4 mr-1" />
                                    )}
                                    {stat.change}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    <p className="text-xs text-gray-500">{stat.subtitle}</p>
                                </div>

                                <div className="mt-3">
                                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                                        <span>Progress</span>
                                        <span>{stat.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${stat.progress >= 80 ? 'bg-green-500' :
                                                stat.progress >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${stat.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Enhanced Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                    <span className="text-sm text-gray-500">Choose your next step</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <Link
                                key={index}
                                to={action.href}
                                className={`${action.color} text-white rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 relative overflow-hidden group`}
                            >
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-2">
                                        <Icon className="h-6 w-6" />
                                        <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                                            {action.badge}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{action.name}</div>
                                        <div className="text-xs opacity-90 mt-1">{action.description}</div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weather Forecast */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Weather Forecast</h2>
                        <Cloud className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {dashboardData.weatherData.forecast.map((day, index) => (
                            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs font-medium text-gray-600">{day.day}</p>
                                <div className="my-2 flex justify-center">
                                    {getWeatherIcon(day.condition)}
                                </div>
                                <p className="text-sm font-bold text-gray-900">{day.temp}°C</p>
                                <p className="text-xs text-blue-600">{day.rain}%</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Tasks */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Upcoming Tasks</h2>
                        <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                        {dashboardData.upcomingTasks.map((task, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 rounded-full ${task.priority === 'high' ? 'bg-red-500' :
                                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                        }`}></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{task.task}</p>
                                        <p className="text-xs text-gray-500">{task.field}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-medium text-gray-700">
                                        {formatDate(task.dueDate)}
                                    </p>
                                    <p className={`text-xs capitalize ${task.priority === 'high' ? 'text-red-600' :
                                        task.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                                        }`}>
                                        {task.priority}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Enhanced Transactions */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">This week</span>
                            <Link to="/savings" className="text-green-600 hover:text-green-700 text-sm font-medium">
                                View All
                            </Link>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {dashboardData.recentTransactions.map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg ${transaction.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        {getTransactionIcon(transaction.type)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                                        <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-sm font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                                    </div>
                                    <div className={`text-xs px-2 py-1 rounded-full ${transaction.category === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {transaction.category}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enhanced Inventory Insights */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Inventory Insights</h2>
                        <div className="flex items-center space-x-2">
                            <Bell className="h-4 w-4 text-yellow-500" />
                            <span className="text-xs text-gray-500">Smart alerts</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {dashboardData.inventoryInsights.map((item, index) => (
                            <div key={index} className={`p-4 rounded-lg border-l-4 ${item.status === 'critical' ? 'border-red-500 bg-red-50' :
                                item.status === 'low' ? 'border-yellow-500 bg-yellow-50' : 'border-green-500 bg-green-50'
                                }`}>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                    <div className={`flex items-center text-xs ${item.trend === 'increasing' ? 'text-green-600' :
                                        item.trend === 'decreasing' ? 'text-red-600' : 'text-gray-600'
                                        }`}>
                                        {item.trend === 'increasing' ? <ArrowUp className="h-3 w-3 mr-1" /> :
                                            item.trend === 'decreasing' ? <ArrowDown className="h-3 w-3 mr-1" /> :
                                                <RefreshCw className="h-3 w-3 mr-1" />}
                                        {item.trend}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-gray-600">Current: {item.current} units</span>
                                    <span className="text-xs text-gray-600">Optimal: {item.optimal} units</span>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                    <div
                                        className={`h-2 rounded-full ${item.status === 'critical' ? 'bg-red-500' :
                                            item.status === 'low' ? 'bg-yellow-500' : 'bg-green-500'
                                            }`}
                                        style={{ width: `${(item.current / item.optimal) * 100}%` }}
                                    ></div>
                                </div>

                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Next delivery: {formatDate(item.nextDelivery)}</span>
                                    <button className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'critical' ? 'bg-red-600 text-white' :
                                        item.status === 'low' ? 'bg-yellow-600 text-white' : 'bg-green-600 text-white'
                                        }`}>
                                        {item.status === 'critical' ? 'Order Now' : 'Reorder Soon'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Revenue Chart */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Financial Overview</h2>
                        <LineChart className="h-5 w-5 text-gray-400" />
                    </div>

                    {/* Chart Toggle Buttons */}
                    <div className="flex space-x-2 mb-4">
                        <button
                            onClick={() => setActiveChart('revenue')}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${activeChart === 'revenue'
                                ? 'bg-green-100 text-green-700 border border-green-300'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Revenue Trends
                        </button>
                        <button
                            onClick={() => setActiveChart('profit')}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${activeChart === 'profit'
                                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Profit Analysis
                        </button>
                    </div>

                    <ResponsiveContainer width="100%" height={250}>
                        <RechartsLineChart data={dashboardData.monthlyRevenue}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="month"
                                stroke="#6b7280"
                                fontSize={12}
                            />
                            <YAxis
                                stroke="#6b7280"
                                fontSize={12}
                                tickFormatter={(value) => `₹${value / 1000}K`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                                formatter={(value, name) => [`₹${value.toLocaleString()}`, name === 'income' ? 'Income' : name === 'expenses' ? 'Expenses' : 'Profit']}
                            />
                            <Legend />
                            {activeChart === 'revenue' ? (
                                <>
                                    <Line
                                        type="monotone"
                                        dataKey="income"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        dot={{ fill: '#10b981', r: 4 }}
                                        name="Income"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="expenses"
                                        stroke="#ef4444"
                                        strokeWidth={3}
                                        dot={{ fill: '#ef4444', r: 4 }}
                                        name="Expenses"
                                    />
                                </>
                            ) : (
                                <Line
                                    type="monotone"
                                    dataKey="profit"
                                    stroke="#3b82f6"
                                    strokeWidth={4}
                                    dot={{ fill: '#3b82f6', r: 5 }}
                                    name="Profit"
                                />
                            )}
                        </RechartsLineChart>
                    </ResponsiveContainer>

                    {/* Chart Insights */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                            {activeChart === 'revenue' ? (
                                <span>📈 <strong>Income increased by 12%</strong> this month. Great job on the wheat harvest!</span>
                            ) : (
                                <span>💰 <strong>Profit margin improved to 31%</strong>. Consider investing in new equipment.</span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Crop Yield Comparison */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Crop Performance</h2>
                        <BarChart3 className="h-5 w-5 text-gray-400" />
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <RechartsBarChart data={dashboardData.cropYieldData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="crop"
                                stroke="#6b7280"
                                fontSize={12}
                            />
                            <YAxis
                                stroke="#6b7280"
                                fontSize={12}
                                domain={[0, 100]}
                                tickFormatter={(value) => `${value}%`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                                formatter={(value, name) => [`${value}%`, name === 'currentYear' ? 'This Year' : name === 'lastYear' ? 'Last Year' : 'Target']}
                            />
                            <Legend />
                            <Bar
                                dataKey="currentYear"
                                fill="#10b981"
                                radius={[4, 4, 0, 0]}
                                name="This Year"
                            />
                            <Bar
                                dataKey="lastYear"
                                fill="#94a3b8"
                                radius={[4, 4, 0, 0]}
                                name="Last Year"
                            />
                            <Bar
                                dataKey="target"
                                fill="#f59e0b"
                                radius={[4, 4, 0, 0]}
                                name="Target"
                            />
                        </RechartsBarChart>
                    </ResponsiveContainer>

                    {/* Crop Performance Insights */}
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-700">
                            🌾 <strong>Rice is performing excellent!</strong> You've exceeded last year's yield by 4%.
                            Consider similar practices for corn to improve its performance.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Expense Breakdown Pie Chart */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Expense Breakdown</h2>
                        <PieChart className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex flex-col lg:flex-row items-center">
                        <ResponsiveContainer width="100%" height={200}>
                            <RechartsPieChart>
                                <Pie
                                    data={dashboardData.expenseBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {dashboardData.expenseBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}
                                    formatter={(value, name, props) => [`${value}%`, `₹${props.payload.amount.toLocaleString()}`]}
                                />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 lg:mt-0 lg:ml-6 space-y-2">
                            {dashboardData.expenseBreakdown.map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                        <p className="text-xs text-gray-500">₹{item.amount.toLocaleString()} ({item.value}%)</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Expense Insights */}
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-700">
                            💡 <strong>Seeds account for 35% of expenses.</strong> Consider bulk purchasing during off-season for better rates.
                        </p>
                    </div>
                </div>

                {/* Inventory Trends */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Inventory Trends</h2>
                        <Activity className="h-5 w-5 text-gray-400" />
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={dashboardData.inventoryTrends}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="month"
                                stroke="#6b7280"
                                fontSize={12}
                            />
                            <YAxis
                                stroke="#6b7280"
                                fontSize={12}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                                formatter={(value, name) => [value, name === 'seeds' ? 'Seeds' : name === 'fertilizers' ? 'Fertilizers' : 'Machinery']}
                            />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="seeds"
                                stackId="1"
                                stroke="#10b981"
                                fill="#10b981"
                                fillOpacity={0.6}
                                name="Seeds"
                            />
                            <Area
                                type="monotone"
                                dataKey="fertilizers"
                                stackId="1"
                                stroke="#059669"
                                fill="#059669"
                                fillOpacity={0.6}
                                name="Fertilizers"
                            />
                            <Area
                                type="monotone"
                                dataKey="machinery"
                                stackId="1"
                                stroke="#3b82f6"
                                fill="#3b82f6"
                                fillOpacity={0.6}
                                name="Machinery"
                            />
                        </AreaChart>
                    </ResponsiveContainer>

                    {/* Inventory Insights */}
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-700">
                            📦 <strong>Fertilizer levels are declining.</strong> Stock up before the next planting season to avoid shortages.
                        </p>
                    </div>
                </div>
            </div>

            {/* Enhanced Farm Performance Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white performance-card cursor-pointer group">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Best Performing Crop</h3>
                            <p className="text-3xl font-bold mt-2">Rice 🌾</p>
                            <p className="text-green-100 text-sm">92% yield efficiency</p>
                            <div className="mt-3 flex items-center text-sm">
                                <ArrowUp className="h-4 w-4 mr-1" />
                                <span>+4% vs last year</span>
                            </div>
                        </div>
                        <div className="text-green-200 group-hover:text-white transition-colors">
                            <Sprout className="h-12 w-12" />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white performance-card cursor-pointer group">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Monthly Profit</h3>
                            <p className="text-3xl font-bold mt-2">₹18,000</p>
                            <p className="text-blue-100 text-sm">Best month this year</p>
                            <div className="mt-3 flex items-center text-sm">
                                <ArrowUp className="h-4 w-4 mr-1" />
                                <span>+12% from last month</span>
                            </div>
                        </div>
                        <div className="text-blue-200 group-hover:text-white transition-colors">
                            <TrendingUp className="h-12 w-12" />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white performance-card cursor-pointer group">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Farm Efficiency</h3>
                            <p className="text-3xl font-bold mt-2">87%</p>
                            <p className="text-purple-100 text-sm">Above industry average</p>
                            <div className="mt-3 flex items-center text-sm">
                                <Target className="h-4 w-4 mr-1" />
                                <span>Excellent performance</span>
                            </div>
                        </div>
                        <div className="text-purple-200 group-hover:text-white transition-colors">
                            <Activity className="h-12 w-12" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Analytics Summary */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">📊 Quick Farm Analytics</h2>
                    <p className="text-lg opacity-90 mb-4">Your farming operation at a glance</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold">85%</div>
                            <div className="text-sm opacity-80">Crop Health</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">31%</div>
                            <div className="text-sm opacity-80">Profit Margin</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">12</div>
                            <div className="text-sm opacity-80">Active Fields</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">₹45K</div>
                            <div className="text-sm opacity-80">Savings</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;