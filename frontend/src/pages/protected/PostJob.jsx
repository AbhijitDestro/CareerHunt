import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT, COMPANY_API_END_POINT } from '../../utils/constant';
import AppSidebar from '../../components/AppSidebar';
import { toast } from 'sonner';

const PostJob = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // For edit mode
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    
    // Form Input
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "full-time",
        experienceLevel: "entry-level",
        vacancies: 1,
        applicationDeadline: "",
        company: ""
    });

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if(res.data.success){
                    setCompanies(res.data.companies);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    }, []);

    // Fetch existing job details if editing
    useEffect(() => {
        if(id) {
            const fetchJob = async () => {
                 try {
                     const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, { withCredentials: true });
                     if(res.data.success){
                         const job = res.data.job;
                         setInput({
                             title: job.title,
                             description: job.description,
                             requirements: job.requirements?.join(',') || "",
                             salary: job.salary,
                             location: job.location,
                             jobType: job.jobType,
                             experienceLevel: job.experienceLevel,
                             vacancies: job.vacancies,
                             applicationDeadline: job.applicationDeadline.split('T')[0],
                             company: job.company?._id || job.company
                         });
                     }
                 } catch (error) {
                     console.log(error);
                     toast.error("Failed to fetch job details");
                 }
            }
            fetchJob();
        }
    }, [id]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let res;
            if(id){
                res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, input, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            } else {
                res = await axios.post(`${JOB_API_END_POINT}/create`, input, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            }

            if(res.data.success){
                toast.success(res.data.message);
                navigate("/dashboard"); 
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    if(companies.length === 0 && !loading) {
        return (
            <div className="min-h-screen bg-[#0d0d12] font-sans text-white flex">
                <AppSidebar />
                <div className="flex-1 md:ml-64 flex items-center justify-center p-8">
                     <div className="text-center max-w-md">
                         <h2 className="text-2xl font-bold mb-4">No Companies Found</h2>
                         <p className="text-gray-400 mb-6">You need to register a company before you can post a job.</p>
                         <button onClick={() => navigate('/admin/companies/create')} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold">Register Company</button>
                     </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0d0d12] font-sans text-white flex">
            <AppSidebar />
            <div className="flex-1 md:ml-64">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                     <h1 className="text-2xl font-bold mb-8">{id ? 'Edit Job' : 'Post a New Job'}</h1>
                     
                     <form onSubmit={submitHandler} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Job Title</label>
                                <input type="text" name="title" value={input.title} onChange={changeEventHandler} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Select Company</label>
                                <select name="company" value={input.company} onChange={changeEventHandler} className="w-full bg-[#0d0d12] bg-opacity-50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" required disabled={!!id}>
                                    <option value="" disabled>Select a company</option>
                                    {companies.map(comp => (
                                        <option key={comp._id} value={comp._id} className="bg-[#0d0d12]">{comp.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                                <input type="text" name="location" value={input.location} onChange={changeEventHandler} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Salary (LPA/Year)</label>
                                <input type="number" name="salary" value={input.salary} onChange={changeEventHandler} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" required />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Experience Level</label>
                                <select name="experienceLevel" value={input.experienceLevel} onChange={changeEventHandler} className="w-full bg-[#0d0d12] bg-opacity-50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500">
                                    <option value="entry-level" className="bg-[#0d0d12]">Entry Level</option>
                                    <option value="mid-level" className="bg-[#0d0d12]">Mid Level</option>
                                    <option value="senior-level" className="bg-[#0d0d12]">Senior Level</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Job Type</label>
                                <select name="jobType" value={input.jobType} onChange={changeEventHandler} className="w-full bg-[#0d0d12] bg-opacity-50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500">
                                    <option value="full-time" className="bg-[#0d0d12]">Full Time</option>
                                    <option value="part-time" className="bg-[#0d0d12]">Part Time</option>
                                    <option value="contract" className="bg-[#0d0d12]">Contract</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">No of Vacancies</label>
                                <input type="number" name="vacancies" value={input.vacancies} onChange={changeEventHandler} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" required />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Application Deadline</label>
                                <input type="date" name="applicationDeadline" value={input.applicationDeadline} onChange={changeEventHandler} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                            <textarea name="description" rows="4" value={input.description} onChange={changeEventHandler} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" required></textarea>
                        </div>
                        
                         <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Requirements / Qualifications (comma separated)</label>
                             <textarea name="requirements" rows="4" value={input.requirements} onChange={changeEventHandler} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" placeholder="React, Node, MongoDB etc..." required></textarea>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button type="button" onClick={() => navigate('/dashboard')} className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">Cancel</button>
                            <button type="submit" disabled={loading} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-colors">
                                {loading ? 'Saving...' : (id ? 'Update Job' : 'Post Job')}
                            </button>
                        </div>
                     </form>
                </div>
            </div>
        </div>
    );
};

export default PostJob;
