import api from './api';

// Fertilizers Service
export const fertilizersService = {
    // Get available fertilizers
    async getFertilizers(filters = {}) {
        try {
            const params = new URLSearchParams(filters).toString();
            const response = await api.get(`/fertilizers?${params}`);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch fertilizers'
            };
        }
    },

    // Get farmer's fertilizer inventory
    async getMyFertilizers() {
        try {
            const response = await api.get('/fertilizers/my-inventory');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch your fertilizers'
            };
        }
    },

    // Purchase fertilizer
    async buyFertilizer(fertilizerId, quantity, paymentMethod = 'cash') {
        try {
            const response = await api.post(`/fertilizers/${fertilizerId}/buy`, {
                quantity,
                paymentMethod
            });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to purchase fertilizer'
            };
        }
    },

    // Use fertilizer from inventory
    async useFertilizer(inventoryId, quantityUsed, fieldLocation) {
        try {
            const response = await api.post(`/fertilizers/inventory/${inventoryId}/use`, {
                quantityUsed,
                fieldLocation
            });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to record fertilizer usage'
            };
        }
    },

    // Get fertilizer usage history
    async getUsageHistory() {
        try {
            const response = await api.get('/fertilizers/usage-history');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch usage history'
            };
        }
    },

    // Get fertilizer recommendations based on crop type
    async getRecommendations(cropType, soilType) {
        try {
            const response = await api.get(`/fertilizers/recommendations?crop=${cropType}&soil=${soilType}`);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch recommendations'
            };
        }
    },

    // Get fertilizer categories
    async getFertilizerCategories() {
        try {
            const response = await api.get('/fertilizers/categories');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch categories'
            };
        }
    },

    // Get purchase history
    async getPurchaseHistory() {
        try {
            const response = await api.get('/fertilizers/purchases');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch purchase history'
            };
        }
    }
};