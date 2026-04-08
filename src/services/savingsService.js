import api from './api';

// Savings Account Service
export const savingsService = {
    // Get account balance and details
    async getAccountDetails() {
        try {
            const response = await api.get('/savings/account');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch account details'
            };
        }
    },

    // Deposit money
    async deposit(amount, description = '') {
        try {
            const response = await api.post('/savings/deposit', { amount, description });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to deposit money'
            };
        }
    },

    // Withdraw money
    async withdraw(amount, description = '') {
        try {
            const response = await api.post('/savings/withdraw', { amount, description });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to withdraw money'
            };
        }
    },

    // Transfer money (to another farmer or vendor)
    async transfer(recipientId, amount, description = '') {
        try {
            const response = await api.post('/savings/transfer', {
                recipientId,
                amount,
                description
            });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to transfer money'
            };
        }
    },

    // Get transaction history
    async getTransactions(filters = {}) {
        try {
            const params = new URLSearchParams(filters).toString();
            const response = await api.get(`/savings/transactions?${params}`);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch transactions'
            };
        }
    },

    // Set savings goal
    async setSavingsGoal(goalAmount, targetDate, description = '') {
        try {
            const response = await api.post('/savings/goal', {
                goalAmount,
                targetDate,
                description
            });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to set savings goal'
            };
        }
    },

    // Get savings goals
    async getSavingsGoals() {
        try {
            const response = await api.get('/savings/goals');
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch savings goals'
            };
        }
    },

    // Calculate interest earned
    async getInterestCalculation(amount, duration) {
        try {
            const response = await api.get(`/savings/interest-calculation?amount=${amount}&duration=${duration}`);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to calculate interest'
            };
        }
    },

    // Get account statement
    async getStatement(startDate, endDate) {
        try {
            const response = await api.get(`/savings/statement?start=${startDate}&end=${endDate}`);
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to generate statement'
            };
        }
    }
};