import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AppSidebar from '../../components/AppSidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { JOB_API_END_POINT } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';

const JobSearch = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [jobType, setJobType] = useState('all');
  const [salaryRange, setSalaryRange] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
      setLoading(true);
      try {
          let query = `?keyword=${searchTerm}&location=${location}`;
          if(jobType !== 'all') query += `&jobType=${jobType}`;
          if(company) query += `&company=${company}`;
          
          if(salaryRange !== 'all') {
              if(salaryRange === '25+') {
                  query += `&minSalary=25`;
              } else {
                  const [min, max] = salaryRange.split('-');
                  if(min) query += `&minSalary=${min}`;
                  if(max) query += `&maxSalary=${max}`;
              }
          }
          
          const res = await axios.get(`${JOB_API_END_POINT}/get${query}`, { withCredentials: true });
          if(res.data.success){
              setJobs(res.data.jobs);
          }
      } catch (error) {
          console.log(error);
          setJobs([]);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const content = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 mt-16 md:mt-0">
          <h1 className="text-3xl font-bold text-white">Job Search</h1>
          <p className="text-gray-400 mt-2">
            Find your next opportunity
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
             {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Title or Keywords</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="e.g. Frontend Developer"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. San Francisco"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>
                <div className="flex items-end">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        Search Jobs
                    </button>
                </div>
            </div>
            
            {/* Row 2 - Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Type</label>
                <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all" className="bg-[#0d0d12]">All Types</option>
                    <option value="full-time" className="bg-[#0d0d12]">Full-time</option>
                    <option value="part-time" className="bg-[#0d0d12]">Part-time</option>
                    <option value="contract" className="bg-[#0d0d12]">Contract</option>
                    <option value="remote" className="bg-[#0d0d12]">Remote</option>
                </select>
                </div>
                 <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Salary Range (LPA)</label>
                <select
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all" className="bg-[#0d0d12]">Any Salary</option>
                    <option value="0-5" className="bg-[#0d0d12]">0 - 5 LPA</option>
                    <option value="5-10" className="bg-[#0d0d12]">5 - 10 LPA</option>
                    <option value="10-15" className="bg-[#0d0d12]">10 - 15 LPA</option>
                     <option value="15-25" className="bg-[#0d0d12]">15 - 25 LPA</option>
                    <option value="25+" className="bg-[#0d0d12]">25+ LPA</option>
                </select>
                </div>
            </div>
          </form>
        </div>

        {/* Search Results */}
        <div className="grid gap-6">
          {loading ? <p className="text-center text-gray-400">Loading jobs...</p> : jobs.map((job) => (
            <div key={job._id} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                  <p className="text-gray-300 mb-1">{job.company?.name}</p>
                  <p className="text-gray-400">{job.location}</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">
                    {job.jobType}
                  </span>
                  <p className="text-gray-400 text-sm mt-2">{new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
             
              <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>
             
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-500/10 text-gray-400 rounded text-sm">
                      {job.experienceLevel}
                    </span>
                    <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded text-sm">
                       Vacancies: {job.vacancies}
                    </span>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold">{job.salary} LPA</p>
                  <button onClick={() => navigate(`/jobs/${job._id}`)} className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    View & Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && jobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No jobs found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search criteria</p>
          </div>
        )}
    </div>
  );

  if (user) {
      return (
        <div className="min-h-screen bg-[#0d0d12] font-sans text-white flex">
            <AppSidebar />
            <div className="flex-1 md:ml-64">
                {content}
            </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#0d0d12] font-sans text-white">
        <Navbar />
        <div className="pt-20">
            {content}
        </div>
        <Footer />
    </div>
  );
};

export default JobSearch;

