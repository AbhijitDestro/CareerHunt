import React from 'react';
import { FiClock, FiDollarSign } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="group p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-[#6C2BD9]/50 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-2xl ${job.logoColor || 'bg-gray-700'} flex items-center justify-center text-xl font-bold text-black`}>
          {job.company?.[0] || 'C'}
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 border border-white/5">
          {job.time}
        </span>
      </div>

      <Link to={`/jobs/${job.id}`} className="block">
        <h3 className="text-xl font-bold mb-1 group-hover:text-[#6C2BD9] transition-colors text-white">{job.role}</h3>
      </Link>
      <p className="text-gray-400 text-sm mb-6">{job.company} • {job.type}</p>

      <div className="flex flex-wrap gap-2 mb-6 mt-auto">
        {job.tags?.map((tag, i) => (
          <span key={i} className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-400">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex items-center gap-1 text-sm font-medium text-white/90">
          <FiDollarSign className="text-gray-400" />
          {job.salary}
        </div>
        <span className="text-gray-500 text-xs flex items-center gap-1">
          <FiClock /> 2d ago
        </span>
      </div>
    </div>
  );
};

export default JobCard;
