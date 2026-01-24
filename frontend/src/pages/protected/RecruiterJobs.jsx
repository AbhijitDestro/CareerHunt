import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '../../utils/constant';
import AppSidebar from '../../components/AppSidebar';
import { FiPlus, FiBriefcase, FiUsers, FiMoreHorizontal } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const RecruiterJobs = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [filterJobs, setFilterJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
             try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/user/${user?._id}`, { withCredentials: true });
                if(res.data.success){
                    setJobs(res.data.jobs);
                    setFilterJobs(res.data.jobs);
                }
             } catch (error) {
                 console.log(error);
             }
        }
        if(user) fetchJobs();
    }, [user]);

    useEffect(() => {
        const filtered = jobs.filter(job => 
            job.title.toLowerCase().includes(search.toLowerCase()) || 
            job.company?.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilterJobs(filtered);
    }, [search, jobs]);

    return (
        <div className="min-h-screen bg-[#0d0d12] font-sans text-white flex">
            <AppSidebar />
            <div className="flex-1 md:ml-64">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                     <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">My Jobs</h1>
                        <button onClick={() => navigate('/admin/jobs/create')} className="px-4 py-2 bg-white text-purple-900 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                            <FiPlus /> Post New Job
                        </button>
                     </div>

                     {/* Search Filter */}
                     <div className="mb-6">
                        <input 
                            type="text" 
                            placeholder="Filter by job title or company..." 
                            className="w-full md:w-1/3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                     </div>

                     <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5 overflow-x-auto">
                        <table className="w-full text-left text-gray-400 text-sm">
                            <thead className="text-xs uppercase text-gray-500 border-b border-white/10">
                                <tr>
                                    <th className="pb-4">Job Title</th>
                                    <th className="pb-4">Company</th>
                                    <th className="pb-4">Applicants</th>
                                    <th className="pb-4">Posted</th>
                                    <th className="pb-4">Status</th>
                                    <th className="pb-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filterJobs.map(job => (
                                    <tr key={job._id} className="group hover:bg-white/5 transition-colors">
                                        <td className="py-4 font-medium text-white pl-2">{job.title}</td>
                                        <td className="py-4">{job.company?.name}</td>
                                        <td className="py-4 flex items-center gap-2">
                                            <span onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="cursor-pointer text-blue-400 hover:text-blue-300 flex items-center gap-1">
                                                <FiUsers />
                                                {job.applications?.length || 0}
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
                        {filterJobs.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-400 mb-4">{jobs.length === 0 ? "No jobs posted yet." : "No jobs match your search."}</p>
                                {jobs.length === 0 && (
                                    <button onClick={() => navigate('/admin/jobs/create')} className="text-purple-400 hover:text-purple-300 font-medium">Post your first job</button>
                                )}
                            </div>
                        )}
                     </div>
                </div>
            </div>
        </div>
    );
};

export default RecruiterJobs;
