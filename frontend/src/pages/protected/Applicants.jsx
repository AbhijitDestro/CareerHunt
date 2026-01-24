import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import AppSidebar from '../../components/AppSidebar';
import { toast } from 'sonner';

const Applicants = () => {
    const { id } = useParams();
    const [applicants, setApplicants] = useState([]);
    
    // Status Options
    const statusOptions = ["Pending", "Accepted", "Rejected"];

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get/${id}`, { withCredentials: true });
                if(res.data.success){
                    setApplicants(res.data.applications);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data?.message || 'Error fetching applicants');
            }
        }
        fetchApplicants();
    }, [id]);

    const statusHandler = async (status, applicationId) => {
        try {
            const res = await axios.put(`${APPLICATION_API_END_POINT}/update/${applicationId}`, { status }, { withCredentials: true });
            if(res.data.success){
                 toast.success(res.data.message);
                 // update local state
                 setApplicants(prev => prev.map(app => app._id === applicationId ? {...app, status: status.toLowerCase()} : app));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Error updating status');
        }
    }

    return (
        <div className="min-h-screen bg-[#0d0d12] font-sans text-white flex">
            <AppSidebar />
            <div className="flex-1 md:ml-64">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                     <h1 className="text-2xl font-bold mb-6">Applicants ({applicants.length})</h1>
                     <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5 overflow-x-auto">
                        <table className="w-full text-left text-gray-400 text-sm">
                            <thead className="text-xs uppercase text-gray-500 border-b border-white/10">
                                <tr>
                                    <th className="pb-4">Full Name</th>
                                    <th className="pb-4">Email</th>
                                    <th className="pb-4">Contact</th>
                                    <th className="pb-4">Resume</th>
                                    <th className="pb-4">Date</th>
                                    <th className="pb-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {applicants.map(app => (
                                    <tr key={app._id} className="group hover:bg-white/5 transition-colors">
                                        <td className="py-4 text-white pl-2">{app.applicant?.fullname}</td>
                                        <td className="py-4">{app.applicant?.email}</td>
                                        <td className="py-4">{app.applicant?.phoneNumber || "N/A"}</td>
                                        <td className="py-4">
                                            {app.applicant?.profile?.resume ? 
                                                <a href={app.applicant.profile.resume} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                                    {app.applicant.profile.resumeOriginalName || "View Resume"}
                                                </a> 
                                                : <span className="text-gray-600">No Resume</span>}
                                        </td>
                                         <td className="py-4">{new Date(app.createdAt).toLocaleDateString()}</td>
                                        <td className="py-4 text-right pr-2">
                                            {/* Status Dropdown */}
                                            <div className="flex justify-end gap-2 items-center">
                                                <select 
                                                    value={app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : "Pending"}
                                                    onChange={(e) => statusHandler(e.target.value, app._id)}
                                                    className="bg-[#0d0d12] border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none"
                                                >
                                                    {statusOptions.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                         {applicants.length === 0 && <div className="text-center py-4">No applicants found.</div>}
                     </div>
                </div>
            </div>
        </div>
    );
};

export default Applicants;
