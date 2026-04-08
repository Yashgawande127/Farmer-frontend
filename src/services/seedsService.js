import api from './api';

// Seeds Service
export const seedsService = {
    // Get all seeds for the farmer
    async getSeeds(filters = {}) {
        try {
            const params = new URLSearchParams(filters).toString();
            const response = await api.get(`/seeds?${params}`);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch seeds'
            };
        }
    },

    // Add new seed inventory
    async addSeed(seedData) {
        try {
            const response = await api.post('/seeds', seedData);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to add seed'
            };
        }
    },

    // Update seed inventory
    async updateSeed(seedId, seedData) {
        try {
            const response = await api.put(`/seeds/${seedId}`, seedData);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to update seed'
            };
        }
    },

    // Delete seed from inventory
    async deleteSeed(seedId) {
        try {
            await api.delete(`/seeds/${seedId}`);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to delete seed'
            };
        }
    },

    // Sell seeds
    async sellSeed(seedId, quantity, price) {
        try {
            const response = await api.post(`/seeds/${seedId}/sell`, { quantity, price });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to sell seed'
            };
        }
    },

    // Get seed categories
    async getSeedCategories() {
        try {
            const response = await api.get('/seeds/categories');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch categories'
            };
        }
    }
};