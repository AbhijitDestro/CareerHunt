import React, { useEffect, useState } from 'react';
import { FiUsers, FiBriefcase, FiPlus, FiMoreHorizontal } from 'react-icons/fi';
import axios from 'axios';
import { JOB_API_END_POINT } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RecruiterDashboard = ({ user }) => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
             try {
                // We use user._id for the param, though controller uses req.id from token
                const res = await axios.get(`${JOB_API_END_POINT}/get/user/${user?._id}`, { withCredentials: true });
                if(res.data.success){
                    setJobs(res.data.jobs);
                }
             } catch (error) {
                 console.log(error);
             }
        }
        if(user) fetchJobs();
    }, [user]);

    // Calculate stats
    const totalApplicants = jobs.reduce((acc, job) => acc + (job.applications?.length || 0), 0);
    const activeJobsCount = jobs.length; // Assuming all returned are active for now, or filter by status if available
    const stats = [
        { label: 'Active Jobs', value: activeJobsCount, icon: FiBriefcase, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { label: 'Total Applicants', value: totalApplicants, icon: FiUsers, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        // Shortlisted count would require fetching application statuses, skip for now or make 0
        { label: 'Shortlisted', value: '0', icon: FiUsers, color: 'text-green-400', bg: 'bg-green-500/10' },
    ];

    return (
        <div className="space-y-8">
            {/* Header Actions */}
            <div className="flex justify-between items-center bg-[#6C2BD9] rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white mb-2">Post a new job opportunity</h2>
                    <p className="text-purple-100 mb-6 max-w-lg">Find the best talent for your company with our AI-powered matching system.</p>
                    <div className="flex gap-4">
                        <button onClick={() => navigate('/admin/companies')} className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 transition-colors">
                            <FiBriefcase /> My Companies
                        </button>
                        <button onClick={() => navigate('/admin/jobs/create')} className="px-6 py-3 bg-white text-purple-900 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                            <FiPlus /> Post New Job
                        </button>
                    </div>
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
                                <th className="pb-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {jobs.map(job => (
                                <tr key={job._id} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 font-medium text-white pl-2">{job.title}</td>
                                    <td className="py-4 flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                             {/* Placeholder avatars if needed, otherwise just count */}
                                        </div>
                                        <span onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="ml-2 cursor-pointer text-blue-400 hover:text-blue-300">
                                            {job.applications?.length || 0} Applicants
                                        </span>
                                    </td>
                                    <td className="py-4">{new Date(job.createdAt).toLocaleDateString()}</td>
                                    <td className="py-4"><span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs">Active</span></td>
                                    <td className="py-4 text-right pr-2 space-x-2">
                                        <button onClick={() => navigate(`/admin/jobs/${job._id}/edit`)} className="text-gray-400 hover:text-white" title="Edit Job">
                                            <FiMoreHorizontal size={18} />
                                        </button>
                                        <button onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="text-white bg-purple-600 px-3 py-1 rounded hover:bg-purple-700 text-sm">
                                            Applicants
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {jobs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400 mb-4">No jobs posted yet.</p>
                            <button onClick={() => navigate('/admin/jobs/create')} className="text-purple-400 hover:text-purple-300 font-medium">Post your first job</button>
                        </div>
                     )}
                </div>
             </div>
        </div>
    );
};

export default RecruiterDashboard;
