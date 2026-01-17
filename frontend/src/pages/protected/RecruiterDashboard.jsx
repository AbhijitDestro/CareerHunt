import React from 'react';
import { FiUsers, FiBriefcase, FiPlus, FiMoreHorizontal } from 'react-icons/fi';

const RecruiterDashboard = ({ user }) => {
    // Mock Data
    const stats = [
        { label: 'Active Jobs', value: '4', icon: FiBriefcase, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { label: 'Total Applicants', value: '148', icon: FiUsers, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Shortlisted', value: '24', icon: FiUsers, color: 'text-green-400', bg: 'bg-green-500/10' },
    ];

    const activeJobs = [
        { id: 1, title: 'Senior Product Designer', applicants: 45, status: 'Active', posted: '2d ago' },
        { id: 2, title: 'Frontend Developer', applicants: 32, status: 'Active', posted: '5d ago' },
        { id: 3, title: 'Marketing Intern', applicants: 71, status: 'Closing Soon', posted: '1w ago' },
    ];

    return (
        <div className="space-y-8">
            {/* Header Actions */}
            <div className="flex justify-between items-center bg-[#6C2BD9] rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white mb-2">Post a new job opportunity</h2>
                    <p className="text-purple-100 mb-6 max-w-lg">Find the best talent for your company with our AI-powered matching system.</p>
                    <button className="px-6 py-3 bg-white text-purple-900 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                        <FiPlus /> Post New Job
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/5 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                            <stat.icon className="text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

             {/* Recent Job Postings Table */}
             <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Active Listings</h3>
                    <button className="text-purple-400 text-sm hover:text-purple-300">View All</button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-400 text-sm">
                        <thead className="text-xs uppercase text-gray-500 border-b border-white/10">
                            <tr>
                                <th className="pb-4">Job Title</th>
                                <th className="pb-4">Applicants</th>
                                <th className="pb-4">Posted</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {activeJobs.map(job => (
                                <tr key={job.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 font-medium text-white pl-2">{job.title}</td>
                                    <td className="py-4 flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-600 border border-[#0d0d12]"></div>)}
                                        </div>
                                        <span className="ml-2">+{job.applicants - 3}</span>
                                    </td>
                                    <td className="py-4">{job.posted}</td>
                                    <td className="py-4"><span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs">{job.status}</span></td>
                                    <td className="py-4 text-right pr-2">
                                        <button className="text-gray-500 hover:text-white"><FiMoreHorizontal size={20}/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>
        </div>
    );
};

export default RecruiterDashboard;
