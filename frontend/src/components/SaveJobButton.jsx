import React, { useState, useEffect } from 'react';
import { FiBookmark, FiCheck } from 'react-icons/fi';
import { savedJobAPI } from '../api/savedJobAPI';

const SaveJobButton = ({ jobId, size = 'md', showText = false }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    checkIfJobIsSaved();
  }, [jobId]);

  const checkIfJobIsSaved = async () => {
    try {
      setIsLoading(true);
      console.log('Checking if job is saved:', jobId);
      const response = await savedJobAPI.isJobSaved(jobId);
      console.log('Job save status response:', response);
      setIsSaved(response.isSaved);
    } catch (error) {
      console.error('Error checking job save status:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      console.log('Toggling save status for job:', jobId, 'Current state:', isSaved);
      
      if (isSaved) {
        const response = await savedJobAPI.unsaveJob(jobId);
        console.log('Unsave response:', response);
        setIsSaved(false);
      } else {
        const response = await savedJobAPI.saveJob(jobId);
        console.log('Save response:', response);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error toggling job save status:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      console.error('Error status:', error.response?.status);
      
      let errorMessage = 'Failed to save/unsave job. Please try again.';
      if (error.response?.status === 401) {
        errorMessage = 'Please log in to save jobs.';
      } else if (error.response?.status === 404) {
        errorMessage = 'Job not found.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      alert(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24
  };

  if (isLoading) {
    return (
      <button 
        disabled
        className={`${sizeClasses[size]} rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-gray-400 cursor-not-allowed`}
      >
        <FiBookmark size={iconSize[size]} />
      </button>
    );
  }

  return (
    <button
      onClick={handleSaveToggle}
      disabled={isProcessing}
      className={`${sizeClasses[size]} rounded-full border flex items-center justify-center transition-all duration-200 ${
        isSaved 
          ? 'bg-purple-600 border-purple-600 text-white hover:bg-purple-700' 
          : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20 hover:border-white/30'
      } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      title={isSaved ? 'Remove from saved jobs' : 'Save this job'}
    >
      {isProcessing ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : isSaved ? (
        <FiCheck size={iconSize[size]} />
      ) : (
        <FiBookmark size={iconSize[size]} />
      )}
    </button>
  );
};

export default SaveJobButton;