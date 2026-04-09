import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Package,
    DollarSign,
    Calendar,
    TrendingUp,
    TrendingDown,
    Eye,
    Leaf,
    ShoppingCart,
    Star,
    Clock,
    MapPin,
    Award,
    AlertTriangle
} from 'lucide-react';

// Embedded seed images as data URIs
const seedImages = {
    wheat: "https://m.media-amazon.com/images/I/714xCG6CxKL._UF1000,1000_QL80_.jpg",

    rice: "https://www.jiomart.com/images/product/original/rvyoiqlkcr/platone-pusa-basmati-paddy-1509-rice-seeds-for-sowing-farming-agriculture-1-kg-pack-of1-product-images-orvyoiqlkcr-p598232258-0-202302081805.jpg?im=Resize=(1000,1000)",

    corn: "https://5.imimg.com/data5/SELLER/Default/2023/6/316422137/HF/RU/IF/180777978/hybrid-maize-corn-seeds.webp",

    tomato: "https://5.imimg.com/data5/SELLER/Default/2024/7/433053149/XS/FW/WF/3045989/tomato-seeds-2-500x500.jpg",

    onion: "https://m.media-amazon.com/images/I/61228KaCedL._UF1000,1000_QL80_.jpg",

    sunflower: "https://ayoubs.ca/cdn/shop/articles/sunflower_seeds_4_520x500_47d01b32-82c4-4107-9bda-34ee1c9d611d_500x.png?v=1746184048",

    potato: "https://media.istockphoto.com/id/1160978185/photo/seed-potatoes.jpg?s=612x612&w=0&k=20&c=9qmyij2-9CWvzZ5Q0EpIqGvON3kcdiI5PzRVkLKKGGY=",

    carrot: "https://plantsguru.com/cdn/shop/files/Carrot_Seeds.jpg?v=1743570016",

    vegetable: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmMGZkZjQiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjYwIiBmaWxsPSIjMjJjNTVlIiBvcGFjaXR5PSIwLjIiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjMwIiBmaWxsPSIjMjJjNTVlIi8+CiAgPGVsbGlwc2UgY3g9IjEwMCIgY3k9IjkwIiByeD0iMTUiIHJ5PSIyNSIgZmlsbD0iIzE2YTM0YSIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMTZhMzRhIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNTAwIj5WRUdFVEFCTEUgU0VFRFM8L3RleHQ+Cjwvc3ZnPg==",

    fruit: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmZWY3ZmYiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjYwIiBmaWxsPSIjZjk3MzE2IiBvcGFjaXR5PSIwLjIiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjMwIiBmaWxsPSIjZjk3MzE2Ii8+CiAgPGVsbGlwc2UgY3g9IjEwMCIgY3k9IjkwIiByeD0iMTUiIHJ5PSIyNSIgZmlsbD0iI2VhNTgwYyIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZWE1ODBjIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNTAwIj5GUlVJVCBTRUVEUzwvdGV4dD4KPC9zdmc+",

    cashCrop: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmZmY3ZWQiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjYwIiBmaWxsPSIjZmJiZjI0IiBvcGFjaXR5PSIwLjIiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjMwIiBmaWxsPSIjZmJiZjI0Ii8+CiAgPGVsbGlwc2UgY3g9IjEwMCIgY3k9IjkwIiByeD0iMTUiIHJ5PSIyNSIgZmlsbD0iI2Y1OWUwYiIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZjU5ZTBiIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNTAwIj5DQVNIIENST1AgU0VFRFM8L3RleHQ+Cjwvc3ZnPg==",

    default: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmM2Y0ZjYiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjYwIiBmaWxsPSIjMjJjNTVlIiBvcGFjaXR5PSIwLjIiLz4KICA8cGF0aCBkPSJNNzAgMTAwYzAtMTYuNTY5IDEzLjQzMS0zMCAzMC0zMHMzMCAxMy40MzEgMzAgMzAtMTMuNDMxIDMwLTMwIDMwLTMwLTEzLjQzMS0zMC0zMHoiIGZpbGw9IiMyMmM1NWUiLz4KICA8ZWxsaXBzZSBjeD0iMTAwIiBjeT0iOTAiIHJ4PSIxNSIgcnk9IjI1IiBmaWxsPSIjMTZhMzRhIi8+CiAgPGVsbGlwc2UgY3g9Ijg1IiBjeT0iMTA1IiByeD0iOCIgcnk9IjE1IiBmaWxsPSIjMTU4MDNkIi8+CiAgPGVsbGlwc2UgY3g9IjExNSIgY3k9IjEwNSIgcng9IjgiIHJ5PSIxNSIgZmlsbD0iIzE1ODAzZCIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmI3MjgwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNTAwIj5TRUVEUzwvdGV4dD4KPC9zdmc+"
};

