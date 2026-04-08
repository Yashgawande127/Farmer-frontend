import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    Home,
    Sprout,
    Truck,
    Leaf,
    Wallet,
    User,
    Menu,
    X,
    Search,
    TrendingUp
} from 'lucide-react';

const Layout = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isSearchFocused, setIsSearchFocused] = React.useState(false);
    const searchInputRef = React.useRef(null);

    const navigation = [
        { name: 'Dashboard', href: '/app/dashboard', icon: Home },
        { name: 'Seeds', href: '/app/seeds', icon: Sprout },
        { name: 'Machinery', href: '/app/machinery', icon: Truck },
        { name: 'Fertilizers', href: '/app/fertilizers', icon: Leaf },

        { name: 'Savings', href: '/app/savings', icon: Wallet },
        { name: 'Profile', href: '/app/profile', icon: User },
    ];

    const isActive = (path) => location.pathname === path;

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // TODO: Implement search functionality
            console.log('Searching for:', searchQuery);
            // You can navigate to a search results page or filter current data
        }
    };

    const handleSearchButtonClick = () => {
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
            // TODO: Implement search functionality
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                <Sprout className="h-8 w-8 text-green-600" />
                                <span className="ml-2 text-xl font-bold text-gray-900">
                                    KrishiSahayak
                                </span>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-lg mx-8">
                            <form onSubmit={handleSearch} className="w-full">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className={`h-5 w-5 transition-colors duration-200 ${isSearchFocused ? 'text-green-500' : 'text-gray-400'
                                            }`} />
                                    </div>
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setIsSearchFocused(true)}
                                        onBlur={() => setIsSearchFocused(false)}
                                        className={`block w-full pl-10 pr-12 py-2 border rounded-lg text-sm placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${isSearchFocused
                                                ? 'border-green-300 bg-white shadow-md'
                                                : 'border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400'
                                            }`}
                                        placeholder="Search seeds, machinery, fertilizers..."
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center">
                                        <button
                                            type="submit"
                                            className="h-full px-3 text-gray-400 hover:text-green-600 focus:outline-none focus:text-green-600 transition-colors duration-200"
                                            aria-label="Search"
                                        >
                                            <Search className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href)
                                            ? 'text-green-600 bg-green-50'
                                            : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Icon className="h-4 w-4 mr-2" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                            {/* Mobile Search */}
                            <div className="px-3 py-2">
                                <form onSubmit={handleSearch}>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            placeholder="Search seeds, machinery, fertilizers..."
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center">
                                            <button
                                                type="submit"
                                                className="h-full px-3 text-gray-400 hover:text-green-600 focus:outline-none focus:text-green-600 transition-colors duration-200"
                                                aria-label="Search"
                                            >
                                                <Search className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Mobile Navigation Links */}
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive(item.href)
                                            ? 'text-green-600 bg-green-50'
                                            : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                                            }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <div className="flex items-center">
                                            <Icon className="h-5 w-5 mr-3" />
                                            {item.name}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;