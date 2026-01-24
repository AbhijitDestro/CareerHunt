import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import AppSidebar from '../../components/AppSidebar';
import { FiPlus, FiEdit2 } from 'react-icons/fi';
import { toast } from 'sonner';

const Companies = () => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);

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

    return (
        <div className="min-h-screen bg-[#0d0d12] font-sans text-white flex">
            <AppSidebar />
            <div className="flex-1 md:ml-64">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                     <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">My Companies</h1>
                        <button onClick={() => navigate('/admin/companies/create')} className="px-4 py-2 bg-white text-purple-900 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                            <FiPlus /> Register Company
                        </button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {companies.map(company => (
                            <div key={company._id} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/5 flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                                        {company.logo ? (
                                            <img src={company.logo} alt={company.name} className="w-full h-full object-cover"/>
                                        ) : (
                                            <span className="text-2xl font-bold text-gray-400">{company.name[0]}</span>
                                        )}
                                    </div>
                                    <button onClick={() => navigate(`/admin/companies/${company._id}`)} className="text-gray-400 hover:text-white p-2">
                                        <FiEdit2 />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{company.name}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-2">{company.description}</p>
                                </div>
                                <div className="mt-auto pt-4 border-t border-white/10 text-sm text-gray-500">
                                    {new Date(company.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                     </div>
                     
                     {companies.length === 0 && (
                        <div className="text-center py-12 bg-white/5 rounded-3xl border border-white/5">
                            <p className="text-gray-400 mb-4">You haven't registered any companies yet.</p>
                            <button onClick={() => navigate('/admin/companies/create')} className="text-purple-400 hover:text-purple-300">Register your first company</button>
                        </div>
                     )}
                </div>
            </div>
        </div>
    );
};

export default Companies;
