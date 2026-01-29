import React, { useEffect, useState } from 'react';
import { FiBriefcase, FiBookmark } from 'react-icons/fi';
import JobCard from '../../components/JobCard';
import { FaRegThumbsUp } from "react-icons/fa6";
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../../utils/constant';
import { savedJobAPI } from '../../api/savedJobAPI';

const CandidateDashboard = ({ user }) => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [recommendedJobs, setRecommendedJobs] = useState([]);
    const [savedJobsCount, setSavedJobsCount] = useState(0);
    const [accepted, setAccepted]=useState(0)
    
    useEffect(() => {
        const fetchApplied = async () => {
             try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get/applied`, { withCredentials: true });
                if(res.data.success){
                    setAppliedJobs(res.data.applications);
                    setAccepted(res.data.applications.filter(app => app.status === 'accepted').length);
                }
             } catch (error) {
                 console.log(error);
             }
        }
        
        const fetchRecommended = async () => {
            try {
                // Fetch latest jobs
                const res = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true });
                if(res.data.success){
                    setRecommendedJobs(res.data.jobs.slice(0, 3));
                }
            } catch (error) {
                console.log(error);
            }
        }

        const fetchSavedJobsCount = async () => {
            try {
                const response = await savedJobAPI.getSavedJobsCount();
                if (response.success) {
                    setSavedJobsCount(response.count);
                }
            } catch (error) {
                console.log('Error fetching saved jobs count:', error);
            }
        }

        if(user) {
            fetchApplied();
            fetchRecommended();
            fetchSavedJobsCount();
        }
    }, [user]);

    // Calculate acceptance rate percentage
    const acceptanceRate = appliedJobs.length > 0 ? Math.round((accepted / appliedJobs.length) * 100) : 0;

    // Stats
    const stats = [
        { label: 'Applied Jobs', value: appliedJobs.length, icon: FiBriefcase, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Saved Jobs', value: savedJobsCount, icon: FiBookmark, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { label: 'Got Acceptance Rate', value: `${acceptanceRate}%`, icon: FaRegThumbsUp , color: 'text-green-400', bg: 'bg-green-500/10' },
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

            {/* Recommended Section (Static/Placeholder) */}
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

             {/* Recent Activity Table (Real Data) */}
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
                            {appliedJobs.slice(0, 5).map(app => (
                                <tr key={app._id}>
                                    <td className="py-4 font-medium text-white">{app.job?.company?.name || "N/A"}</td>
                                    <td className="py-4">{app.job?.title || "N/A"}</td>
                                    <td className="py-4">{new Date(app.createdAt).toLocaleDateString()}</td>
                                    <td className="py-4"><span className={`px-2 py-1 rounded text-xs capitalize ${app.status === 'accepted' ? 'bg-green-500/10 text-green-400' : app.status === 'rejected' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{app.status}</span></td>
                                </tr>
                            ))}
                             {appliedJobs.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="py-4 text-center">No applications yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
             </div>
        </div>
    );
};

export default CandidateDashboard;
