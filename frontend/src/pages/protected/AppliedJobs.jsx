import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AppSidebar from '../../components/AppSidebar';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';

const AppliedJobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchAppliedJobs = async () => {
          try {
              const res = await axios.get(`${APPLICATION_API_END_POINT}/get/applied`, { withCredentials: true });
              if(res.data.success){
                  setAppliedJobs(res.data.applications);
              }
          } catch (error) {
              console.log(error);
          } finally {
              setLoading(false);
          }
      };
      if(user) fetchAppliedJobs();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'accepted':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d12] font-sans text-white flex">
      <AppSidebar />
      <div className="flex-1 md:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Applied Jobs</h1>
          <p className="text-gray-400 mt-2">
            Track your job applications and their current status
          </p>
        </div>

        <div className="grid gap-6">
          {loading ? <p className="text-gray-400">Loading...</p> : appliedJobs.map((app) => (
            <div key={app._id} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{app.job?.title || "Job Unavailable"}</h3>
                  <p className="text-gray-300 mb-1">{app.job?.company?.name || "Company Unavailable"}</p>
                  <p className="text-gray-400 mb-3">{app.job?.location}</p>
                  <p className="text-gray-400 text-sm">Salary: {app.job?.salary ? `${app.job.salary} LPA` : 'N/A'}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(app.status)} capitalize`}>
                    {app.status}
                  </span>
                  <p className="text-gray-400 text-sm mt-2">
                    Applied: {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && appliedJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No applications yet</h3>
            <p className="text-gray-400 mb-4">Start applying to jobs to see them here</p>
            <button onClick={() => navigate('/job-search')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
              Browse Jobs
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;

