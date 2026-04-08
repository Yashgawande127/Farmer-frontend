import api from './api';

export const profileService = {
    // Get current user profile
    getProfile: async () => {
        try {
            const response = await api.get('/profile');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update user profile
    updateProfile: async (profileData) => {
        try {
            const response = await api.put('/profile', profileData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update profile image
    updateProfileImage: async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append('profileImage', imageFile);

            const response = await api.put('/profile/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update password
    updatePassword: async (passwordData) => {
        try {
            const response = await api.put('/profile/password', passwordData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update notification preferences
    updateNotificationPreferences: async (preferences) => {
        try {
            const response = await api.put('/profile/notifications', preferences);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete account
    deleteAccount: async (password) => {
        try {
            const response = await api.delete('/profile', {
                data: { password }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get profile statistics
    getProfileStats: async () => {
        try {
            const response = await api.get('/profile/stats');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default profileService;