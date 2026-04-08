import { io } from 'socket.io-client';

class SocketService {
    constructor() {
        this.socket = null;
        this.isConnected = false;
        this.listeners = new Map();
    }

    connect() {
        if (this.socket?.connected) {
            return this.socket;
        }

        const user = JSON.parse(localStorage.getItem('farmer_user') || '{}');
        if (!user.token) {
            console.warn('No auth token found, cannot connect to socket');
            return null;
        }

        this.socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
            auth: {
                token: user.token
            },
            transports: ['websocket', 'polling']
        });

        this.setupEventListeners();
        return this.socket;
    }

    setupEventListeners() {
        if (!this.socket) return;

        this.socket.on('connect', () => {
            console.log('Connected to server');
            this.isConnected = true;
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
            this.isConnected = false;
        });

        this.socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
            this.isConnected = false;
        });

        // Listen for real-time notifications
        this.socket.on('notification', (notification) => {
            this.handleNotification(notification);
        });

        // Listen for inventory updates
        this.socket.on('inventoryUpdate', (data) => {
            this.emit('inventoryUpdate', data);
        });

        // Listen for price updates
        this.socket.on('priceUpdate', (data) => {
            this.emit('priceUpdate', data);
        });

        // Listen for weather alerts
        this.socket.on('weatherAlert', (data) => {
            this.emit('weatherAlert', data);
        });

        // Listen for user activity updates
        this.socket.on('activityUpdate', (activity) => {
            this.emit('activityUpdate', activity);
        });
    }

    handleNotification(notification) {
        // Display notification to user
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(notification.title, {
                body: notification.message,
                icon: '/favicon.ico'
            });
        }

        // Emit to components listening for notifications
        this.emit('notification', notification);
    }

    // Join user-specific room
    joinUserRoom(userId) {
        if (this.socket?.connected) {
            this.socket.emit('joinUserRoom', userId);
        }
    }

    // Leave user-specific room
    leaveUserRoom(userId) {
        if (this.socket?.connected) {
            this.socket.emit('leaveUserRoom', userId);
        }
    }

    // Subscribe to real-time updates for specific seeds
    subscribeSeedUpdates(seedIds) {
        if (this.socket?.connected) {
            this.socket.emit('subscribeSeedUpdates', seedIds);
        }
    }

    // Subscribe to real-time updates for specific fertilizers
    subscribeFertilizerUpdates(fertilizerIds) {
        if (this.socket?.connected) {
            this.socket.emit('subscribeFertilizerUpdates', fertilizerIds);
        }
    }

    // Subscribe to real-time updates for specific machinery
    subscribeMachineryUpdates(machineryIds) {
        if (this.socket?.connected) {
            this.socket.emit('subscribeMachineryUpdates', machineryIds);
        }
    }

    // Send activity update
    sendActivity(activity) {
        if (this.socket?.connected) {
            this.socket.emit('userActivity', activity);
        }
    }

    // Event listener management
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    off(event, callback) {
        if (this.listeners.has(event)) {
            const callbacks = this.listeners.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    emit(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error('Error in socket event callback:', error);
                }
            });
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
            this.listeners.clear();
        }
    }

    // Request notification permission
    async requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }
        return Notification.permission === 'granted';
    }
}

// Create a singleton instance
const socketService = new SocketService();

export default socketService;