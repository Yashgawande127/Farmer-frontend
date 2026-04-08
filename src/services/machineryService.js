import api from './api';

// Machinery Service
export const machineryService = {
    // Get available machinery for purchase/rent
    async getMachinery(filters = {}) {
        try {
            const params = new URLSearchParams(filters).toString();
            const response = await api.get(`/machinery?${params}`);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch machinery'
            };
        }
    },

    // Get farmer's owned machinery
    async getMyMachinery() {
        try {
            const response = await api.get('/machinery/my-equipment');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch your machinery'
            };
        }
    },

    // Buy machinery
    async buyMachinery(machineryId, paymentMethod = 'cash') {
        try {
            const response = await api.post(`/machinery/${machineryId}/buy`, { paymentMethod });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to purchase machinery'
            };
        }
    },

    // Rent machinery
    async rentMachinery(machineryId, startDate, endDate, paymentMethod = 'cash') {
        try {
            const response = await api.post(`/machinery/${machineryId}/rent`, {
                startDate,
                endDate,
                paymentMethod
            });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to rent machinery'
            };
        }
    },

    // Get rental history
    async getRentalHistory() {
        try {
            const response = await api.get('/machinery/rentals');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch rental history'
            };
        }
    },

    // Add personal machinery to inventory
    async addMachinery(machineryData) {
        try {
            const response = await api.post('/machinery/add-personal', machineryData);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to add machinery'
            };
        }
    },

    // Update machinery details
    async updateMachinery(machineryId, machineryData) {
        try {
            const response = await api.put(`/machinery/${machineryId}`, machineryData);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to update machinery'
            };
        }
    },

    // Get machinery categories
    async getMachineryCategories() {
        try {
            const response = await api.get('/machinery/categories');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch categories'
            };
        }
    }
};