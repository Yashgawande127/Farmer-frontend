import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, socketService } from '../services';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in (from localStorage)
        const savedUser = localStorage.getItem('farmer_user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setUser(userData);

            // Connect to socket if user is authenticated
            if (userData.token) {
                socketService.connect();
                socketService.joinUserRoom(userData.id);

                // Request notification permission
                socketService.requestNotificationPermission();
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const result = await authService.login(credentials);
            if (result.success) {
                setUser(result.user);

                // Connect to socket after successful login
                socketService.connect();
                socketService.joinUserRoom(result.user.id);

                // Request notification permission
                socketService.requestNotificationPermission();

                return { success: true };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const register = async (userData) => {
        try {
            const result = await authService.register(userData);
            if (result.success) {
                setUser(result.user);

                // Connect to socket after successful registration
                socketService.connect();
                socketService.joinUserRoom(result.user.id);

                // Request notification permission
                socketService.requestNotificationPermission();

                return { success: true };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        const result = authService.logout();
        if (result.success) {
            // Disconnect socket before clearing user
            if (user?.id) {
                socketService.leaveUserRoom(user.id);
            }
            socketService.disconnect();

            setUser(null);
        }
    };

    const updateUser = (updatedUserData) => {
        const updatedUser = { ...user, ...updatedUserData };
        setUser(updatedUser);

        // Update localStorage with new user data
        const currentData = JSON.parse(localStorage.getItem('farmer_user') || '{}');
        const newData = { ...currentData, ...updatedUserData };
        localStorage.setItem('farmer_user', JSON.stringify(newData));
    };

    const value = {
        user,
        login,
        register,
        logout,
        updateUser,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};