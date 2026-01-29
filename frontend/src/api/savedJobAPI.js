import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const savedJobAPI = {
  // Save a job
  saveJob: async (jobId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/save`, 
        { jobId }, 
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Error saving job:', error);
      throw error;
    }
  },

  // Unsave a job
  unsaveJob: async (jobId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/unsave/${jobId}`, 
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Error unsaving job:', error);
      throw error;
    }
  },

  // Get all saved jobs
  getSavedJobs: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/get`, 
        { 
          params: { page, limit },
          withCredentials: true 
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      throw error;
    }
  },

  // Get saved jobs count
  getSavedJobsCount: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/count`, 
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching saved jobs count:', error);
      throw error;
    }
  },

  // Check if a specific job is saved
  isJobSaved: async (jobId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/is-saved/${jobId}`, 
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Error checking job save status:', error);
      throw error;
    }
  }
};