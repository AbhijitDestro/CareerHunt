import React from 'react';
import { FiClock, FiDollarSign } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SaveJobButton from './SaveJobButton';

const JobCard = ({ job }) => {
  return (
    <div className="group p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-[#6C2BD9]/50 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-xl font-bold text-black overflow-hidden">
             {job.company?.logo ? <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-cover"/> : job.company?.name?.[0] || 'C'}
        </div>
        <div className="flex items-center gap-2">
          <SaveJobButton jobId={job._id} size="md" />
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 border border-white/5">
            {job.jobType}
          </span>
        </div>
      </div>

      <Link to={`/jobs/${job._id}`} className="block">
        <h3 className="text-xl font-bold mb-1 group-hover:text-[#6C2BD9] transition-colors text-white">{job.title}</h3>
      </Link>
      <p className="text-gray-400 text-sm mb-6">{job.company?.name || 'Company'}</p>

      <div className="flex flex-wrap gap-2 mb-6 mt-auto">
        {/* Render constructed tags from job properties since backend doesn't have 'tags' array yet */}
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
  );
};

export default JobCard;
