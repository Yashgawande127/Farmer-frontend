import React, { useState, useEffect } from 'react';
import {
    Truck,
    Search,
    Filter,
    Calendar,
    DollarSign,
    MapPin,
    Star,
    Phone,
    Eye,
    ShoppingCart,
    Clock,
    CheckCircle,
    XCircle,
    Plus,
    Edit,
    Trash2,
    Package,
    TrendingUp,
    TrendingDown,
    Wrench,
    Settings,
    AlertTriangle,
    Award,
    Activity,
    BarChart3,
    RefreshCw,
    Target,
    Zap,
    Shield
} from 'lucide-react';

// Embedded machinery images as data URIs
const machineryImages = {
    tractor: "https://www.mahindratractor.com/sites/default/files/styles/homepage_pslider_472x390_/public/2023-10/sp_plus.webp?itok=KtsUbJib",
    harvester: "https://www.mahindratractor.com/sites/default/files/styles/1532x912/public/2025-03/Blog-6-How%20to%20choose%20the%20right%20combine%20harvester%20machine%20for%20your%20farm-Detail_0.webp?itok=U1iodxN8",
    seeder: "https://m.media-amazon.com/images/I/411mkRAwyYL.jpg",
    tiller: "https://raidco.in/agro/wp-content/uploads/2023/10/power-tiller.png",
    cultivator: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_yz26iOcyC_Y4wFaBNfHTOSLPFAQWnqofwA&s",
    transplanter: "https://image.made-in-china.com/365f3j00CTOBrMFtSybn/4-6-8-Rows-Planter-Planting-Ride-Type-Rice-Transplanter.webp",
    default: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmM2Y0ZjYiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjYwIiBmaWxsPSIjNjM2NmYxIiBvcGFjaXR5PSIwLjIiLz4KICA8cGF0aCBkPSJNNzAgMTAwYzAtMTYuNTY5IDEzLjQzMS0zMCAzMC0zMHMzMCAxMy40MzEgMzAgMzAtMTMuNDMxIDMwLTMwIDMwLTMwLTEzLjQzMS0zMC0zMHoiIGZpbGw9IiM2MzY2ZjEiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjE3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiNzI4MCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjUwMCI+TUFDSSU8L3RleHQ+Cjwvc3ZnPg=="
};

