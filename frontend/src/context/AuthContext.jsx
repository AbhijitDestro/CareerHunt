import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from 'sonner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/me`, {
                withCredentials: true
            });
            if (res.data.success) {
                setUser(res.data.user);
            }
        } catch (error) {
            console.log("Auth check error:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async (navigate) => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                 withCredentials: true
            });
            if (res.data.success) {
                setUser(null);
                toast.success(res.data.message);
                if(navigate) navigate('/login');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
