import React, { useState } from 'react';
import AppSidebar from '../../components/AppSidebar';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { FiEdit2, FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub } from 'react-icons/fi';

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    // Mock initial data based on user
    const [profileData, setProfileData] = useState({
        bio: "Senior Software Engineer with a passion for building scalable web applications. Experienced in React, Node.js, and Cloud Computing.",
        location: "San Francisco, CA",
        phone: "+1 (555) 123-4567",
        website: "www.johndoe.dev",
        skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
    });

    return (
        <div className="bg-[#0d0d12] min-h-screen text-white flex">
            <AppSidebar />
            
            <div className="flex-1 md:ml-64">
                <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
                    
                    {/* Header Card */}
                    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5 mb-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-r from-purple-900/50 to-blue-900/50"></div>
                        
                        <div className="relative z-10 pt-12 flex flex-col md:flex-row items-end gap-6">
                            <div className="w-32 h-32 rounded-full border-4 border-[#0d0d12] bg-gray-700 overflow-hidden shadow-xl">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'User'}`} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 mb-2">
                                <h1 className="text-3xl font-bold">{user?.fullname || 'John Doe'}</h1>
                                <p className="text-gray-400 text-lg capitalize">{user?.role} • {profileData.location}</p>
                            </div>
                            <button 
                                onClick={() => setIsEditing(!isEditing)}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors border border-white/5 cursor-pointer"
                            >
                                <FiEdit2 /> {isEditing ? 'Save Profile' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/5">
                                <h3 className="font-bold text-lg mb-4">Contact Info</h3>
                                <div className="space-y-4 text-sm text-gray-300">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400"><FiMail /></div>
                                        <span className="truncate">{user?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400"><FiPhone /></div>
                                        <span>{profileData.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400"><FiMapPin /></div>
                                        <span>{profileData.location}</span>
                                    </div>
                                </div>

                                 <div className="mt-8 pt-6 border-t border-white/5">
                                    <h3 className="font-bold text-lg mb-4">Socials</h3>
                                    <div className="flex gap-3">
                                        <a href="#" className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center hover:bg-blue-600/30 transition-colors"><FiLinkedin size={20} /></a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-gray-700/50 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"><FiGithub size={20} /></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-6">
                            {/* About */}
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5">
                                <h3 className="font-bold text-xl mb-4">About</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {profileData.bio}
                                </p>
                            </div>

                            {/* Skills */}
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5">
                                <h3 className="font-bold text-xl mb-6">Skills</h3>
                                <div className="flex flex-wrap gap-3">
                                    {profileData.skills.map((skill, idx) => (
                                        <span key={idx} className="px-4 py-2 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 text-sm font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Resume / Experience (Placeholder) */}
                             <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5">
                                <h3 className="font-bold text-xl mb-6">Experience</h3>
                                <div className="space-y-8">
                                    <div className="relative pl-8 border-l border-white/10">
                                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                                        <h4 className="text-lg font-bold">Senior Frontend Engineer</h4>
                                        <p className="text-purple-400 text-sm mb-2">TechCorp • 2021 - Present</p>
                                        <p className="text-gray-400 text-sm">Leading the frontend team in migration to Next.js.</p>
                                    </div>
                                    <div className="relative pl-8 border-l border-white/10">
                                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-500"></div>
                                        <h4 className="text-lg font-bold">Software Engineer</h4>
                                        <p className="text-gray-500 text-sm mb-2">StartUp Inc • 2019 - 2021</p>
                                        <p className="text-gray-400 text-sm">Developed full-stack features using React and Node.js.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Profile;