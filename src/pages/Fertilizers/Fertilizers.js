import React, { useState } from 'react';
import {
    Leaf,
    Search,
    Filter,
    Plus,
    ShoppingCart,
    Star,
    Package,
    DollarSign,
    TrendingUp,
    Eye,
    Edit,
    Trash2
} from 'lucide-react';

const Fertilizers = () => {
    const [activeTab, setActiveTab] = useState('browse'); // browse, inventory
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterBrand, setFilterBrand] = useState('all');
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedFertilizer, setSelectedFertilizer] = useState(null);

    const [availableFertilizers] = useState([
        {
            id: 1,
            name: 'NPK 10-26-26',
            brand: 'IFFCO',
            type: 'NPK',
            composition: 'N:10%, P:26%, K:26%',
            price: 950,
            unit: 'per 50kg bag',
            rating: 4.7,
            inStock: true,
            description: 'Balanced NPK fertilizer ideal for all crops during flowering and fruiting stage.',
            benefits: ['Improves flowering', 'Increases fruit size', 'Enhances root development'],
            application: 'Apply 2-3 bags per acre during flowering stage',
            crops: ['Wheat', 'Rice', 'Cotton', 'Sugarcane'],
            image: "https://agribegri.com/productimage/4fadf41854d0d5e2b94bf129ed543899-03-22-21-13-22-54.webp.JPG",
        },
        {
            id: 2,
            name: 'Urea 46% N',
            brand: 'Chambal',
            type: 'Nitrogen',
            composition: 'N:46%',
            price: 720,
            unit: 'per 45kg bag',
            rating: 4.5,
            inStock: true,
            description: 'High nitrogen content fertilizer for vegetative growth.',
            benefits: ['Promotes green growth', 'Increases protein content', 'Enhances leaf development'],
            application: 'Apply 1-2 bags per acre in split doses',
            crops: ['Wheat', 'Rice', 'Maize', 'Sugarcane'],
            image: 'https://5.imimg.com/data5/SELLER/Default/2022/8/AH/AT/TA/158700350/urea-46-nitrogen-fertilizer-500x500.png.jpg'
        },
        {
            id: 3,
            name: 'Single Super Phosphate',
            brand: 'Coromandel',
            type: 'Phosphorus',
            composition: 'P2O5:16%, S:11%',
            price: 850,
            unit: 'per 50kg bag',
            rating: 4.6,
            inStock: true,
            description: 'Phosphorus fertilizer with added sulphur for root development.',
            benefits: ['Strong root system', 'Better flowering', 'Improves seed formation'],
            application: 'Apply at the time of sowing',
            crops: ['Groundnut', 'Mustard', 'Pulses', 'Cotton'],
            image: 'ssp.jpg'
        },
        {
            id: 4,
            name: 'Potash (MOP)',
            brand: 'IPL',
            type: 'Potassium',
            composition: 'K2O:60%',
            price: 1200,
            unit: 'per 50kg bag',
            rating: 4.4,
            inStock: false,
            description: 'Muriate of Potash for improved fruit quality and disease resistance.',
            benefits: ['Better fruit quality', 'Disease resistance', 'Improved shelf life'],
            application: 'Apply during fruit development stage',
            crops: ['Fruits', 'Vegetables', 'Potato', 'Tomato'],
            image: 'mop.jpg'
        },
        {
            id: 5,
            name: 'Organic Compost',
            brand: 'GreenGold',
            type: 'Organic',
            composition: 'NPK:3-1-2, Organic Matter:25%',
            price: 400,
            unit: 'per 40kg bag',
            rating: 4.8,
            inStock: true,
            description: 'Premium organic compost for soil health improvement.',
            benefits: ['Improves soil structure', 'Increases water retention', 'Enhances microbial activity'],
            application: 'Apply 5-10 bags per acre before sowing',
            crops: ['All crops', 'Vegetables', 'Fruits', 'Flowers'],
            image: 'compost.jpg'
        },
        {
            id: 6,
            name: 'Bio NPK',
            brand: 'BioTech',
            type: 'Bio-fertilizer',
            composition: 'Living microorganisms',
            price: 150,
            unit: 'per 1kg packet',
            rating: 4.3,
            inStock: true,
            description: 'Microbial fertilizer for nitrogen fixation and phosphorus solubilization.',
            benefits: ['Natural nutrient supply', 'Soil health improvement', 'Eco-friendly'],
            application: 'Mix with seeds before sowing or apply to soil',
            crops: ['Legumes', 'Cereals', 'Vegetables'],
            image: 'bionpk.jpg'
        }
    ]);

    const [ownedFertilizers, setOwnedFertilizers] = useState([
        {
            id: 101,
            name: 'NPK 10-26-26',
            brand: 'IFFCO',
            type: 'NPK',
            quantity: 15,
            unit: 'bags',
            purchaseDate: '2024-01-10',
            expiryDate: '2025-01-10',
            pricePerUnit: 950,
            totalValue: 14250,
            status: 'in_stock',
            minThreshold: 5
        },
        {
            id: 102,
            name: 'Urea 46% N',
            brand: 'Chambal',
            type: 'Nitrogen',
            quantity: 8,
            unit: 'bags',
            purchaseDate: '2024-01-05',
            expiryDate: '2025-01-05',
            pricePerUnit: 720,
            totalValue: 5760,
            status: 'in_stock',
            minThreshold: 10
        },
        {
            id: 103,
            name: 'Organic Compost',
            brand: 'GreenGold',
            type: 'Organic',
            quantity: 3,
            unit: 'bags',
            purchaseDate: '2024-01-08',
            expiryDate: '2026-01-08',
            pricePerUnit: 400,
            totalValue: 1200,
            status: 'low_stock',
            minThreshold: 5
        }
    ]);

    const [newFertilizer, setNewFertilizer] = useState({
        name: '',
        brand: '',
        type: '',
        quantity: '',
        unit: 'bags',
        purchaseDate: '',
        expiryDate: '',
        pricePerUnit: '',
        minThreshold: ''
    });

    const fertilizerTypes = ['all', 'NPK', 'Nitrogen', 'Phosphorus', 'Potassium', 'Organic', 'Bio-fertilizer'];
    const brands = ['all', 'IFFCO', 'Chambal', 'Coromandel', 'IPL', 'GreenGold', 'BioTech'];
    const units = ['bags', 'packets', 'kg', 'tons'];

    const filteredFertilizers = availableFertilizers.filter(fertilizer => {
        const matchesSearch = fertilizer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fertilizer.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || fertilizer.type === filterType;
        const matchesBrand = filterBrand === 'all' || fertilizer.brand === filterBrand;

        return matchesSearch && matchesType && matchesBrand;
    });

    const handleBuyFertilizer = (fertilizer, quantity = 1) => {
        const totalCost = fertilizer.price * quantity;
        alert(`Order placed for ${quantity} ${fertilizer.unit} of ${fertilizer.name}. Total cost: ₹${totalCost.toLocaleString()}`);
    };

    const handleAddToInventory = (e) => {
        e.preventDefault();
        const id = Date.now();
        const totalValue = parseFloat(newFertilizer.pricePerUnit) * parseInt(newFertilizer.quantity);
        const status = parseInt(newFertilizer.quantity) <= parseInt(newFertilizer.minThreshold) ? 'low_stock' : 'in_stock';

        setOwnedFertilizers([...ownedFertilizers, {
            ...newFertilizer,
            id,
            quantity: parseInt(newFertilizer.quantity),
            pricePerUnit: parseFloat(newFertilizer.pricePerUnit),
            totalValue,
            status
        }]);

        setNewFertilizer({
            name: '',
            brand: '',
            type: '',
            quantity: '',
            unit: 'bags',
            purchaseDate: '',
            expiryDate: '',
            pricePerUnit: '',
            minThreshold: ''
        });

        setShowAddModal(false);
    };

    const handleDeleteFertilizer = (id) => {
        if (window.confirm('Are you sure you want to remove this fertilizer from inventory?')) {
            setOwnedFertilizers(ownedFertilizers.filter(f => f.id !== id));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'in_stock':
                return 'bg-green-100 text-green-800';
            case 'low_stock':
                return 'bg-yellow-100 text-yellow-800';
            case 'out_of_stock':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const totalInventoryValue = ownedFertilizers.reduce((sum, f) => sum + f.totalValue, 0);
    const lowStockCount = ownedFertilizers.filter(f => f.status === 'low_stock').length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* Modern Hero Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative px-4 py-8 sm:px-6 sm:py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-3">
                                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                        <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                                            Fertilizers
                                        </h1>
                                        <p className="text-green-100 text-sm sm:text-lg font-medium">Premium Quality Solutions</p>
                                    </div>
                                </div>
                                <p className="text-white/90 text-sm sm:text-lg max-w-2xl leading-relaxed">
                                    Discover high-quality fertilizers to boost your crop yield and manage your inventory with intelligent tracking.
                                </p>
                            </div>

                            {activeTab === 'inventory' && (
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="group bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 border border-white/20 text-sm sm:text-base"
                                >
                                    <Plus className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-90 transition-transform duration-300" />
                                    <span className="font-medium whitespace-nowrap">Add to Inventory</span>
                                </button>
                            )}
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-6 border border-white/20 text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                    <Package className="h-5 w-5 sm:h-8 sm:w-8 text-green-200" />
                                    <div>
                                        <p className="text-white/70 text-[10px] sm:text-sm font-medium uppercase tracking-wider">Products</p>
                                        <p className="text-lg sm:text-2xl font-bold text-white">{filteredFertilizers.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-6 border border-white/20 text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                    <Star className="h-5 w-5 sm:h-8 sm:w-8 text-yellow-300" />
                                    <div>
                                        <p className="text-white/70 text-[10px] sm:text-sm font-medium uppercase tracking-wider">Rating</p>
                                        <p className="text-lg sm:text-2xl font-bold text-white">4.6★</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-6 border border-white/20 text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                    <ShoppingCart className="h-5 w-5 sm:h-8 sm:w-8 text-blue-300" />
                                    <div>
                                        <p className="text-white/70 text-[10px] sm:text-sm font-medium uppercase tracking-wider">Stock</p>
                                        <p className="text-lg sm:text-2xl font-bold text-white">{filteredFertilizers.filter(f => f.inStock).length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                {/* Modern Tabs */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-2">
                    <nav className="flex space-x-2">
                        <button
                            onClick={() => setActiveTab('browse')}
                            className={`flex-1 py-3 px-6 font-medium text-sm rounded-xl transition-all duration-300 ${activeTab === 'browse'
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-105'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <ShoppingCart className="h-4 w-4" />
                                <span>Browse & Buy</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('inventory')}
                            className={`flex-1 py-3 px-6 font-medium text-sm rounded-xl transition-all duration-300 ${activeTab === 'inventory'
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-105'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <Package className="h-4 w-4" />
                                <span>My Inventory</span>
                            </div>
                        </button>
                    </nav>
                </div>

                {/* Browse & Buy Tab */}
                {activeTab === 'browse' && (
                    <div className="space-y-8">
                        {/* Modern Filters */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                            <div className="flex flex-col space-y-6">
                                {/* Search Bar */}
                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-green-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search fertilizers by name or brand..."
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:ring-0 focus:border-green-500 focus:bg-white transition-all duration-300 placeholder-gray-400"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                {/* Filter Controls */}
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
                                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                        <div className="flex flex-col space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Fertilizer Type</label>
                                            <select
                                                className="px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:ring-0 focus:border-green-500 focus:bg-white transition-all duration-300"
                                                value={filterType}
                                                onChange={(e) => setFilterType(e.target.value)}
                                            >
                                                {fertilizerTypes.map(type => (
                                                    <option key={type} value={type}>
                                                        {type === 'all' ? 'All Types' : type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex flex-col space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Brand</label>
                                            <select
                                                className="px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:ring-0 focus:border-green-500 focus:bg-white transition-all duration-300"
                                                value={filterBrand}
                                                onChange={(e) => setFilterBrand(e.target.value)}
                                            >
                                                {brands.map(brand => (
                                                    <option key={brand} value={brand}>
                                                        {brand === 'all' ? 'All Brands' : brand}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Quick Filter Chips */}
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-sm font-medium text-gray-700">Quick filters:</span>
                                        {['NPK', 'Organic', 'Bio-fertilizer'].map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setFilterType(type)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${filterType === type
                                                    ? 'bg-green-500 text-white shadow-lg'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Results Count */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-600">
                                        Showing <span className="font-semibold text-green-600">{filteredFertilizers.length}</span> fertilizers
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <Filter className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-500">
                                            {(filterType !== 'all' || filterBrand !== 'all' || searchTerm) && 'Filters active'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fertilizers Grid - Similar to Machinery Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredFertilizers.map((fertilizer) => (
                                <div key={fertilizer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center">
                                            <Leaf className="h-16 w-16 text-white/90" />
                                        </div>
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${fertilizer.inStock
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {fertilizer.inStock ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </div>
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded-full">
                                                {fertilizer.type}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{fertilizer.name}</h3>
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                                <span className="text-sm text-gray-600">{fertilizer.rating}</span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-2">{fertilizer.composition}</p>

                                        <div className="flex items-center mb-2">
                                            <Package className="h-4 w-4 text-gray-400 mr-1" />
                                            <span className="text-sm text-gray-600">{fertilizer.brand}</span>
                                        </div>

                                        <div className="flex items-center mb-3">
                                            <Leaf className="h-4 w-4 text-green-400 mr-1" />
                                            <span className="text-sm text-gray-600">Suitable for {fertilizer.crops.length} crops</span>
                                        </div>

                                        {/* Benefits Tags */}
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {fertilizer.benefits.slice(0, 2).map((benefit, index) => (
                                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                    {benefit}
                                                </span>
                                            ))}
                                            {fertilizer.benefits.length > 2 && (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                    +{fertilizer.benefits.length - 2} more
                                                </span>
                                            )}
                                        </div>

                                        <div className="border-t pt-3">
                                            <div className="flex justify-between items-center mb-3">
                                                <div>
                                                    <p className="text-lg font-bold text-green-600">₹{fertilizer.price.toLocaleString()}</p>
                                                    <p className="text-xs text-gray-500">{fertilizer.unit}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600">Rating: {fertilizer.rating}/5</p>
                                                    <p className="text-xs text-gray-500">{fertilizer.type} fertilizer</p>
                                                </div>
                                            </div>

                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedFertilizer(fertilizer);
                                                        setShowDetailsModal(true);
                                                    }}
                                                    className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                >
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    Details
                                                </button>
                                                {fertilizer.inStock && (
                                                    <button
                                                        onClick={() => handleBuyFertilizer(fertilizer)}
                                                        className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 flex items-center justify-center transition-colors"
                                                    >
                                                        <ShoppingCart className="h-4 w-4 mr-1" />
                                                        Buy
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredFertilizers.length === 0 && (
                            <div className="text-center py-12">
                                <Leaf className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No fertilizers found</h3>
                                <p className="mt-1 text-sm text-gray-500">Try adjusting your search filters.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Modern Inventory Tab */}
                {activeTab === 'inventory' && (
                    <div className="space-y-8">
                        {/* Enhanced Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full"></div>
                                <div className="relative">
                                    <div className="flex items-center justify-between mb-4">
                                        <Package className="h-10 w-10 text-white/90" />
                                        <span className="text-3xl font-bold">{ownedFertilizers.length}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-1">Total Items</h3>
                                    <p className="text-green-100 text-sm">In your inventory</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full"></div>
                                <div className="relative">
                                    <div className="flex items-center justify-between mb-4">
                                        <DollarSign className="h-10 w-10 text-white/90" />
                                        <span className="text-3xl font-bold">₹{(totalInventoryValue / 1000).toFixed(0)}K</span>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-1">Total Value</h3>
                                    <p className="text-blue-100 text-sm">₹{totalInventoryValue.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full"></div>
                                <div className="relative">
                                    <div className="flex items-center justify-between mb-4">
                                        <TrendingUp className="h-10 w-10 text-white/90" />
                                        <span className="text-3xl font-bold">{lowStockCount}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-1">Low Stock Alert</h3>
                                    <p className="text-amber-100 text-sm">Items need restocking</p>
                                </div>
                            </div>
                        </div>

                        {/* Modern Inventory Cards */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900">Inventory Items</h3>
                                <div className="text-sm text-gray-500">
                                    {ownedFertilizers.length} items total
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {ownedFertilizers.map((fertilizer) => (
                                    <div key={fertilizer.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h4 className="text-lg font-bold text-gray-900 mb-1">{fertilizer.name}</h4>
                                                <p className="text-sm text-gray-600 mb-2">{fertilizer.brand}</p>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${fertilizer.type === 'NPK' ? 'bg-blue-100 text-blue-800' :
                                                    fertilizer.type === 'Organic' ? 'bg-green-100 text-green-800' :
                                                        fertilizer.type === 'Nitrogen' ? 'bg-purple-100 text-purple-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {fertilizer.type}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(fertilizer.status)}`}>
                                                    {fertilizer.status === 'in_stock' ? '✓ In Stock' : '⚠ Low Stock'}
                                                </span>
                                                <button
                                                    onClick={() => handleDeleteFertilizer(fertilizer.id)}
                                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Remove from inventory"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="bg-gray-50 rounded-xl p-3">
                                                <p className="text-xs text-gray-500 mb-1">Quantity</p>
                                                <p className="text-lg font-bold text-gray-900">{fertilizer.quantity} {fertilizer.unit}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-3">
                                                <p className="text-xs text-gray-500 mb-1">Total Value</p>
                                                <p className="text-lg font-bold text-green-600">₹{fertilizer.totalValue.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <div>
                                                <span className="text-gray-500">Purchase:</span>
                                                <span className="ml-1 font-medium">{new Date(fertilizer.purchaseDate).toLocaleDateString()}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Expires:</span>
                                                <span className="ml-1 font-medium">{new Date(fertilizer.expiryDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        {fertilizer.quantity <= fertilizer.minThreshold && (
                                            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                                                <div className="flex items-center space-x-2">
                                                    <TrendingUp className="h-4 w-4 text-amber-600" />
                                                    <span className="text-sm font-medium text-amber-800">
                                                        Stock below minimum threshold ({fertilizer.minThreshold} {fertilizer.unit})
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {ownedFertilizers.length === 0 && (
                                <div className="text-center py-12">
                                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No items in inventory</h3>
                                    <p className="text-gray-500 mb-4">Start by adding fertilizers to your inventory</p>
                                    <button
                                        onClick={() => setShowAddModal(true)}
                                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                                    >
                                        Add First Item
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Enhanced Fertilizer Details Modal */}
                {showDetailsModal && selectedFertilizer && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
                        <div className="relative bg-white/95 backdrop-blur-sm border border-white/20 w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden transform transition-all duration-500 scale-100">
                            {/* Modal Header */}
                            <div className="relative h-64 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 overflow-hidden">
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Leaf className="h-24 w-24 text-white/90" />
                                </div>
                                <button
                                    onClick={() => {
                                        setShowDetailsModal(false);
                                        setSelectedFertilizer(null);
                                    }}
                                    className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                >
                                    ✕
                                </button>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-3xl font-bold mb-2">{selectedFertilizer.name}</h3>
                                    <div className="flex items-center space-x-4">
                                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                                            {selectedFertilizer.brand}
                                        </span>
                                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                                            {selectedFertilizer.type}
                                        </span>
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-4 w-4 text-yellow-300 fill-current" />
                                            <span className="text-sm">{selectedFertilizer.rating}/5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 space-y-8">
                                {/* Product Information Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                                                <Package className="h-5 w-5 text-green-600 mr-2" />
                                                Product Information
                                            </h4>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Brand:</span>
                                                    <span className="font-semibold">{selectedFertilizer.brand}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Type:</span>
                                                    <span className="font-semibold">{selectedFertilizer.type}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Composition:</span>
                                                    <span className="font-semibold">{selectedFertilizer.composition}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Price:</span>
                                                    <span className="font-bold text-green-600">₹{selectedFertilizer.price.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Unit:</span>
                                                    <span className="font-semibold">{selectedFertilizer.unit}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                                                <Leaf className="h-5 w-5 text-blue-600 mr-2" />
                                                Application Guidelines
                                            </h4>
                                            <div className="space-y-3 text-sm">
                                                <div>
                                                    <span className="text-gray-600 block mb-1">Application Method:</span>
                                                    <span className="font-medium">{selectedFertilizer.application}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600 block mb-1">Suitable Crops:</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedFertilizer.crops.map((crop, index) => (
                                                            <span key={index} className="px-2 py-1 bg-white rounded-lg text-xs font-medium">
                                                                {crop}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6">
                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                                                <TrendingUp className="h-5 w-5 text-amber-600 mr-2" />
                                                Description
                                            </h4>
                                            <p className="text-gray-700 leading-relaxed">{selectedFertilizer.description}</p>
                                        </div>

                                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                                                <Star className="h-5 w-5 text-purple-600 mr-2" />
                                                Key Benefits
                                            </h4>
                                            <ul className="space-y-2">
                                                {selectedFertilizer.benefits.map((benefit, index) => (
                                                    <li key={index} className="flex items-start space-x-2 text-sm">
                                                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                                                        <span className="text-gray-700">{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Purchase Section */}
                                {selectedFertilizer.inStock && (
                                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
                                        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                                            <div>
                                                <h4 className="text-lg font-bold mb-1">Ready to Purchase?</h4>
                                                <p className="text-green-100">Select quantity and place your order</p>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2 bg-white/20 rounded-xl px-4 py-2">
                                                    <label className="text-sm font-medium">Qty:</label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        defaultValue="1"
                                                        className="w-16 bg-transparent text-center font-bold text-white placeholder-white/70 border-none focus:ring-0"
                                                        id="quantity"
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const quantity = parseInt(document.getElementById('quantity').value);
                                                        handleBuyFertilizer(selectedFertilizer, quantity);
                                                        setShowDetailsModal(false);
                                                    }}
                                                    className="bg-white text-green-600 px-6 py-3 rounded-xl hover:bg-gray-50 font-semibold flex items-center space-x-2 transition-all duration-300 hover:scale-105"
                                                >
                                                    <ShoppingCart className="h-5 w-5" />
                                                    <span>Buy Now</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Enhanced Add to Inventory Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
                        <div className="relative bg-white/95 backdrop-blur-sm border border-white/20 w-full max-w-3xl shadow-2xl rounded-3xl overflow-hidden">
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-white/20 rounded-xl">
                                            <Plus className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">Add to Inventory</h3>
                                            <p className="text-green-100">Track your fertilizer stock</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowAddModal(false)}
                                        className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8">
                                <form onSubmit={handleAddToInventory} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Fertilizer Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:ring-0 focus:border-green-500 focus:bg-white transition-all duration-300"
                                                value={newFertilizer.name}
                                                onChange={(e) => setNewFertilizer({ ...newFertilizer, name: e.target.value })}
                                                placeholder="Enter fertilizer name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Brand</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:ring-0 focus:border-green-500 focus:bg-white transition-all duration-300"
                                                value={newFertilizer.brand}
                                                onChange={(e) => setNewFertilizer({ ...newFertilizer, brand: e.target.value })}
                                                placeholder="Enter brand name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Type</label>
                                            <select
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:ring-0 focus:border-green-500 focus:bg-white transition-all duration-300"
                                                value={newFertilizer.type}
                                                onChange={(e) => setNewFertilizer({ ...newFertilizer, type: e.target.value })}
                                            >
                                                <option value="">Select fertilizer type</option>
                                                {fertilizerTypes.slice(1).map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Quantity</label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:ring-0 focus:border-green-500 focus:bg-white transition-all duration-300"
                                                value={newFertilizer.quantity}
                                                onChange={(e) => setNewFertilizer({ ...newFertilizer, quantity: e.target.value })}
                                                placeholder="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Unit</label>
                                            <select
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:ring-0 focus:border-green-500 focus:bg-white transition-all duration-300"
                                                value={newFertilizer.unit}
                                                onChange={(e) => setNewFertilizer({ ...newFertilizer, unit: e.target.value })}
                                            >
                                                {units.map(unit => (
                                                    <option key={unit} value={unit}>{unit}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Price per Unit (₹)</label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                step="0.01"
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:ring-0 focus:border-green-500 focus:bg-white transition-all duration-300"
                                                value={newFertilizer.pricePerUnit}
                                                onChange={(e) => setNewFertilizer({ ...newFertilizer, pricePerUnit: e.target.value })}
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Purchase Date</label>
                                            <input
                                                type="date"
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:ring-0 focus:border-green-500 focus:bg-white transition-all duration-300"
                                                value={newFertilizer.purchaseDate}
                                                onChange={(e) => setNewFertilizer({ ...newFertilizer, purchaseDate: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Expiry Date</label>
                                            <input
                                                type="date"
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:ring-0 focus:border-green-500 focus:bg-white transition-all duration-300"
                                                value={newFertilizer.expiryDate}
                                                onChange={(e) => setNewFertilizer({ ...newFertilizer, expiryDate: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700">Minimum Stock Threshold</label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:ring-0 focus:border-green-500 focus:bg-white transition-all duration-300"
                                                value={newFertilizer.minThreshold}
                                                onChange={(e) => setNewFertilizer({ ...newFertilizer, minThreshold: e.target.value })}
                                                placeholder="Minimum quantity before alert"
                                            />
                                        </div>
                                    </div>

                                    {/* Total Value Preview */}
                                    {newFertilizer.quantity && newFertilizer.pricePerUnit && (
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-700 font-medium">Total Value:</span>
                                                <span className="text-2xl font-bold text-blue-600">
                                                    ₹{(parseInt(newFertilizer.quantity || 0) * parseFloat(newFertilizer.pricePerUnit || 0)).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                                        <button
                                            type="button"
                                            onClick={() => setShowAddModal(false)}
                                            className="px-6 py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
                                        >
                                            Add to Inventory
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Fertilizers;