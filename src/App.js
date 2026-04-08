import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Seeds from './pages/Seeds/Seeds';
import Machinery from './pages/Machinery/Machinery';
import Fertilizers from './pages/Fertilizers/Fertilizers';
import SavingsAccount from './pages/SavingsAccount/SavingsAccount';
import Profile from './pages/Profile/Profile';
import Mandi from './pages/Mandi/Mandi';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/app"
                            element={
                                <PrivateRoute>
                                    <Layout />
                                </PrivateRoute>
                            }
                        >
                            <Route index element={<Navigate to="/app/dashboard" replace />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="seeds" element={<Seeds />} />
                            <Route path="machinery" element={<Machinery />} />
                            <Route path="fertilizers" element={<Fertilizers />} />
                            <Route path="savings" element={<SavingsAccount />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="mandi" element={<Mandi />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;