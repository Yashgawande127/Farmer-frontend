import api from './api';

// Authentication Service
export const authService = {
    async login(credentials) {
        try {
            const response = await api.post('/auth/login', credentials);
            const { data } = response.data;

            if (data && data.user && data.token) {
                // Store user data with token
                const userData = { ...data.user, token: data.token };
                localStorage.setItem('farmer_user', JSON.stringify(userData));
                return { success: true, user: userData };
            }

            return { success: false, error: 'Invalid response from server' };
        } catch (error) {
            // Fallback to mock authentication if backend is not available
            if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
                return this.loginMock(credentials);
            }

            return {
                success: false,
                error: error.response?.data?.message || 'Login failed'
            };
        }
    },

    async register(userData) {
        try {
            const response = await api.post('/auth/register', userData);
            const { data } = response.data;

            if (data && data.user && data.token) {
                // Store user data with token
                const newUserData = { ...data.user, token: data.token };
                localStorage.setItem('farmer_user', JSON.stringify(newUserData));
                return { success: true, user: newUserData };
            }

            return { success: false, error: 'Invalid response from server' };
        } catch (error) {
            // Fallback to mock registration if backend is not available
            if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
                return this.registerMock(userData);
            }

            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed'
            };
        }
    },

    async forgotPassword(email) {
        try {
            await api.post('/auth/forgot-password', { email });
            return { success: true, message: 'Password reset email sent' };
        } catch (error) {
            // Fallback to mock if backend is not available
            if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
                return this.forgotPasswordMock(email);
            }

            return {
                success: false,
                error: error.response?.data?.message || 'Password reset failed'
            };
        }
    },

    logout() {
        localStorage.removeItem('farmer_user');
        return { success: true };
    },

    // Mock fallback methods for development
    async loginMock(credentials) {
        const mockUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = mockUsers.find(u => u.email === credentials.email);
        if (!user) {
            return { success: false, error: 'User not found' };
        }

        if (user.password !== credentials.password) {
            return { success: false, error: 'Invalid password' };
        }

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            farmName: user.farmName,
            location: user.location,
            phoneNumber: user.phoneNumber,
            token: 'mock_token_' + Date.now()
        };

        localStorage.setItem('farmer_user', JSON.stringify(userData));
        return { success: true, user: userData };
    },

    async registerMock(userData) {
        const mockUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === userData.email);
        if (existingUser) {
            return { success: false, error: 'User already exists' };
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            password: userData.password,
            farmName: userData.farmName,
            location: userData.location,
            phoneNumber: userData.phoneNumber,
            createdAt: new Date().toISOString()
        };

        mockUsers.push(newUser);
        localStorage.setItem('mock_users', JSON.stringify(mockUsers));

        const userResponse = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            farmName: newUser.farmName,
            location: newUser.location,
            phoneNumber: newUser.phoneNumber,
            token: 'mock_token_' + Date.now()
        };

        localStorage.setItem('farmer_user', JSON.stringify(userResponse));
        return { success: true, user: userResponse };
    },

    async forgotPasswordMock(email) {
        const mockUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');

        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = mockUsers.find(u => u.email === email);
        if (!user) {
            return { success: false, error: 'User not found' };
        }

        return { success: true, message: 'Password reset email sent (mock)' };
    }
};