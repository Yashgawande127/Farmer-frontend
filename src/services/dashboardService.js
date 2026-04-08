import api from './api';

// Dashboard Service
export const dashboardService = {
    // Get dashboard overview data
    async getDashboardData() {
        try {
            const response = await api.get('/dashboard');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch dashboard data'
            };
        }
    },

    // Get recent activities
    async getRecentActivities(limit = 10) {
        try {
            const response = await api.get(`/dashboard/activities?limit=${limit}`);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch recent activities'
            };
        }
    },

    // Get financial summary
    async getFinancialSummary() {
        try {
            const response = await api.get('/dashboard/financial-summary');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch financial summary'
            };
        }
    },

    // Get inventory overview
    async getInventoryOverview() {
        try {
            const response = await api.get('/dashboard/inventory-overview');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch inventory overview'
            };
        }
    },

    // Get weather information
    async getWeatherInfo(location) {
        try {
            const response = await api.get(`/dashboard/weather?location=${location}`);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch weather information'
            };
        }
    },

    // Get market prices
    async getMarketPrices() {
        try {
            const response = await api.get('/dashboard/market-prices');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch market prices'
            };
        }
    }
};