import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { profileService } from '../../services/profileService';
import { useNavigate } from 'react-router-dom';
import {
    User,
    MapPin,
    Phone,
    Mail,
    Home,
    Truck,
    Edit3,
    Save,
    X,
    Camera,
    Bell,
    Globe,
    DollarSign,
    Shield,
    Calendar,
    Sprout,
    LogOut,
    AlertTriangle
} from 'lucide-react';

const Profile = () => {
    const { user, updateUser, logout } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        farmName: '',
        location: '',
        phoneNumber: '',
        farmSize: '',
        farmType: 'conventional',
        profileImage: '',
        preferences: {
            notifications: {
                email: true,
                sms: false,
                push: true
            },
            language: 'en',
            currency: 'USD'
        }
    });

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                email: user.email || '',
                farmName: user.farmName || '',
                location: user.location || '',
                phoneNumber: user.phoneNumber || '',
                farmSize: user.farmSize || '',
                farmType: user.farmType || 'conventional',
                profileImage: user.profileImage || '',
                preferences: {
                    notifications: {
                        email: user.preferences?.notifications?.email ?? true,
                        sms: user.preferences?.notifications?.sms ?? false,
                        push: user.preferences?.notifications?.push ?? true
                    },
                    language: user.preferences?.language || 'en',
                    currency: user.preferences?.currency || 'USD'
                }
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes('.')) {
            const [parent, child, grandchild] = name.split('.');
            setProfileData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: grandchild ? {
                        ...prev[parent][child],
                        [grandchild]: type === 'checkbox' ? checked : value
                    } : (type === 'checkbox' ? checked : value)
                }
            }));
        } else {
            setProfileData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSave = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const updatedUser = await profileService.updateProfile(profileData);
            updateUser(updatedUser);
            setSuccess('Profile updated successfully!');
            setIsEditing(false);

            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setError('');
        setSuccess('');
        // Reset to original user data
        if (user) {
            setProfileData({
                name: user.name || '',
                email: user.email || '',
                farmName: user.farmName || '',
                location: user.location || '',
                phoneNumber: user.phoneNumber || '',
                farmSize: user.farmSize || '',
                farmType: user.farmType || 'conventional',
                profileImage: user.profileImage || '',
                preferences: {
                    notifications: {
                        email: user.preferences?.notifications?.email ?? true,
                        sms: user.preferences?.notifications?.sms ?? false,
                        push: user.preferences?.notifications?.push ?? true
                    },
                    language: user.preferences?.language || 'en',
                    currency: user.preferences?.currency || 'USD'
                }
            });
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const formatJoinDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatLastLogin = (date) => {
        if (!date) return 'Never';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-4">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 py-4 sm:px-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Profile Settings</h1>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            >
                                <Edit3 className="h-4 w-4 mr-2" />
                                Edit Profile
                            </button>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                    onClick={handleCancel}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 transition-colors"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Alert Messages */}
                {error && (
                    <div className="px-6 py-4 bg-red-50 border-l-4 border-red-400">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}
                {success && (
                    <div className="px-6 py-4 bg-green-50 border-l-4 border-green-400">
                        <p className="text-green-700">{success}</p>
                    </div>
                )}

                {/* Profile Content */}
                <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Profile Image and Basic Info */}
                        <div className="lg:col-span-1">
                            <div className="text-center">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                                        {profileData.profileImage ? (
                                            <img
                                                src={profileData.profileImage}
                                                alt="Profile"
                                                className="w-32 h-32 rounded-full object-cover"
                                            />
                                        ) : (
                                            <User className="h-16 w-16 text-gray-400" />
                                        )}
                                    </div>
                                    {isEditing && (
                                        <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                                            <Camera className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">{profileData.name}</h2>
                                <p className="text-sm text-gray-500 mt-1">{profileData.farmName}</p>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center justify-center text-sm text-gray-600">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Joined {formatJoinDate(user?.createdAt)}
                                    </div>
                                    <div className="flex items-center justify-center text-sm text-gray-600">
                                        <Shield className="h-4 w-4 mr-2" />
                                        Last login: {formatLastLogin(user?.lastLogin)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Form */}
                        <div className="lg:col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Personal Information */}
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                        <User className="h-5 w-5 mr-2" />
                                        Personal Information
                                    </h3>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={profileData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        />
                                    ) : (
                                        <p className="py-2 text-gray-900">{profileData.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        />
                                    ) : (
                                        <p className="py-2 text-gray-900 flex items-center">
                                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                            {profileData.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={profileData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        />
                                    ) : (
                                        <p className="py-2 text-gray-900 flex items-center">
                                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                            {profileData.phoneNumber}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Location
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="location"
                                            value={profileData.location}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        />
                                    ) : (
                                        <p className="py-2 text-gray-900 flex items-center">
                                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                            {profileData.location}
                                        </p>
                                    )}
                                </div>

                                {/* Farm Information */}
                                <div className="md:col-span-2 mt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                        <Sprout className="h-5 w-5 mr-2" />
                                        Farm Information
                                    </h3>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Farm Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="farmName"
                                            value={profileData.farmName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        />
                                    ) : (
                                        <p className="py-2 text-gray-900 flex items-center">
                                            <Home className="h-4 w-4 mr-2 text-gray-400" />
                                            {profileData.farmName}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Farm Size (acres)
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            name="farmSize"
                                            value={profileData.farmSize}
                                            onChange={handleInputChange}
                                            min="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        />
                                    ) : (
                                        <p className="py-2 text-gray-900">
                                            {profileData.farmSize} acres
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Farm Type
                                    </label>
                                    {isEditing ? (
                                        <select
                                            name="farmType"
                                            value={profileData.farmType}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="conventional">Conventional</option>
                                            <option value="organic">Organic</option>
                                            <option value="mixed">Mixed</option>
                                        </select>
                                    ) : (
                                        <p className="py-2 text-gray-900 flex items-center capitalize">
                                            <Truck className="h-4 w-4 mr-2 text-gray-400" />
                                            {profileData.farmType}
                                        </p>
                                    )}
                                </div>

                                {/* Preferences */}
                                <div className="md:col-span-2 mt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                        <Bell className="h-5 w-5 mr-2" />
                                        Preferences
                                    </h3>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Language
                                    </label>
                                    {isEditing ? (
                                        <select
                                            name="preferences.language"
                                            value={profileData.preferences.language}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="en">English</option>
                                            <option value="es">Spanish</option>
                                            <option value="fr">French</option>
                                            <option value="de">German</option>
                                        </select>
                                    ) : (
                                        <p className="py-2 text-gray-900 flex items-center">
                                            <Globe className="h-4 w-4 mr-2 text-gray-400" />
                                            {profileData.preferences.language === 'en' ? 'English' :
                                                profileData.preferences.language === 'es' ? 'Spanish' :
                                                    profileData.preferences.language === 'fr' ? 'French' : 'German'}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Currency
                                    </label>
                                    {isEditing ? (
                                        <select
                                            name="preferences.currency"
                                            value={profileData.preferences.currency}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="USD">USD ($)</option>
                                            <option value="EUR">EUR (€)</option>
                                            <option value="GBP">GBP (£)</option>
                                            <option value="INR">INR (₹)</option>
                                        </select>
                                    ) : (
                                        <p className="py-2 text-gray-900 flex items-center">
                                            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                                            {profileData.preferences.currency}
                                        </p>
                                    )}
                                </div>

                                {/* Notification Preferences */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Notification Preferences
                                    </label>
                                    <div className="space-y-3">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="preferences.notifications.email"
                                                checked={profileData.preferences.notifications.email}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded disabled:opacity-50"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Email notifications</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="preferences.notifications.sms"
                                                checked={profileData.preferences.notifications.sms}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded disabled:opacity-50"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">SMS notifications</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="preferences.notifications.push"
                                                checked={profileData.preferences.notifications.push}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded disabled:opacity-50"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Push notifications</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Actions Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Account Actions</h2>
                    <p className="text-sm text-gray-600 mt-1">Manage your account settings and security</p>
                </div>

                <div className="p-6">
                    <div className="space-y-4">
                        {/* Logout Section */}
                        <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-red-100 rounded-lg p-2">
                                        <LogOut className="h-5 w-5 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Sign Out</h3>
                                        <p className="text-xs sm:text-sm text-gray-600">Sign out from your account on this device</p>
                                    </div>
                                </div>

                                {!showLogoutConfirm ? (
                                    <button
                                        onClick={() => setShowLogoutConfirm(true)}
                                        className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Sign Out
                                    </button>
                                ) : (
                                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                        <button
                                            onClick={() => setShowLogoutConfirm(false)}
                                            className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                        >
                                            <AlertTriangle className="h-4 w-4 mr-2" />
                                            Confirm Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>

                            {showLogoutConfirm && (
                                <div className="mt-3 p-3 bg-red-100 rounded-md">
                                    <p className="text-sm text-red-800">
                                        ⚠️ You will be signed out and redirected to the login page. Any unsaved changes will be lost.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;