import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiDollarSign, FiMapPin, FiBriefcase, FiCheck } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { APPLICATION_API_END_POINT, PUBLIC_JOB_API_END_POINT } from '../utils/constant';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${PUBLIC_JOB_API_END_POINT}/get/${id}`);
                if(res.data.success){
                    setJob(res.data.job);
                    // Check if already applied. Since the backend might not return this status directly for public endpoint,
                    // we rely on the apply action to tell us or we could fetch user's applications. 
                    // However, let's fetch 'getAppliedJobs' to check status if user is logged in.
                    if(user) {
                        try {
                             const appRes = await axios.get(`${APPLICATION_API_END_POINT}/get/applied`, { withCredentials: true });
                             if(appRes.data.success){
                                 const applied = appRes.data.applications.some(app => app.job?._id === id || app.job === id);
                                 setIsApplied(applied);
                             }
                        } catch (e) {
                            console.log("Could not check application status", e);
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchJob();
    }, [id, user]);

    const applyJobHandler = async () => {
        if(!user){
             navigate('/signin');
             return;
        }
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${id}`, {}, { withCredentials: true });
            if(res.data.success){
                setIsApplied(true);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        }
    }

    if (loading) return <div className="min-h-screen bg-[#0d0d12] flex items-center justify-center text-white">Loading...</div>;
    if (!job) return <div className="min-h-screen bg-[#0d0d12] flex items-center justify-center text-white">Job not found</div>;

    return (
        <div className="bg-[#0d0d12] min-h-screen text-white">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
                <Link to="/job-search" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <FiArrowLeft className="mr-2" /> Back to Jobs
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header */}
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5">
                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                                <div className="flex items-center gap-4">
                                     <div className={`w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-2xl font-bold text-black overflow-hidden`}>
                                        {job.company?.logo ? <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-cover" /> : job.company?.name[0]}
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold mb-1">{job.title}</h1>
                                        <p className="text-gray-400 text-lg">{job.company?.name}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                   {/* Actions could go here */}
                                </div>
                             </div>

                             <div className="flex flex-wrap gap-4 text-sm text-gray-300 border-t border-white/5 pt-6">
                                 <span className="flex items-center gap-2"><FiMapPin className="text-purple-400" /> {job.location}</span>
                                 <span className="flex items-center gap-2"><FiBriefcase className="text-blue-400" /> {job.jobType}</span>
                                 <span className="flex items-center gap-2"><FiDollarSign className="text-green-400" /> {job.salary} LPA</span>
                                 <span className="flex items-center gap-2"><FiClock className="text-orange-400" /> {new Date(job.createdAt).toLocaleDateString()}</span>
                             </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5 prose prose-invert max-w-none">
                            <h2 className="text-2xl font-bold mb-4">Job Description</h2>
                            <p className="text-gray-300 mb-6 whitespace-pre-line">{job.description}</p>
                            
                            <h3 className="text-xl font-bold mb-3">Requirements</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                                {job.requirements?.map((req, idx) => (
                                    <li key={idx} className="marker:text-purple-500">{req}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/5 sticky top-24">
                            <h3 className="text-xl font-bold mb-6">Apply for this job</h3>
                            <button 
                                onClick={applyJobHandler}
                                disabled={isApplied}
                                className={`w-full py-4 rounded-xl font-bold text-white transition-colors shadow-lg shadow-purple-900/20 mb-4 ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#6C2BD9] hover:bg-[#5b23b5]'}`}
                            >
                                {isApplied ? 'Already Applied' : 'Apply Now'}
                            </button>
                            
                             <div className="mt-8">
                                <h4 className="font-bold text-white mb-4">Job Details</h4>
                                <ul className="space-y-3">
                                     <li className="flex items-center gap-3 text-gray-300 text-sm">
                                         <span className="text-gray-500">Experience:</span> {job.experienceLevel}
                                     </li>
                                     <li className="flex items-center gap-3 text-gray-300 text-sm">
                                         <span className="text-gray-500">Vacancies:</span> {job.vacancies}
                                     </li>
                                     <li className="flex items-center gap-3 text-gray-300 text-sm">
                                         <span className="text-gray-500">Deadline:</span> {new Date(job.applicationDeadline).toLocaleDateString()}
                                     </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default JobDetails;
