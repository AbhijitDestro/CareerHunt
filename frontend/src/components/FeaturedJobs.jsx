import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiClock, FiDollarSign } from 'react-icons/fi';
import axios from 'axios';
import { PUBLIC_JOB_API_END_POINT } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
     const fetchJobs = async () => {
         try {
             const res = await axios.get(`${PUBLIC_JOB_API_END_POINT}/get`);
             if(res.data.success && res.data.jobs.length > 0){
                 // Shuffle array and take first 6 jobs
                 const shuffledJobs = [...res.data.jobs].sort(() => 0.5 - Math.random());
                 setJobs(shuffledJobs.slice(0, 6));
             }
         } catch (error) {
             console.log(error);
         }
     }
     fetchJobs();
  }, []);

  return (
    <section className="py-20 bg-[#0d0d12] text-white font-sans px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[#0c8ede] font-medium tracking-wider uppercase text-sm mb-2 block">Featured Jobs</span>
            <h2 className="text-3xl md:text-4xl font-bold">Latest Opportunities</h2>
          </div>
          <button onClick={() => navigate('/jobs')} className="hidden md:flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            View all jobs <FiArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} onClick={() => {
              if (!user) {
                navigate('/signin');
                return;
              }
              navigate(`/jobs/${job._id}`);
            }} className="cursor-pointer group p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-[#0c8ede]/50 transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-start mb-6">
                 <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-xl font-bold text-black overflow-hidden">
                    {job.company?.logo ? <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-cover"/> : job.company?.name?.[0]}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 border border-white/5">
                  {job.jobType}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-1 group-hover:text-[#0c8ede] transition-colors">{job.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{job.company?.name || 'Company'} • {job.jobType}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {/* Dynamically showing some tags if available, else standard ones */}
                 <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-400">
                    {job.experienceLevel}
                 </span>
                 <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-400">
                    Vacancies: {job.vacancies}
                 </span>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-1 text-sm font-medium text-white/90">
                  <FiDollarSign className="text-gray-400" />
                  {job.salary} LPA
                </div>
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  <FiClock /> {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
          {jobs.length === 0 && <p className="text-gray-400 col-span-3 text-center">No featured jobs available at the moment.</p>}
        </div>

        <button onClick={() => navigate('/jobs')} className="mt-8 mx-auto w-full md:hidden flex items-center justify-center gap-2 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors cursor-pointer">
            View all jobs <FiArrowRight />
        </button>
      </div>
    </section>
  );
};

export default FeaturedJobs;


