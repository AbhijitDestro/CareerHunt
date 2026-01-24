import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import AppSidebar from '../../components/AppSidebar';
import { toast } from 'sonner';
import { FiUpload } from 'react-icons/fi';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // If id exists, it's edit mode
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        website: "",
        location: "", // Backend company model has 'address'
        address: "",
        email: "",
        phoneNumber: "",
        file: null // For logo
    });

    useEffect(() => {
        if(id){
            const fetchCompany = async () => {
                try {
                    const res = await axios.get(`${COMPANY_API_END_POINT}/get/${id}`, { withCredentials: true });
                    if(res.data.success){
                        const comp = res.data.company;
                        setFormData({
                            name: comp.name,
                            description: comp.description,
                            address: comp.address,
                            email: comp.email,
                            phoneNumber: comp.phoneNumber,
                            file: null
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            fetchCompany();
        }
    }, [id]);

    const changeEventHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setFormData({ ...formData, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("address", formData.address);
        data.append("email", formData.email);
        data.append("phoneNumber", formData.phoneNumber);
        if(formData.file){
            data.append("file", formData.file); // Assuming singleUpload expects 'file' field
        }

        try {
            let res;
            if(id){
                res = await axios.put(`${COMPANY_API_END_POINT}/update/${id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                });
            } else {
                res = await axios.post(`${COMPANY_API_END_POINT}/register`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                });
            }
            
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#0d0d12] font-sans text-white flex">
            <AppSidebar />
            <div className="flex-1 md:ml-64">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                     <h1 className="text-2xl font-bold mb-8">{id ? 'Edit Company' : 'Register New Company'}</h1>
                     
                     <form onSubmit={submitHandler} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Company Name</label>
                                <input type="text" name="name" value={formData.name} onChange={changeEventHandler} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Company Email</label>
                                <input type="email" name="email" value={formData.email} onChange={changeEventHandler} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={changeEventHandler} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Address / Location</label>
                                <input type="text" name="address" value={formData.address} onChange={changeEventHandler} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                            <textarea name="description" rows="4" value={formData.description} onChange={changeEventHandler} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" required></textarea>
                        </div>

                        <div>
                             <label className="block text-sm font-medium text-gray-400 mb-2">Company Logo</label>
                             <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <FiUpload className="w-8 h-8 mb-2 text-gray-400" />
                                        <p className="text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    </div>
                                    <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={changeFileHandler} />
                                </label>
                            </div>
                             {formData.file && <p className="text-sm text-gray-400 mt-2">Selected: {formData.file.name}</p>}
                        </div>

                        <div className="flex justify-end gap-4">
                            <button type="button" onClick={() => navigate('/admin/companies')} className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">Cancel</button>
                            <button type="submit" disabled={loading} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-colors">
                                {loading ? 'Saving...' : (id ? 'Update Company' : 'Register Company')}
                            </button>
                        </div>
                     </form>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
