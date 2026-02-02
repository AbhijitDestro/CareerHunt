import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from 'sonner';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
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
        localStorage.removeItem('token');
        toast.success(res.data.message);
        if (navigate) navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const updateProfile = async (profileData) => {
    try {
      let dataToSend = profileData;
      let headers = {
        'Content-Type': 'application/json'
      };

      const hasFiles = profileData.profilePhoto || profileData.resume;

      if (hasFiles) {
        const formData = new FormData();

        Object.keys(profileData).forEach(key => {
          if (key !== 'profilePhoto' && key !== 'resume') {
            if (Array.isArray(profileData[key])) {
              formData.append(key, JSON.stringify(profileData[key]));
            } else {
              formData.append(key, profileData[key]);
            }
          }
        });

        if (profileData.profilePhoto) {
          formData.append('profilePhoto', profileData.profilePhoto);
        }
        if (profileData.resume) {
          formData.append('resume', profileData.resume);
        }

        dataToSend = formData;
        headers = {};
      }

      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, dataToSend, {
        withCredentials: true,
        headers: headers
      });

      if (res.data.success) {
        setUser(res.data.user);
        toast.success(res.data.message || "Profile updated successfully!");
        return { success: true, message: res.data.message, user: res.data.user };
      }
    } catch (error) {
      console.log("Profile update error:", error);
      toast.error(error.response?.data?.message || "Profile update failed");
      return { success: false, message: error.response?.data?.message || "Profile update failed" };
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
