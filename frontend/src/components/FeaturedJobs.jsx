import React from 'react';
import { FiArrowRight, FiClock, FiDollarSign } from 'react-icons/fi';

const FeaturedJobs = () => {
  const jobs = [
    {
      id: 1,
      role: 'Senior Product Designer',
      company: 'Spotify',
      type: 'Remote',
      time: 'Full Time',
      salary: '$120k - $140k',
      tags: ['UI/UX', 'Figma', 'React'],
      logoColor: 'bg-green-500'
    },
    {
      id: 2,
      role: 'Frontend Developer',
      company: 'Linear',
      type: 'Remote',
      time: 'Full Time',
      salary: '$130k - $160k',
      tags: ['React', 'TypeScript', 'Tailwind'],
      logoColor: 'bg-indigo-500'
    },
    {
      id: 3,
      role: 'Marketing Associate',
      company: 'Notion',
      type: 'Hybrid',
      time: 'Full Time',
      salary: '$80k - $100k',
      tags: ['Marketing', 'SEO', 'Content'],
      logoColor: 'bg-gray-100'
    },
  ];

  return (
    <section className="py-20 bg-[#0d0d12] text-white font-sans px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[#6C2BD9] font-medium tracking-wider uppercase text-sm mb-2 block">Featured Jobs</span>
            <h2 className="text-3xl md:text-4xl font-bold">Latest Opportunities</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            View all jobs <FiArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="group p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-[#6C2BD9]/50 transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl ${job.logoColor} flex items-center justify-center text-xl font-bold text-black`}>
                  {job.company[0]}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 border border-white/5">
                  {job.time}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-1 group-hover:text-[#6C2BD9] transition-colors">{job.role}</h3>
              <p className="text-gray-400 text-sm mb-6">{job.company} • {job.type}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.tags.map((tag, i) => (
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
          ))}
        </div>

        <button className="mt-8 mx-auto w-full md:hidden flex items-center justify-center gap-2 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
            View all jobs <FiArrowRight />
        </button>
      </div>
    </section>
  );
};

export default FeaturedJobs;


