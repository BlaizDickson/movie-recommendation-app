import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';

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
    const [error, setError] = useState(null);

    // Check if user is logged in on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            loadUser();
        } else {
            setLoading(false);
        }
    }, []);

    // Load user profile
    const loadUser = async () => {
        try {
            const response = await authAPI.getProfile();
            setUser(response.data.data);
            setError(null);
        } catch (err) {
            console.error('Load user error:', err);
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Register
    const register = async (userData) => {
        try {
            setError(null);
            const response = await authAPI.register(userData);
            const { token, ...userInfo } = response.data.data;
            
            localStorage.setItem('token', token);
            setUser(userInfo);
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            setError(message);
            return { success: false, error: message };
        }
    };

// Login
const login = async (credentials) => {
    try {
        setError(null);
        const response = await authAPI.login(credentials);
        console.log('Full login response:', response.data); // DEBUG
        
        const { token, ...userInfo } = response.data.data;
        
        console.log('Token:', token); // DEBUG
        console.log('User info:', userInfo); // DEBUG
        
        localStorage.setItem('token', token);
        setUser(userInfo);
        return { success: true };
    } catch (err) {
        console.error('Login error:', err); // DEBUG
        const message = err.response?.data?.message || 'Login failed';
        setError(message);
        return { success: false, error: message };
    }
};

    // Logout
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setError(null);
    };

    const value = {
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;