const Machinery = () => {
    const [activeTab, setActiveTab] = useState('browse'); // browse, owned, rented
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterPrice, setFilterPrice] = useState('all');
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Stats data
    const [stats, setStats] = useState({
        totalMachinery: 8,
        totalValue: 2450000,
        activeRentals: 2,
        maintenanceDue: 1,
        averageUtilization: 78,
        monthlyRevenue: 45000
    });

    const [availableMachinery] = useState([
        {
            id: 1,
            name: 'John Deere 5075E Tractor',
            type: 'Tractor',
            horsepower: '75 HP',
            price: 150000,
            rentPrice: 2000,
            rentPeriod: 'per day',
            location: 'Punjab, India',
            owner: 'Singh Farm Equipment',
            rating: 4.8,
            availability: 'available',
            features: ['Power Steering', '4WD', 'Heavy Duty', 'Fuel Efficient'],
            description: 'Reliable and powerful tractor suitable for all farming operations.',
            contact: '+91-98765-43210',
            image: "https://www.deere.africa/assets/images/region-1//tractors/e-family-tractors/5075e-tractor/5075E_2_large_20903a1b4907c537e682b4ac3fc3047107350e53.JPG",
            condition: 'Excellent',
            yearManufactured: 2022,
            workingHours: 850,
            fuelType: 'Diesel',
            transmissionType: 'Manual'
        },
        {
            id: 2,
            name: 'Mahindra 265 DI Tractor',
            type: 'Tractor',
            horsepower: '39 HP',
            price: 85000,
            rentPrice: 1500,
            rentPeriod: 'per day',
            location: 'Haryana, India',
            owner: 'Agri Machinery Hub',
            rating: 4.5,
            availability: 'available',
            features: ['Fuel Efficient', 'Compact Design', 'Easy Maintenance'],
            description: 'Perfect for small to medium farms with excellent fuel efficiency.',
            contact: '+91-98765-43211',
            image: machineryImages.tractor,
            condition: 'Good',
            yearManufactured: 2021,
            workingHours: 1200,
            fuelType: 'Diesel',
            transmissionType: 'Manual'
        },
        {
            id: 3,
            name: 'Combined Harvester',
            type: 'Harvester',
            horsepower: '120 HP',
            price: 450000,
            rentPrice: 5000,
            rentPeriod: 'per day',
            location: 'Punjab, India',
            owner: 'Harvest Solutions',
            rating: 4.9,
            availability: 'rented',
            features: ['High Capacity', 'GPS Navigation', 'Auto Steering'],
            description: 'Advanced harvester with GPS and automated features.',
            contact: '+91-98765-43212',
            image: machineryImages.harvester,
            condition: 'Excellent',
            yearManufactured: 2023,
            workingHours: 450,
            fuelType: 'Diesel',
            transmissionType: 'Automatic'
        },
        {
            id: 4,
            name: 'Seed Drill Machine',
            type: 'Seeder',
            horsepower: 'N/A',
            price: 75000,
            rentPrice: 800,
            rentPeriod: 'per day',
            location: 'Uttar Pradesh, India',
            owner: 'Modern Agri Tools',
            rating: 4.6,
            availability: 'available',
            features: ['Precision Seeding', 'Multi-crop', 'Adjustable Depth'],
            description: 'Precision seed drill for accurate seed placement.',
            contact: '+91-98765-43213',
            image: machineryImages.seeder,
            condition: 'Good',
            yearManufactured: 2020,
            workingHours: 600,
            fuelType: 'N/A',
            transmissionType: 'N/A'
        },
        {
            id: 5,
            name: 'Rotary Tiller',
            type: 'Tiller',
            horsepower: 'N/A',
            price: 45000,
            rentPrice: 600,
            rentPeriod: 'per day',
            location: 'Maharashtra, India',
            owner: 'Farm Equipment Co.',
            rating: 4.4,
            availability: 'available',
            features: ['Heavy Duty Blades', 'Adjustable Width', 'Low Maintenance'],
            description: 'Efficient rotary tiller for soil preparation.',
            contact: '+91-98765-43214',
            image: machineryImages.tiller,
            condition: 'Good',
            yearManufactured: 2021,
            workingHours: 800,
            fuelType: 'N/A',
            transmissionType: 'N/A'
        },
        {
            id: 6,
            name: 'New Holland TC40 Tractor',
            type: 'Tractor',
            horsepower: '40 HP',
            price: 95000,
            rentPrice: 1800,
            rentPeriod: 'per day',
            location: 'Gujarat, India',
            owner: 'Agricultural Machinery Hub',
            rating: 4.7,
            availability: 'available',
            features: ['Hydraulic Steering', 'Dual Clutch', 'Compact Size', 'Low Fuel Consumption'],
            description: 'Compact and efficient tractor ideal for small farms and orchard work.',
            contact: '+91-98765-43215',
            image: "https://media.sandhills.com/img.axd?id=9050223786&wid=5001287082&rwl=False&p=&ext=&w=350&h=220&t=&lp=&c=True&wt=False&sz=Cover&rt=0&checksum=uxbtkNlbb2tE1kOJkLfZ%2FgRt47FVKf85atfeN3fTkyo%3D",
            condition: 'Excellent',
            yearManufactured: 2022,
            workingHours: 650,
            fuelType: 'Diesel',
            transmissionType: 'Manual'
        },
        {
            id: 7,
            name: 'Multi-Crop Thresher',
            type: 'Thresher',
            horsepower: '25 HP',
            price: 125000,
            rentPrice: 1200,
            rentPeriod: 'per day',
            location: 'Karnataka, India',
            owner: 'Harvest Tech Solutions',
            rating: 4.3,
            availability: 'available',
            features: ['Multi-Crop Support', 'High Efficiency', 'Easy Operation', 'Low Maintenance'],
            description: 'Versatile threshing machine suitable for wheat, rice, and other grain crops.',
            contact: '+91-98765-43216',
            image: "https://5.imimg.com/data5/SELLER/Default/2023/9/340906854/UM/JP/BQ/3889907/multi-crop-thresher.jpg",
            condition: 'Good',
            yearManufactured: 2021,
            workingHours: 950,
            fuelType: 'Diesel',
            transmissionType: 'Manual'
        },
        {
            id: 8,
            name: 'Sprayer Machine',
            type: 'Sprayer',
            horsepower: 'N/A',
            price: 35000,
            rentPrice: 500,
            rentPeriod: 'per day',
            location: 'Tamil Nadu, India',
            owner: 'Crop Protection Equipment',
            rating: 4.5,
            availability: 'available',
            features: ['Adjustable Nozzles', 'Large Tank Capacity', 'Even Distribution', 'Chemical Resistant'],
            description: 'Professional sprayer for pesticides, fertilizers, and other crop treatments.',
            contact: '+91-98765-43217',
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0peu7Dne49vWG2cpn_LDAleH3xfdktqnuqw&s",
            condition: 'Excellent',
            yearManufactured: 2023,
            workingHours: 320,
            fuelType: 'N/A',
            transmissionType: 'N/A'
        },
        {
            id: 9,
            name: 'Disc Harrow',
            type: 'Harrow',
            horsepower: 'N/A',
            price: 55000,
            rentPrice: 700,
            rentPeriod: 'per day',
            location: 'Rajasthan, India',
            owner: 'Field Preparation Tools',
            rating: 4.2,
            availability: 'available',
            features: ['Heavy Duty Discs', 'Adjustable Depth', 'Sturdy Frame', 'Quick Hitch'],
            description: 'Robust disc harrow for effective soil preparation and residue management.',
            contact: '+91-98765-43218',
            image: machineryImages.cultivator,
            condition: 'Good',
            yearManufactured: 2020,
            workingHours: 1100,
            fuelType: 'N/A',
            transmissionType: 'N/A'
        }
    ]);

    const [ownedMachinery] = useState([
        {
            id: 101,
            name: 'Massey Ferguson 241 DI',
            type: 'Tractor',
            purchaseDate: '2023-05-15',
            purchasePrice: 125000,
            currentValue: 115000,
            status: 'operational',
            maintenanceDate: '2024-01-10',
            nextService: '2024-07-10',
            image: machineryImages.tractor,
            workingHours: 1450,
            fuelEfficiency: '3.5 L/hr',
            condition: 'Good',
            yearManufactured: 2023
        },
        {
            id: 102,
            name: 'Cultivator',
            type: 'Cultivator',
            purchaseDate: '2023-08-20',
            purchasePrice: 35000,
            currentValue: 32000,
            status: 'operational',
            maintenanceDate: '2023-12-15',
            nextService: '2024-06-15',
            image: machineryImages.cultivator,
            workingHours: 850,
            fuelEfficiency: 'N/A',
            condition: 'Excellent',
            yearManufactured: 2023
        }
    ]);

    const [rentedMachinery] = useState([
        {
            id: 201,
            name: 'Paddy Transplanter',
            type: 'Transplanter',
            rentStartDate: '2024-01-10',
            rentEndDate: '2024-01-15',
            dailyRent: 3000,
            totalCost: 15000,
            status: 'active',
            owner: 'Rice Tech Solutions',
            image: "https://image.made-in-china.com/365f3j00CTOBrMFtSybn/4-6-8-Rows-Planter-Planting-Ride-Type-Rice-Transplanter.webp",
            workingHours: 85,
            condition: 'Excellent'
        }
    ]);

    // Calculate stats
    useEffect(() => {
        const totalOwned = ownedMachinery.length;
        const totalRented = rentedMachinery.length;
        const totalValue = ownedMachinery.reduce((sum, machine) => sum + machine.currentValue, 0);
        const activeRentals = rentedMachinery.filter(machine => machine.status === 'active').length;
        const maintenanceDue = ownedMachinery.filter(machine =>
            new Date(machine.nextService) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        ).length;

        setStats({
            totalMachinery: totalOwned,
            totalValue,
            activeRentals,
            maintenanceDue,
            averageUtilization: 78,
            monthlyRevenue: 45000
        });
    }, [ownedMachinery, rentedMachinery]);

    const machineTypes = ['all', 'Tractor', 'Harvester', 'Seeder', 'Tiller', 'Cultivator', 'Transplanter', 'Thresher', 'Sprayer', 'Harrow'];
    const priceRanges = [
        { value: 'all', label: 'All Prices' },
        { value: '0-1000', label: '₹0 - ₹1,000/day' },
        { value: '1000-3000', label: '₹1,000 - ₹3,000/day' },
        { value: '3000-5000', label: '₹3,000 - ₹5,000/day' },
        { value: '5000+', label: '₹5,000+/day' }
    ];

    const filteredMachinery = availableMachinery.filter(machine => {
        const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            machine.type.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || machine.type === filterType;

        let matchesPrice = true;
        if (filterPrice !== 'all') {
            const [min, max] = filterPrice.split('-').map(p => parseInt(p) || Infinity);
            matchesPrice = machine.rentPrice >= min && (max === Infinity || machine.rentPrice <= max);
        }

        return matchesSearch && matchesType && matchesPrice;
    });

    const handleRentMachine = (machine) => {
        // Simulate rental process
        alert(`Rental request sent for ${machine.name}. Owner will contact you at ${machine.contact}`);
    };

    const handleBuyMachine = (machine) => {
        // Simulate purchase process
        alert(`Purchase inquiry sent for ${machine.name}. Total price: ₹${machine.price.toLocaleString()}`);
    };

    const getAvailabilityColor = (availability) => {
        switch (availability) {
            case 'available':
                return 'bg-green-100 text-green-800';
            case 'rented':
                return 'bg-red-100 text-red-800';
            case 'maintenance':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'operational':
                return 'bg-green-100 text-green-800';
            case 'maintenance':
                return 'bg-yellow-100 text-yellow-800';
            case 'repair':
                return 'bg-red-100 text-red-800';
            case 'active':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Premium Professional Header */}
            <div className="relative mb-8">
                <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

                    <div className="relative z-10">
                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                            <div className="xl:col-span-8">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 mb-4 sm:mb-0 sm:mr-4">
                                        <Truck className="h-8 w-8 text-blue-300" />
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                                Machinery Management
                                            </h1>
                                        </div>
                                        <p className="text-blue-100 mt-2 text-sm sm:text-base max-w-2xl">
                                            Browse, rent, buy, and manage your farming equipment with professional tools and tracking.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="text-center p-2">
                                            <p className="text-xl sm:text-2xl font-bold text-white">{stats.totalMachinery}</p>
                                            <p className="text-blue-200 text-[10px] sm:text-sm uppercase tracking-wider font-semibold">Total Fleet</p>
                                        </div>
                                        <div className="text-center p-2">
                                            <p className="text-xl sm:text-2xl font-bold text-white">₹{(stats.totalValue / 100000).toFixed(1)}L</p>
                                            <p className="text-blue-200 text-[10px] sm:text-sm uppercase tracking-wider font-semibold">Asset Value</p>
                                        </div>
                                        <div className="text-center p-2">
                                            <p className="text-xl sm:text-2xl font-bold text-white">{stats.activeRentals}</p>
                                            <p className="text-blue-200 text-[10px] sm:text-sm uppercase tracking-wider font-semibold">Active Rentals</p>
                                        </div>
                                        <div className="text-center p-2">
                                            <p className="text-xl sm:text-2xl font-bold text-white">{stats.maintenanceDue}</p>
                                            <p className="text-blue-200 text-[10px] sm:text-sm uppercase tracking-wider font-semibold">Alerts</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="xl:col-span-4 flex flex-col justify-center space-y-4">
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl flex items-center justify-center space-x-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                                >
                                    <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                                    <span className="font-semibold text-base sm:text-lg">Add Machinery</span>
                                </button>
                                <button
                                    onClick={() => setIsLoading(!isLoading)}
                                    className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-xl flex items-center justify-center space-x-3 transition-all duration-300 border border-white/20"
                                >
                                    <RefreshCw className={`h-4 w-4 sm:h-5 sm:w-5 ${isLoading ? 'animate-spin' : ''}`} />
                                    <span className="font-medium">Refresh Status</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Truck className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Machinery</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalMachinery}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Value</p>
                            <p className="text-2xl font-bold text-gray-900">₹{(stats.totalValue / 100000).toFixed(1)}L</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Calendar className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Active Rentals</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.activeRentals}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <AlertTriangle className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Maintenance Due</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.maintenanceDue}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <BarChart3 className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Utilization</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.averageUtilization}%</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">₹{(stats.monthlyRevenue / 1000).toFixed(0)}K</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('browse')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'browse'
                            ? 'border-green-500 text-green-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Browse & Rent
                    </button>
                    <button
                        onClick={() => setActiveTab('owned')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'owned'
                            ? 'border-green-500 text-green-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        My Machinery
                    </button>
                    <button
                        onClick={() => setActiveTab('rented')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'rented'
                            ? 'border-green-500 text-green-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Current Rentals
                    </button>
                </nav>
            </div>

            {/* Browse & Rent Tab */}
            {activeTab === 'browse' && (
                <div className="space-y-6">
                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input
                                        type="text"
                                        placeholder="Search machinery..."
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <select
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                >
                                    {machineTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type === 'all' ? 'All Types' : type}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    value={filterPrice}
                                    onChange={(e) => setFilterPrice(e.target.value)}
                                >
                                    {priceRanges.map(range => (
                                        <option key={range.value} value={range.value}>
                                            {range.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Machinery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMachinery.map((machine) => (
                            <div key={machine.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={machine.image}
                                        alt={machine.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = machineryImages.default;
                                        }}
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(machine.availability)}`}>
                                            {machine.availability}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded-full">
                                            {machine.type}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{machine.name}</h3>
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                            <span className="text-sm text-gray-600">{machine.rating}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-2">{machine.horsepower} • {machine.condition}</p>

                                    <div className="flex items-center mb-2">
                                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                                        <span className="text-sm text-gray-600">{machine.location}</span>
                                    </div>

                                    <div className="flex items-center mb-3">
                                        <Shield className="h-4 w-4 text-blue-400 mr-1" />
                                        <span className="text-sm text-gray-600">{machine.owner}</span>
                                    </div>

                                    {/* Features Tags */}
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {machine.features.slice(0, 2).map((feature, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                {feature}
                                            </span>
                                        ))}
                                        {machine.features.length > 2 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                +{machine.features.length - 2} more
                                            </span>
                                        )}
                                    </div>

                                    <div className="border-t pt-3">
                                        <div className="flex justify-between items-center mb-3">
                                            <div>
                                                <p className="text-lg font-bold text-green-600">₹{machine.rentPrice.toLocaleString()}</p>
                                                <p className="text-xs text-gray-500">{machine.rentPeriod}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Buy: ₹{(machine.price / 100000).toFixed(1)}L</p>
                                                <p className="text-xs text-gray-500">Year: {machine.yearManufactured}</p>
                                            </div>
                                        </div>

                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedMachine(machine);
                                                    setShowDetailsModal(true);
                                                }}
                                                className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-200 flex items-center justify-center transition-colors"
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                Details
                                            </button>
                                            {machine.availability === 'available' && (
                                                <>
                                                    <button
                                                        onClick={() => handleRentMachine(machine)}
                                                        className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 flex items-center justify-center transition-colors"
                                                    >
                                                        <Calendar className="h-4 w-4 mr-1" />
                                                        Rent
                                                    </button>
                                                    <button
                                                        onClick={() => handleBuyMachine(machine)}
                                                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center justify-center transition-colors"
                                                    >
                                                        <ShoppingCart className="h-4 w-4 mr-1" />
                                                        Buy
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredMachinery.length === 0 && (
                        <div className="text-center py-12">
                            <Truck className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No machinery found</h3>
                            <p className="mt-1 text-sm text-gray-500">Try adjusting your search filters.</p>
                        </div>
                    )}
                </div>
            )}

            {/* My Machinery Tab */}
            {activeTab === 'owned' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">My Machinery Fleet</h3>
                            <p className="text-sm text-gray-600">Manage and track your owned machinery</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Machinery
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Purchase Info
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Performance
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Value & Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Maintenance
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {ownedMachinery.map((machine) => (
                                        <tr key={machine.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-12 w-12">
                                                        <img
                                                            className="h-12 w-12 rounded-lg object-cover"
                                                            src={machine.image}
                                                            alt={machine.name}
                                                            onError={(e) => {
                                                                e.target.src = machineryImages.default;
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{machine.name}</div>
                                                        <div className="text-sm text-gray-500">{machine.type} • {machine.yearManufactured}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div>
                                                    <div>Purchased: {new Date(machine.purchaseDate).toLocaleDateString()}</div>
                                                    <div className="text-green-600 font-medium">₹{machine.purchasePrice.toLocaleString()}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div>
                                                    <div>Hours: {machine.workingHours.toLocaleString()}</div>
                                                    <div className="text-blue-600">{machine.fuelEfficiency}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">₹{machine.currentValue.toLocaleString()}</div>
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(machine.status)}`}>
                                                        {machine.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div>
                                                    <div>Last: {new Date(machine.maintenanceDate).toLocaleDateString()}</div>
                                                    <div className="text-orange-600">Next: {new Date(machine.nextService).toLocaleDateString()}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-900">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-green-600 hover:text-green-900">
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-yellow-600 hover:text-yellow-900">
                                                        <Wrench className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Current Rentals Tab */}
            {activeTab === 'rented' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Machinery
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rental Period
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cost
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Owner
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {rentedMachinery.map((machine) => (
                                    <tr key={machine.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Truck className="h-8 w-8 text-blue-500 mr-3" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{machine.name}</div>
                                                    <div className="text-sm text-gray-500">{machine.type}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div>
                                                <div>From: {new Date(machine.rentStartDate).toLocaleDateString()}</div>
                                                <div>To: {new Date(machine.rentEndDate).toLocaleDateString()}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div>
                                                <div>₹{machine.dailyRent}/day</div>
                                                <div>Total: ₹{machine.totalCost.toLocaleString()}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {machine.owner}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(machine.status)}`}>
                                                {machine.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Machine Details Modal */}
            {showDetailsModal && selectedMachine && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={() => setShowDetailsModal(false)}>
                    <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/5 xl:w-1/2 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">{selectedMachine.name}</h3>
                            <button
                                onClick={() => {
                                    setShowDetailsModal(false);
                                    setSelectedMachine(null);
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <XCircle className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Image and Basic Info */}
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="lg:w-1/2">
                                    <div className="relative h-64 rounded-lg overflow-hidden">
                                        <img
                                            src={selectedMachine.image}
                                            alt={selectedMachine.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = machineryImages.default;
                                            }}
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getAvailabilityColor(selectedMachine.availability)}`}>
                                                {selectedMachine.availability}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:w-1/2 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center mb-2">
                                                <Settings className="h-5 w-5 text-gray-600 mr-2" />
                                                <span className="font-medium text-gray-900">Type</span>
                                            </div>
                                            <p className="text-gray-700">{selectedMachine.type}</p>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center mb-2">
                                                <Zap className="h-5 w-5 text-gray-600 mr-2" />
                                                <span className="font-medium text-gray-900">Power</span>
                                            </div>
                                            <p className="text-gray-700">{selectedMachine.horsepower}</p>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center mb-2">
                                                <MapPin className="h-5 w-5 text-gray-600 mr-2" />
                                                <span className="font-medium text-gray-900">Location</span>
                                            </div>
                                            <p className="text-gray-700">{selectedMachine.location}</p>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center mb-2">
                                                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                                                <span className="font-medium text-gray-900">Rating</span>
                                            </div>
                                            <p className="text-gray-700">{selectedMachine.rating}/5</p>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <Shield className="h-5 w-5 text-blue-600 mr-2" />
                                            <span className="font-medium text-gray-900">Owner</span>
                                        </div>
                                        <p className="text-gray-700">{selectedMachine.owner}</p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            <Phone className="h-4 w-4 inline mr-1" />
                                            {selectedMachine.contact}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Specifications */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white border rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <Activity className="h-5 w-5 text-green-600 mr-2" />
                                        Technical Specifications
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Year:</span>
                                            <span className="font-medium">{selectedMachine.yearManufactured}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Condition:</span>
                                            <span className="font-medium">{selectedMachine.condition}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Working Hours:</span>
                                            <span className="font-medium">{selectedMachine.workingHours} hrs</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Fuel Type:</span>
                                            <span className="font-medium">{selectedMachine.fuelType}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Transmission:</span>
                                            <span className="font-medium">{selectedMachine.transmissionType}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                                        Pricing Information
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="bg-green-50 p-3 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-green-700 font-medium">Rental Price</span>
                                                <span className="text-green-700 font-bold text-lg">₹{selectedMachine.rentPrice.toLocaleString()}</span>
                                            </div>
                                            <p className="text-green-600 text-sm">{selectedMachine.rentPeriod}</p>
                                        </div>
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-blue-700 font-medium">Purchase Price</span>
                                                <span className="text-blue-700 font-bold text-lg">₹{selectedMachine.price.toLocaleString()}</span>
                                            </div>
                                            <p className="text-blue-600 text-sm">One-time payment</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                                <p className="text-gray-700">{selectedMachine.description}</p>
                            </div>

                            {/* Features */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                    <Award className="h-5 w-5 text-purple-600 mr-2" />
                                    Key Features
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {selectedMachine.features.map((feature, index) => (
                                        <div key={index} className="flex items-center bg-white border rounded-lg p-3">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {selectedMachine.availability === 'available' && (
                                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                                    <button
                                        onClick={() => {
                                            handleRentMachine(selectedMachine);
                                            setShowDetailsModal(false);
                                        }}
                                        className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 flex items-center justify-center transition-colors"
                                    >
                                        <Calendar className="h-5 w-5 mr-2" />
                                        Rent for ₹{selectedMachine.rentPrice.toLocaleString()}/{selectedMachine.rentPeriod}
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleBuyMachine(selectedMachine);
                                            setShowDetailsModal(false);
                                        }}
                                        className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 flex items-center justify-center transition-colors"
                                    >
                                        <ShoppingCart className="h-5 w-5 mr-2" />
                                        Buy for ₹{selectedMachine.price.toLocaleString()}
                                    </button>
                                </div>
                            )}

                            {selectedMachine.availability !== 'available' && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                                        <span className="text-red-800 font-medium">
                                            This machinery is currently {selectedMachine.availability} and not available for rent or purchase.
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Add Machinery Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={() => setShowAddModal(false)}>
                    <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Add New Machinery</h3>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <XCircle className="h-6 w-6" />
                            </button>
                        </div>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Machinery Name *
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                        placeholder="e.g., John Deere 5075E"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Type *
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                                        <option value="">Select Type</option>
                                        <option value="Tractor">Tractor</option>
                                        <option value="Harvester">Harvester</option>
                                        <option value="Seeder">Seeder</option>
                                        <option value="Tiller">Tiller</option>
                                        <option value="Cultivator">Cultivator</option>
                                        <option value="Transplanter">Transplanter</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Horsepower
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                        placeholder="e.g., 75 HP"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Year Manufactured
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                        placeholder="2023"
                                        min="1990"
                                        max={new Date().getFullYear()}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Purchase Price (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                        placeholder="150000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Value (₹)
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                        placeholder="140000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Purchase Date *
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Working Hours
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                        placeholder="1500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Condition
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                                        <option value="operational">Operational</option>
                                        <option value="maintenance">Under Maintenance</option>
                                        <option value="repair">Needs Repair</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    placeholder="Describe the machinery features and condition..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        alert('Machinery added successfully!');
                                        setShowAddModal(false);
                                    }}
                                >
                                    Add Machinery
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Machinery;