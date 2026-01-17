import React from 'react';
import { FiBriefcase, FiBookmark, FiMessageSquare, FiSearch } from 'react-icons/fi';
import JobCard from '../../components/JobCard';

const CandidateDashboard = ({ user }) => {
    // Mock Data
    const stats = [
        { label: 'Applied Jobs', value: '12', icon: FiBriefcase, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Saved Jobs', value: '5', icon: FiBookmark, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { label: 'Interviews', value: '3', icon: FiMessageSquare, color: 'text-green-400', bg: 'bg-green-500/10' },
    ];

    const recommendedJobs = [
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
            role: 'UX Researcher',
            company: 'Airbnb',
            type: 'Remote',
            time: 'Contract',
            salary: '$90k - $110k',
            tags: ['Research', 'User Testing'],
            logoColor: 'bg-pink-500'
        },
    ];

    return (
        <div className="space-y-8">
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

            {/* Recommended Section */}
            <div>
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Recommended for you</h2>
                    <button className="text-purple-400 text-sm hover:text-purple-300">View All</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {recommendedJobs.map(job => (
                         <JobCard key={job.id} job={job} />
                     ))}
                 </div>
            </div>

             {/* Recent Activity Table (Simplified) */}
             <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5">
                <h3 className="text-xl font-bold text-white mb-6">Recent Applications</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-400 text-sm">
                        <thead className="text-xs uppercase text-gray-500 border-b border-white/10">
                            <tr>
                                <th className="pb-4">Company</th>
                                <th className="pb-4">Role</th>
                                <th className="pb-4">Date Applied</th>
                                <th className="pb-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                             <tr>
                                 <td className="py-4 font-medium text-white">Spotify</td>
                                 <td className="py-4">Senior Product Designer</td>
                                 <td className="py-4">2 days ago</td>
                                 <td className="py-4"><span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-400 text-xs">In Review</span></td>
                             </tr>
                              <tr>
                                 <td className="py-4 font-medium text-white">Linear</td>
                                 <td className="py-4">Frontend Developer</td>
                                 <td className="py-4">5 days ago</td>
                                 <td className="py-4"><span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs">Interview</span></td>
                             </tr>
                        </tbody>
                    </table>
                </div>
             </div>
        </div>
    );
};

export default CandidateDashboard;
