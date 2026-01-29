import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AppSidebar from '../../components/AppSidebar';
import JobCard from '../../components/JobCard';
import { savedJobAPI } from '../../api/savedJobAPI';
import { FiBookmark, FiLoader } from 'react-icons/fi';

const SavedJobs = () => {
  const { user } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const response = await savedJobAPI.getSavedJobs(currentPage, 9); // 9 jobs per page
        if (response.success) {
          setSavedJobs(response.savedJobs);
          setTotalPages(response.totalPages || 1);
        }
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [user, currentPage]);

  const handleUnsaveJob = async (jobId) => {
    try {
      await savedJobAPI.unsaveJob(jobId);
      // Remove the job from the local state
      setSavedJobs(prev => prev.filter(job => job.jobId._id !== jobId));
      // Update the count if needed
      const newCount = await savedJobAPI.getSavedJobsCount();
      if (newCount.success && newCount.count === 0 && savedJobs.length === 1) {
        // If this was the last job, refresh the page
        window.location.reload();
      }
    } catch (error) {
      console.error('Error unsaving job:', error);
      alert('Failed to unsave job. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0d0d12] text-white flex items-center justify-center">
        <p className="text-gray-400">Please log in to view your saved jobs.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d12] font-sans text-white flex">
      <AppSidebar />
      <div className="flex-1 md:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <FiBookmark className="text-purple-400" />
                Saved Jobs
              </h1>
              <p className="text-gray-400 mt-2">
                {savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-3 text-gray-400">
                <FiLoader className="w-6 h-6 animate-spin" />
                Loading saved jobs...
              </div>
            </div>
          ) : savedJobs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <FiBookmark className="mx-auto h-16 w-16 opacity-50" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No saved jobs</h3>
              <p className="text-gray-400 mb-6">Start saving jobs that interest you!</p>
              <a
                href="/job-search"
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Browse Jobs
              </a>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {savedJobs.map((savedJob) => (
                  <div key={savedJob.jobId._id} className="relative group">
                    <JobCard job={savedJob.jobId} />
                    <button
                      onClick={() => handleUnsaveJob(savedJob.jobId._id)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg cursor-pointer"
                      title="Remove from saved jobs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;