const Seeds = () => {
    const [seeds, setSeeds] = useState([
        {
            id: 1,
            name: 'Wheat Seeds (HD-2967)',
            variety: 'HD-2967',
            category: 'Wheat',
            quantity: 25,
            unit: 'bags',
            pricePerUnit: 2500,
            purchaseDate: '2024-01-10',
            expiryDate: '2025-01-10',
            supplier: 'AgriSeeds Co.',
            status: 'in_stock',
            minThreshold: 10,
            image: seedImages.wheat,
            germinationRate: 95,
            isOrganic: false,
            description: 'High-yielding wheat variety suitable for irrigated conditions. Excellent grain quality with good disease resistance.',
            qualityGrade: 'Premium'
        },
        {
            id: 2,
            name: 'Rice Seeds (Basmati)',
            variety: 'Basmati 1121',
            category: 'Rice',
            quantity: 15,
            unit: 'bags',
            pricePerUnit: 3500,
            purchaseDate: '2024-01-08',
            expiryDate: '2025-01-08',
            supplier: 'Premium Seeds Ltd.',
            status: 'in_stock',
            minThreshold: 8,
            image: seedImages.rice,
            germinationRate: 92,
            isOrganic: true,
            description: 'Premium Basmati rice seeds with excellent aroma and grain length. Perfect for commercial cultivation.',
            qualityGrade: 'Premium'
        },
        {
            id: 3,
            name: 'Corn Seeds (Hybrid)',
            variety: 'Pioneer 30V92',
            category: 'Corn',
            quantity: 5,
            unit: 'bags',
            pricePerUnit: 4000,
            purchaseDate: '2024-01-05',
            expiryDate: '2024-12-05',
            supplier: 'Hybrid Seeds Inc.',
            status: 'low_stock',
            minThreshold: 10,
            image: seedImages.corn,
            germinationRate: 88,
            isOrganic: false,
            description: 'High-performance hybrid corn with excellent yield potential and drought tolerance.',
            qualityGrade: 'A'
        },
        {
            id: 4,
            name: 'Tomato Seeds',
            variety: 'Cherry Tomato',
            category: 'Vegetables',
            quantity: 50,
            unit: 'packets',
            pricePerUnit: 150,
            purchaseDate: '2024-01-12',
            expiryDate: '2025-06-12',
            supplier: 'Garden Seeds Co.',
            status: 'in_stock',
            minThreshold: 20,
            image: seedImages.tomato,
            germinationRate: 90,
            isOrganic: true,
            description: 'Sweet cherry tomatoes perfect for fresh consumption and market sales. High disease resistance.',
            qualityGrade: 'A'
        },
        {
            id: 5,
            name: 'Onion Seeds',
            variety: 'Red Onion',
            category: 'Vegetables',
            quantity: 30,
            unit: 'packets',
            pricePerUnit: 120,
            purchaseDate: '2024-01-15',
            expiryDate: '2025-07-15',
            supplier: 'Veggie Seeds Pro',
            status: 'in_stock',
            minThreshold: 15,
            image: seedImages.onion,
            germinationRate: 85,
            isOrganic: false,
            description: 'Deep red onions with excellent storage quality and strong flavor. Good for commercial production.',
            qualityGrade: 'B'
        },
        {
            id: 6,
            name: 'Sunflower Seeds',
            variety: 'Hybrid SF-187',
            category: 'Cash Crops',
            quantity: 12,
            unit: 'bags',
            pricePerUnit: 2800,
            purchaseDate: '2024-01-20',
            expiryDate: '2025-01-20',
            supplier: 'Oil Seeds Corp',
            status: 'in_stock',
            minThreshold: 8,
            image: seedImages.sunflower,
            germinationRate: 93,
            isOrganic: false,
            description: 'High oil content sunflower variety with excellent yield potential and disease resistance.',
            qualityGrade: 'Premium'
        },
        {
            id: 7,
            name: 'Potato Seeds',
            variety: 'Kufri Pukhraj',
            category: 'Vegetables',
            quantity: 40,
            unit: 'bags',
            pricePerUnit: 1800,
            purchaseDate: '2024-01-25',
            expiryDate: '2024-10-25',
            supplier: 'Root Crop Seeds Ltd.',
            status: 'in_stock',
            minThreshold: 20,
            image: seedImages.potato,
            germinationRate: 87,
            isOrganic: true,
            description: 'Early maturing potato variety with good yield and storage quality. Suitable for both fresh market and processing.',
            qualityGrade: 'A'
        },
        {
            id: 8,
            name: 'Carrot Seeds',
            variety: 'Nantes Half Long',
            category: 'Vegetables',
            quantity: 25,
            unit: 'packets',
            pricePerUnit: 180,
            purchaseDate: '2024-01-28',
            expiryDate: '2025-07-28',
            supplier: 'Garden Fresh Seeds',
            status: 'in_stock',
            minThreshold: 12,
            image: seedImages.carrot,
            germinationRate: 89,
            isOrganic: false,
            description: 'Sweet and crisp carrots with uniform shape. Excellent for fresh market sales and processing.',
            qualityGrade: 'A'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showSellModal, setShowSellModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedSeed, setSelectedSeed] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
    const [newSeed, setNewSeed] = useState({
        name: '',
        variety: '',
        category: '',
        quantity: '',
        unit: 'bags',
        pricePerUnit: '',
        purchaseDate: '',
        expiryDate: '',
        supplier: '',
        minThreshold: '',
        image: '',
        germinationRate: '',
        isOrganic: false,
        description: '',
        qualityGrade: 'B'
    });

    const categories = ['all', 'Wheat', 'Rice', 'Corn', 'Vegetables', 'Fruits', 'Cash Crops'];
    const statuses = ['all', 'in_stock', 'low_stock', 'out_of_stock'];
    const units = ['bags', 'packets', 'kg', 'tons'];
    const qualityGrades = ['Premium', 'A', 'B', 'C'];

    const filteredSeeds = seeds.filter(seed => {
        const matchesSearch = seed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            seed.variety.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || seed.category === filterCategory;
        const matchesStatus = filterStatus === 'all' || seed.status === filterStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const handleAddSeed = (e) => {
        e.preventDefault();
        const id = Date.now();
        const status = parseInt(newSeed.quantity) <= parseInt(newSeed.minThreshold) ? 'low_stock' : 'in_stock';

        setSeeds([...seeds, {
            ...newSeed,
            id,
            status,
            quantity: parseInt(newSeed.quantity),
            pricePerUnit: parseFloat(newSeed.pricePerUnit),
            minThreshold: parseInt(newSeed.minThreshold),
            germinationRate: parseInt(newSeed.germinationRate || 85)
        }]);
        setNewSeed({
            name: '',
            variety: '',
            category: '',
            quantity: '',
            unit: 'bags',
            pricePerUnit: '',
            purchaseDate: '',
            expiryDate: '',
            supplier: '',
            minThreshold: '',
            image: '',
            germinationRate: '',
            isOrganic: false,
            description: '',
            qualityGrade: 'B'
        });
        setShowAddModal(false);
    };

    const handleEditSeed = (e) => {
        e.preventDefault();
        const status = selectedSeed.quantity <= selectedSeed.minThreshold ? 'low_stock' : 'in_stock';

        setSeeds(seeds.map(seed =>
            seed.id === selectedSeed.id
                ? { ...selectedSeed, status }
                : seed
        ));
        setShowEditModal(false);
        setSelectedSeed(null);
    };

    const handleSellSeed = (e) => {
        e.preventDefault();
        const sellQuantity = parseInt(e.target.sellQuantity.value);
        const sellPrice = parseFloat(e.target.sellPrice.value);

        const updatedSeed = {
            ...selectedSeed,
            quantity: selectedSeed.quantity - sellQuantity
        };

        updatedSeed.status = updatedSeed.quantity <= updatedSeed.minThreshold ? 'low_stock' : 'in_stock';
        if (updatedSeed.quantity === 0) updatedSeed.status = 'out_of_stock';

        setSeeds(seeds.map(seed =>
            seed.id === selectedSeed.id ? updatedSeed : seed
        ));

        setShowSellModal(false);
        setSelectedSeed(null);
    };

    const handleDeleteSeed = (id) => {
        if (window.confirm('Are you sure you want to delete this seed?')) {
            setSeeds(seeds.filter(seed => seed.id !== id));
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

    const getStatusText = (status) => {
        switch (status) {
            case 'in_stock':
                return 'In Stock';
            case 'low_stock':
                return 'Low Stock';
            case 'out_of_stock':
                return 'Out of Stock';
            default:
                return 'Unknown';
        }
    };

    const totalValue = seeds.reduce((sum, seed) => sum + (seed.quantity * seed.pricePerUnit), 0);
    const lowStockCount = seeds.filter(seed => seed.status === 'low_stock').length;
    const organicCount = seeds.filter(seed => seed.isOrganic).length;
    const avgGermination = seeds.reduce((sum, seed) => sum + (seed.germinationRate || 0), 0) / seeds.length;

    const getDefaultImage = (category) => {
        const categoryMap = {
            'Wheat': seedImages.wheat,
            'Rice': seedImages.rice,
            'Corn': seedImages.corn,
            'Vegetables': seedImages.vegetable,
            'Fruits': seedImages.fruit,
            'Cash Crops': seedImages.cashCrop
        };
        return categoryMap[category] || seedImages.default;
    };

    const getDaysUntilExpiry = (expiryDate) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const getExpiryStatus = (expiryDate) => {
        const days = getDaysUntilExpiry(expiryDate);
        if (days < 0) return { text: 'Expired', color: 'text-red-600', bgColor: 'bg-red-100' };
        if (days <= 30) return { text: `${days} days left`, color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
        return { text: `${days} days left`, color: 'text-green-600', bgColor: 'bg-green-100' };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <div className="space-y-6 p-6">
                {/* Premium Professional Header */}
                <div className="relative">
                    {/* Background with animated patterns */}
                <div className="bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden shadow-2xl">
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
                                {/* Main Seeds Section */}
                                <div className="xl:col-span-8">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
                                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 mb-4 sm:mb-0 sm:mr-4">
                                            <Leaf className="h-8 w-8 text-green-300" />
                                        </div>
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                                                    Seeds Inventory
                                                </h1>
                                                <div className="flex space-x-1">
                                                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                                    <Package className="h-5 w-5 text-green-300" />
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center mt-3 gap-3">
                                                <div className="flex items-center space-x-2 text-green-100">
                                                    <Package className="h-4 w-4" />
                                                    <span className="text-sm sm:text-lg font-medium">Seed Management</span>
                                                    <span className="text-green-200 hidden sm:inline">•</span>
                                                    <span className="text-green-200 text-sm sm:text-base">Quality Assured</span>
                                                </div>
                                                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full whitespace-nowrap">
                                                    <span className="text-xs sm:text-sm font-medium">Premium Seeds</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 mb-4">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="text-center p-2">
                                                <p className="text-xl sm:text-2xl font-bold text-white">{seeds.length}</p>
                                                <p className="text-green-200 text-[10px] sm:text-sm uppercase tracking-wider font-semibold">Total Varieties</p>
                                            </div>
                                            <div className="text-center p-2">
                                                <p className="text-xl sm:text-2xl font-bold text-white">₹{Math.round(totalValue / 1000)}K</p>
                                                <p className="text-green-200 text-[10px] sm:text-sm uppercase tracking-wider font-semibold">Total Value</p>
                                            </div>
                                            <div className="text-center p-2">
                                                <p className="text-xl sm:text-2xl font-bold text-white">{organicCount}</p>
                                                <p className="text-green-200 text-[10px] sm:text-sm uppercase tracking-wider font-semibold">Organic</p>
                                            </div>
                                            <div className="text-center p-2">
                                                <p className="text-xl sm:text-2xl font-bold text-white">{avgGermination.toFixed(0)}%</p>
                                                <p className="text-green-200 text-[10px] sm:text-sm uppercase tracking-wider font-semibold">Avg. Germination</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Professional Insight */}
                                    <div className="bg-gradient-to-r from-yellow-400/20 to-green-400/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-yellow-400/30 rounded-lg p-2">
                                                <Award className="h-5 w-5 text-yellow-300" />
                                            </div>
                                            <div>
                                                <p className="text-yellow-100 font-medium">Inventory Status</p>
                                                <p className="text-white text-sm">
                                                    {lowStockCount > 0 ? `${lowStockCount} varieties need restocking` : "All seed varieties are well stocked"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Panel */}
                                <div className="xl:col-span-4 space-y-4">
                                    {/* Add Seeds Button */}
                                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
                                        <button
                                            onClick={() => setShowAddModal(true)}
                                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl flex items-center justify-center space-x-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                                        >
                                            <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                                            <span className="font-semibold text-base sm:text-lg">Add New Seeds</span>
                                        </button>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-2">
                                                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-300" />
                                                <h3 className="text-white font-semibold text-sm sm:text-base">Quick Actions</h3>
                                            </div>
                                        </div>

                                        <div className="space-y-2 sm:space-y-3">
                                            <button className="w-full flex items-center justify-between text-white hover:bg-white/10 transition-colors rounded-lg p-2 sm:p-3">
                                                <div className="flex items-center space-x-3 text-sm sm:text-base">
                                                    <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                                                    <span className="font-medium">Search Seeds</span>
                                                </div>
                                            </button>
                                            <button className="w-full flex items-center justify-between text-white hover:bg-white/10 transition-colors rounded-lg p-2 sm:p-3">
                                                <div className="flex items-center space-x-3 text-sm sm:text-base">
                                                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                                                    <span className="font-medium">Low Stock Alert</span>
                                                </div>
                                                <span className="bg-red-400/30 text-red-200 px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
                                                    {lowStockCount}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                                <Package className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex items-center text-sm font-semibold text-green-600">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                +12%
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Varieties</p>
                                <p className="text-2xl font-bold text-gray-900">{seeds.length}</p>
                                <p className="text-xs text-gray-500">Available types</p>
                            </div>
                            <div className="mt-3">
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Inventory</span>
                                    <span>85%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="h-2 rounded-full bg-blue-500 transition-all duration-500" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                                <DollarSign className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="flex items-center text-sm font-semibold text-green-600">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                +8%
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Value</p>
                                <p className="text-2xl font-bold text-gray-900">₹{totalValue.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Investment worth</p>
                            </div>
                            <div className="mt-3">
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Growth</span>
                                    <span>92%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="h-2 rounded-full bg-green-500 transition-all duration-500" style={{ width: '92%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div className="flex items-center text-sm font-semibold text-yellow-600">
                                <TrendingDown className="h-4 w-4 mr-1" />
                                Alert
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                                <p className="text-2xl font-bold text-gray-900">{lowStockCount}</p>
                                <p className="text-xs text-gray-500">Needs attention</p>
                            </div>
                            <div className="mt-3">
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Risk Level</span>
                                    <span>{lowStockCount > 2 ? '65%' : '35%'}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className={`h-2 rounded-full transition-all duration-500 ${lowStockCount > 2 ? 'bg-red-500' : 'bg-yellow-500'}`}
                                        style={{ width: `${lowStockCount > 2 ? '65%' : '35%'}` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                                <Award className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="flex items-center text-sm font-semibold text-green-600">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                +15%
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Organic Seeds</p>
                                <p className="text-2xl font-bold text-gray-900">{organicCount}</p>
                                <p className="text-xs text-gray-500">Certified organic</p>
                            </div>
                            <div className="mt-3">
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Organic Ratio</span>
                                    <span>{Math.round((organicCount / seeds.length) * 100)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="h-2 rounded-full bg-purple-500 transition-all duration-500"
                                        style={{ width: `${(organicCount / seeds.length) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3">
                                <Star className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div className="flex items-center text-sm font-semibold text-green-600">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                +3%
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Avg. Germination</p>
                                <p className="text-2xl font-bold text-gray-900">{avgGermination.toFixed(0)}%</p>
                                <p className="text-xs text-gray-500">Quality rating</p>
                            </div>
                            <div className="mt-3">
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Performance</span>
                                    <span>{avgGermination.toFixed(0)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="h-2 rounded-full bg-indigo-500 transition-all duration-500"
                                        style={{ width: `${avgGermination}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Filters and Search */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Search seeds by name or variety..."
                                    className="pl-10 pr-4 py-3 w-80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <select
                                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : category}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                {statuses.map(status => (
                                    <option key={status} value={status}>
                                        {status === 'all' ? 'All Status' : getStatusText(status)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid'
                                        ? 'bg-green-600 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'}`}
                                >
                                    <Package className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'table'
                                        ? 'bg-green-600 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'}`}
                                >
                                    <Filter className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-xl">
                                <span className="font-medium">{filteredSeeds.length}</span>
                                <span className="ml-1">results</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seeds Display */}
                {viewMode === 'grid' ? (
                    /* Grid View */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {filteredSeeds.map((seed) => {
                            const expiryStatus = getExpiryStatus(seed.expiryDate);
                            return (
                                <div key={seed.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 group overflow-hidden">
                                    {/* Seed Image */}
                                    <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                                        <img
                                            src={seed.image || getDefaultImage(seed.category)}
                                            alt={seed.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.src = getDefaultImage(seed.category);
                                            }}
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        {/* Status Badge */}
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${getStatusColor(seed.status)}`}>
                                                {getStatusText(seed.status)}
                                            </span>
                                        </div>

                                        {/* Organic Badge */}
                                        {seed.isOrganic && (
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg backdrop-blur-sm">
                                                    <Leaf className="h-3 w-3 mr-1" />
                                                    Organic
                                                </span>
                                            </div>
                                        )}

                                        {/* Premium Badge */}
                                        {seed.qualityGrade === 'Premium' && (
                                            <div className="absolute bottom-3 left-3">
                                                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
                                                    <Award className="h-3 w-3 mr-1" />
                                                    Premium
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 space-y-4">
                                        {/* Header Section */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-green-700 transition-colors duration-200">{seed.name}</h3>
                                            </div>
                                            <p className="text-sm font-medium text-green-600">{seed.variety}</p>
                                            <p className="text-sm text-gray-500 line-clamp-2">{seed.description}</p>
                                        </div>

                                        {/* Enhanced Information Grid */}
                                        <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
                                            <div className="space-y-1">
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <Package className="h-3 w-3 mr-1" />
                                                    Stock
                                                </div>
                                                <p className="text-sm font-bold text-gray-900">{seed.quantity} {seed.unit}</p>
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div
                                                        className={`h-1.5 rounded-full transition-all duration-500 ${seed.quantity > seed.minThreshold * 2 ? 'bg-green-500' :
                                                            seed.quantity > seed.minThreshold ? 'bg-yellow-500' : 'bg-red-500'
                                                            }`}
                                                        style={{ width: `${Math.min((seed.quantity / (seed.minThreshold * 3)) * 100, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <DollarSign className="h-3 w-3 mr-1" />
                                                    Price
                                                </div>
                                                <p className="text-sm font-bold text-gray-900">₹{seed.pricePerUnit.toLocaleString()}</p>
                                                <p className="text-xs text-gray-500">per {seed.unit.slice(0, -1)}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <TrendingUp className="h-3 w-3 mr-1" />
                                                    Germination
                                                </div>
                                                <p className="text-sm font-bold text-gray-900">{seed.germinationRate}%</p>
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div
                                                        className="h-1.5 rounded-full bg-blue-500 transition-all duration-500"
                                                        style={{ width: `${seed.germinationRate}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <MapPin className="h-3 w-3 mr-1" />
                                                    Supplier
                                                </div>
                                                <p className="text-sm font-bold text-gray-900 truncate">{seed.supplier}</p>
                                                <p className="text-xs text-gray-500">Trusted partner</p>
                                            </div>
                                        </div>

                                        {/* Enhanced Expiry Information */}
                                        <div className="flex items-center justify-between py-3 border-t border-gray-100">
                                            <div className="flex items-center text-xs">
                                                <Clock className="h-3 w-3 mr-1 text-gray-400" />
                                                <span className="text-gray-500">Expires:</span>
                                                <span className={`ml-1 font-semibold px-2 py-1 rounded-full ${expiryStatus.bgColor} ${expiryStatus.color}`}>
                                                    {expiryStatus.text}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Enhanced Action Buttons */}
                                        <div className="grid grid-cols-3 gap-2 pt-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedSeed(seed);
                                                    setShowDetailModal(true);
                                                }}
                                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center hover:scale-105"
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                View
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedSeed(seed);
                                                    setShowSellModal(true);
                                                }}
                                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center hover:scale-105 shadow-lg"
                                            >
                                                <ShoppingCart className="h-4 w-4 mr-1" />
                                                Sell
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedSeed(seed);
                                                    setShowEditModal(true);
                                                }}
                                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center hover:scale-105"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Table View */
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                            Seed Details
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                            Category & Quality
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                            Quantity & Price
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                            Status & Expiry
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {filteredSeeds.map((seed, index) => {
                                        const expiryStatus = getExpiryStatus(seed.expiryDate);
                                        return (
                                            <tr key={seed.id} className={`hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center">
                                                        <div className="relative">
                                                            <img
                                                                className="h-16 w-16 rounded-xl object-cover mr-4 shadow-lg border-2 border-gray-200"
                                                                src={seed.image || getDefaultImage(seed.category)}
                                                                alt={seed.name}
                                                                onError={(e) => {
                                                                    e.target.src = getDefaultImage(seed.category);
                                                                }}
                                                            />
                                                            {seed.isOrganic && (
                                                                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                                                                    <Leaf className="h-3 w-3 text-white" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="text-sm font-bold text-gray-900 flex items-center">
                                                                {seed.name}
                                                                {seed.qualityGrade === 'Premium' && (
                                                                    <Award className="h-4 w-4 text-yellow-500 ml-2" />
                                                                )}
                                                            </div>
                                                            <div className="text-sm font-medium text-green-600">Variety: {seed.variety}</div>
                                                            <div className="text-sm text-gray-500">Supplier: {seed.supplier}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="space-y-2">
                                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 shadow-sm">
                                                            {seed.category}
                                                        </span>
                                                        <div>
                                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${seed.qualityGrade === 'Premium' ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800' :
                                                                seed.qualityGrade === 'A' ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800' :
                                                                    'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800'
                                                                }`}>
                                                                Grade {seed.qualityGrade}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-gray-600 font-medium">
                                                            Germination: {seed.germinationRate}%
                                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                <div
                                                                    className="h-1.5 rounded-full bg-blue-500"
                                                                    style={{ width: `${seed.germinationRate}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="space-y-2">
                                                        <div className="text-sm font-bold text-gray-900">
                                                            {seed.quantity} {seed.unit}
                                                        </div>
                                                        <div className="text-sm font-medium text-green-600">
                                                            ₹{seed.pricePerUnit.toLocaleString()}/unit
                                                        </div>
                                                        <div className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg">
                                                            Total: ₹{(seed.quantity * seed.pricePerUnit).toLocaleString()}
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                            <div
                                                                className={`h-1.5 rounded-full ${seed.quantity > seed.minThreshold * 2 ? 'bg-green-500' :
                                                                    seed.quantity > seed.minThreshold ? 'bg-yellow-500' : 'bg-red-500'
                                                                    }`}
                                                                style={{ width: `${Math.min((seed.quantity / (seed.minThreshold * 3)) * 100, 100)}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="space-y-2">
                                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${getStatusColor(seed.status)}`}>
                                                            {getStatusText(seed.status)}
                                                        </span>
                                                        <div className={`text-xs font-medium px-3 py-1 rounded-full ${expiryStatus.bgColor} ${expiryStatus.color}`}>
                                                            {expiryStatus.text}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedSeed(seed);
                                                                setShowDetailModal(true);
                                                            }}
                                                            className="text-green-600 hover:text-green-900 hover:bg-green-100 p-2 rounded-lg transition-all duration-200"
                                                            title="View Details"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedSeed(seed);
                                                                setShowSellModal(true);
                                                            }}
                                                            className="text-blue-600 hover:text-blue-900 hover:bg-blue-100 p-2 rounded-lg transition-all duration-200"
                                                            title="Sell"
                                                        >
                                                            <ShoppingCart className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedSeed(seed);
                                                                setShowEditModal(true);
                                                            }}
                                                            className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 p-2 rounded-lg transition-all duration-200"
                                                            title="Edit"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteSeed(seed.id)}
                                                            className="text-red-600 hover:text-red-900 hover:bg-red-100 p-2 rounded-lg transition-all duration-200"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Detail Modal */}
                {showDetailModal && selectedSeed && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-xl bg-white">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">Seed Details</h3>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <span className="sr-only">Close</span>
                                    ×
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Image Section */}
                                <div className="space-y-4">
                                    <img
                                        src={selectedSeed.image || getDefaultImage(selectedSeed.category)}
                                        alt={selectedSeed.name}
                                        className="w-full h-64 object-cover rounded-lg"
                                        onError={(e) => {
                                            e.target.src = getDefaultImage(selectedSeed.category);
                                        }}
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        {selectedSeed.isOrganic && (
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                                <Leaf className="h-4 w-4 mr-1" />
                                                Organic
                                            </span>
                                        )}
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedSeed.status)}`}>
                                            {getStatusText(selectedSeed.status)}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedSeed.qualityGrade === 'Premium' ? 'bg-yellow-100 text-yellow-800' :
                                            selectedSeed.qualityGrade === 'A' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            Grade {selectedSeed.qualityGrade}
                                        </span>
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">{selectedSeed.name}</h4>
                                        <p className="text-gray-600">{selectedSeed.variety}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500">Category</p>
                                            <p className="font-semibold text-gray-900">{selectedSeed.category}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500">Quantity</p>
                                            <p className="font-semibold text-gray-900">{selectedSeed.quantity} {selectedSeed.unit}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500">Price per Unit</p>
                                            <p className="font-semibold text-gray-900">₹{selectedSeed.pricePerUnit}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500">Germination Rate</p>
                                            <p className="font-semibold text-green-600">{selectedSeed.germinationRate}%</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500">Purchase Date</p>
                                            <p className="font-semibold text-gray-900">{new Date(selectedSeed.purchaseDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500">Expiry Date</p>
                                            <p className={`font-semibold ${getExpiryStatus(selectedSeed.expiryDate).color}`}>
                                                {new Date(selectedSeed.expiryDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-500 mb-1">Supplier</p>
                                        <p className="font-semibold text-gray-900">{selectedSeed.supplier}</p>
                                    </div>

                                    {selectedSeed.description && (
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500 mb-1">Description</p>
                                            <p className="text-sm text-gray-700">{selectedSeed.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        setShowDetailModal(false);
                                        setShowEditModal(true);
                                    }}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Edit Seed
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Seed Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-2/3 shadow-lg rounded-xl bg-white">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Seed Variety</h3>
                            <form onSubmit={handleAddSeed} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Seed Name *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            value={newSeed.name}
                                            onChange={(e) => setNewSeed({ ...newSeed, name: e.target.value })}
                                            placeholder="e.g., Wheat Seeds (HD-2967)"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Variety *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            value={newSeed.variety}
                                            onChange={(e) => setNewSeed({ ...newSeed, variety: e.target.value })}
                                            placeholder="e.g., HD-2967"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                        <select
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            value={newSeed.category}
                                            onChange={(e) => setNewSeed({ ...newSeed, category: e.target.value })}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.slice(1).map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Quality Grade</label>
                                        <select
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            value={newSeed.qualityGrade}
                                            onChange={(e) => setNewSeed({ ...newSeed, qualityGrade: e.target.value })}
                                        >
                                            {qualityGrades.map(grade => (
                                                <option key={grade} value={grade}>{grade}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            value={newSeed.quantity}
                                            onChange={(e) => setNewSeed({ ...newSeed, quantity: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                                        <select
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            value={newSeed.unit}
                                            onChange={(e) => setNewSeed({ ...newSeed, unit: e.target.value })}
                                        >
                                            {units.map(unit => (
                                                <option key={unit} value={unit}>{unit}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit (₹) *</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            step="0.01"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            value={newSeed.pricePerUnit}
                                            onChange={(e) => setNewSeed({ ...newSeed, pricePerUnit: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Germination Rate (%)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            value={newSeed.germinationRate}
                                            onChange={(e) => setNewSeed({ ...newSeed, germinationRate: e.target.value })}
                                            placeholder="85"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date *</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            value={newSeed.purchaseDate}
                                            onChange={(e) => setNewSeed({ ...newSeed, purchaseDate: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            value={newSeed.expiryDate}
                                            onChange={(e) => setNewSeed({ ...newSeed, expiryDate: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Supplier *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            value={newSeed.supplier}
                                            onChange={(e) => setNewSeed({ ...newSeed, supplier: e.target.value })}
                                            placeholder="e.g., AgriSeeds Co."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Threshold *</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            value={newSeed.minThreshold}
                                            onChange={(e) => setNewSeed({ ...newSeed, minThreshold: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        value={newSeed.image}
                                        onChange={(e) => setNewSeed({ ...newSeed, image: e.target.value })}
                                    >
                                        <option value="">Select seed image</option>
                                        <option value={seedImages.wheat}>🌾 Wheat Seeds</option>
                                        <option value={seedImages.rice}>🍚 Rice Seeds</option>
                                        <option value={seedImages.corn}>🌽 Corn Seeds</option>
                                        <option value={seedImages.tomato}>🍅 Tomato Seeds</option>
                                        <option value={seedImages.onion}>🧅 Onion Seeds</option>
                                        <option value={seedImages.sunflower}>🌻 Sunflower Seeds</option>
                                        <option value={seedImages.potato}>🥔 Potato Seeds</option>
                                        <option value={seedImages.carrot}>🥕 Carrot Seeds</option>
                                        <option value={seedImages.vegetable}>🥬 Vegetable Seeds</option>
                                        <option value={seedImages.fruit}>🍎 Fruit Seeds</option>
                                        <option value={seedImages.cashCrop}>💰 Cash Crop Seeds</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Choose a seed image or leave blank for default</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        rows="3"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        value={newSeed.description}
                                        onChange={(e) => setNewSeed({ ...newSeed, description: e.target.value })}
                                        placeholder="Describe the seed characteristics, growing conditions, etc."
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                            checked={newSeed.isOrganic}
                                            onChange={(e) => setNewSeed({ ...newSeed, isOrganic: e.target.checked })}
                                        />
                                        <span className="ml-2 text-sm text-gray-700 flex items-center">
                                            <Leaf className="h-4 w-4 text-green-500 mr-1" />
                                            Organic Certified
                                        </span>
                                    </label>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4 border-t">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Seed
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Seed Modal */}
                {showEditModal && selectedSeed && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Seed</h3>
                            <form onSubmit={handleEditSeed} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Seed Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                            value={selectedSeed.name}
                                            onChange={(e) => setSelectedSeed({ ...selectedSeed, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                            value={selectedSeed.quantity}
                                            onChange={(e) => setSelectedSeed({ ...selectedSeed, quantity: parseInt(e.target.value) })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Price per Unit</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            step="0.01"
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                            value={selectedSeed.pricePerUnit}
                                            onChange={(e) => setSelectedSeed({ ...selectedSeed, pricePerUnit: parseFloat(e.target.value) })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Minimum Threshold</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                            value={selectedSeed.minThreshold}
                                            onChange={(e) => setSelectedSeed({ ...selectedSeed, minThreshold: parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowEditModal(false);
                                            setSelectedSeed(null);
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                    >
                                        Update Seed
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Sell Seed Modal */}
                {showSellModal && selectedSeed && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/3 shadow-lg rounded-md bg-white">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Sell Seed</h3>
                            <div className="mb-4 p-3 bg-gray-50 rounded-md">
                                <p className="text-sm"><strong>Seed:</strong> {selectedSeed.name}</p>
                                <p className="text-sm"><strong>Available:</strong> {selectedSeed.quantity} {selectedSeed.unit}</p>
                                <p className="text-sm"><strong>Price/Unit:</strong> ₹{selectedSeed.pricePerUnit}</p>
                            </div>
                            <form onSubmit={handleSellSeed} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Quantity to Sell</label>
                                    <input
                                        type="number"
                                        name="sellQuantity"
                                        required
                                        min="1"
                                        max={selectedSeed.quantity}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Selling Price per Unit</label>
                                    <input
                                        type="number"
                                        name="sellPrice"
                                        required
                                        min="0"
                                        step="0.01"
                                        defaultValue={selectedSeed.pricePerUnit}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowSellModal(false);
                                            setSelectedSeed(null);
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                    >
                                        Sell
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Seeds;