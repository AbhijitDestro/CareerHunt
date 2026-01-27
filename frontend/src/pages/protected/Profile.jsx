import React, { useState, useEffect } from 'react';
import AppSidebar from '../../components/AppSidebar';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { FiEdit2, FiMail, FiPhone, FiMapPin, FiLinkedin, FiUpload, FiX, FiCheck, FiFileText, FiBriefcase, FiGlobe } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const isRecruiter = user?.role === 'recruiter';
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();
    
    const [profileData, setProfileData] = useState({
        bio: "",
        location: "",
        phoneNumber: "",
        website: "",
        skills: [],
        linkedinProfile: "",
        yearsOfExperience: "",
        companyName: "",
        resume: "",
        profilePhoto: "",
        experiences: [],
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const [resumeFileName, setResumeFileName] = useState('');
    const [uploadStatus, setUploadStatus] = useState({ profilePicture: null, resume: null });
    const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
    const [newExperience, setNewExperience] = useState({
        jobRole: '',
        companyName: '',
        timeline: '',
        description: ''
    });

    useEffect(() => {
        if (user) {
            setProfileData({
                bio: user.profile?.bio || "",
                location: user.profile?.location || "",
                phoneNumber: user.phoneNumber || "",
                website: user.profile?.website || "",
                skills: user.profile?.skills || [],
                linkedinProfile: user.profile?.linkedinProfile || "",
                yearsOfExperience: user.profile?.yearsOfExperience || "",
                companyName: user.profile?.companyName || "",
                resume: user.profile?.resume || "",
                profilePhoto: user.profile?.profilePhoto || "",
                experiences: user.profile?.experiences || [],
            });
            // Update resume file name based on current state
            if(user.profile?.resumeOriginalName) {
                setResumeFileName(user.profile.resumeOriginalName);
            } else if(user.profile?.resume && !user.profile?.resumeOriginalName) {
                // If resume exists but no original name, extract from URL
                const urlParts = user.profile.resume.split('/');
                setResumeFileName(urlParts[urlParts.length - 1] || 'resume.pdf');
            } else if(!user.profile?.resume) {
                setResumeFileName('');
            }
        }
    }, [user]);

    useEffect(() => {
        const fetchCompanies = async () => {
            if (user?.role === 'recruiter') {
                try {
                    const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                    if(res.data.success){
                        setCompanies(res.data.companies);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        
        if (user) {
            fetchCompanies();
        }
    }, [user]);

    // Cleanup object URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            if (profilePicturePreview) {
                URL.revokeObjectURL(profilePicturePreview);
            }
        };
    }, [profilePicturePreview]);

    return (
        <div className="bg-[#0d0d12] min-h-screen text-white flex">
            <AppSidebar />
            
            <div className="flex-1 md:ml-64">
                <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
                    
                    {/* Header Card */}
                    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5 mb-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-r from-[#1178bd]/70 to-blue-700/40"></div>
                        
                        <div className="relative z-10 pt-4 flex flex-col md:flex-row gap-4 items-center">
                            <div className="w-40 h-40 rounded-full border-4 border-[#0d0d12] bg-gray-700 overflow-hidden shadow-xl">
                                {profileData.profilePhoto ? (
                                    <img 
                                        src={typeof profileData.profilePhoto === 'string' ? profileData.profilePhoto : URL.createObjectURL(profileData.profilePhoto)} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover" 
                                    />
                                ) : (
                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Avatar" className="w-full h-full object-cover" />
                                )}
                            </div>
                            <div className="flex-1 mb-2 text-center md:text-left">
                                <h1 className="text-3xl font-bold">{user?.fullname || 'John Doe'}</h1>
                                <p className="text-gray-400 text-lg capitalize">{user?.role} {profileData.location ? `• ${profileData.location}` : ''}</p>
                            </div>
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 md:mt-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors border border-white/5 cursor-pointer"
                            >
                                <FiEdit2 /> Edit Profile
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                        <span>{profileData.phoneNumber || "Not set"}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400"><FiMapPin /></div>
                                        <span>{profileData.location || "Not set"}</span>
                                    </div>
                                    {profileData.linkedinProfile && (
                                         <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-blue-400"><FiLinkedin /></div>
                                            <a href={profileData.linkedinProfile} target="_blank" rel="noopener noreferrer" className="truncate hover:text-blue-400 text-blue-400">LinkedIn Profile</a>
                                        </div>
                                    )}
                                    {profileData.website && (
                                         <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-green-400"><FiGlobe /></div>
                                            <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="truncate hover:text-green-400 text-green-400">Website</a>
                                        </div>
                                    )}
                                     {!isRecruiter && profileData.resume && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400"><FiFileText /></div>
                                            {profileData.resume instanceof File || typeof profileData.resume !== 'string' ? (
                                                <span className="text-gray-300">Resume (Pending Upload)</span>
                                            ) : (
                                                <a href={profileData.resume} target="_blank" rel="noopener noreferrer" className="truncate hover:text-blue-400">Resume</a>
                                            )}
                                        </div>
                                    )}
                                    {/* Debug: Remove this after testing */}
                                    {profileData.resume && (
                                        <div className="text-xs text-gray-500 mt-2">
                                            Debug: Resume type: {typeof profileData.resume}, instanceof File: {profileData.resume instanceof File ? 'yes' : 'no'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Main Content (Candidate Only) */}
                        {!isRecruiter && (
                            <div className="md:col-span-2 space-y-6">
                                {/* About */}
                                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5">
                                    <h3 className="font-bold text-xl mb-4">About</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {profileData.bio || "No bio added yet."}
                                    </p>
                                </div>

                                {/* Skills */}
                                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5">
                                    <h3 className="font-bold text-xl mb-6">Skills</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {profileData.skills.length > 0 ? profileData.skills.map((skill, idx) => (
                                            <span key={idx} className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-300 border border-blue-500/20 text-sm font-medium">
                                                {skill}
                                            </span>
                                        )) : <p className="text-gray-400">No skills added.</p>}
                                    </div>
                                </div>

                                {/* Experience Section */}
                                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-bold text-xl">Experience</h3>
                                    </div>
                                    {profileData.experiences.length > 0 ? (
                                        <div className="space-y-8">
                                            {profileData.experiences.map((exp, index) => (
                                                <div key={index} className="relative pl-8 border-l border-white/10">
                                                    <div className={`absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full ${
                                                        index === 0 ? 'bg-blue-500' : 'bg-gray-500'
                                                    }`}></div>
                                                    <h4 className="text-lg font-bold">{exp.jobRole}</h4>
                                                    <p className={`text-sm mb-2 ${
                                                        index === 0 ? 'text-blue-400' : 'text-gray-500'
                                                    }`}>{exp.companyName} • {exp.timeline}</p>
                                                    <p className="text-gray-400 text-sm">{exp.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 text-center py-8">No experience listed.</p>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {isRecruiter && (
                            <div className="md:col-span-2 space-y-6">
                                {/* Social Links */}
                                {(profileData.linkedinProfile || profileData.website) && (
                                    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/5">
                                        <h3 className="font-bold text-lg mb-4">Social Links</h3>
                                        <div className="space-y-3">
                                            {profileData.linkedinProfile && (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-blue-400"><FiLinkedin /></div>
                                                    <a href={profileData.linkedinProfile} target="_blank" rel="noopener noreferrer" className="truncate hover:text-blue-400 text-blue-400">LinkedIn Profile</a>
                                                </div>
                                            )}
                                            {profileData.website && (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-green-400"><FiGlobe /></div>
                                                    <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="truncate hover:text-green-400 text-green-400">Website</a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Companies Section */}
                                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold text-xl">My Companies</h3>
                                        <button onClick={() => navigate('/admin/companies')} className="text-purple-400 text-sm hover:text-purple-300">View All</button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {companies.slice(0, 4).map(company => (
                                            <div key={company._id} className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-purple-500/30 transition-colors cursor-pointer" onClick={() => navigate(`/admin/companies/${company._id}`)}>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                                                        {company.logo ? (
                                                            <img src={company.logo} alt={company.name} className="w-full h-full object-cover"/>
                                                        ) : (
                                                            <span className="text-lg font-bold text-gray-400">{company.name[0]}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-white truncate">{company.name}</h4>
                                                        <p className="text-gray-400 text-xs">{company.email}</p>
                                                    </div>
                                                </div>
                                                <p className="text-gray-300 text-sm line-clamp-2">{company.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {companies.length === 0 && (
                                        <div className="text-center py-8">
                                            <p className="text-gray-400 mb-4">You haven't registered any companies yet.</p>
                                            <button onClick={() => navigate('/admin/companies/create')} className="text-purple-400 hover:text-purple-300 font-medium">Register your first company</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1a1a1f] rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold">Update Profile</h2>
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">Profile Picture</label>
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-full bg-white/5 border-2 border-white/10 overflow-hidden">
                                            {profilePicturePreview || profileData.profilePhoto ? (
                                                <img 
                                                    src={profilePicturePreview || (typeof profileData.profilePhoto === 'string' ? profileData.profilePhoto : URL.createObjectURL(profileData.profilePhoto))} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-cover" 
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-linear-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                                                    <FiUpload className="w-6 h-6 text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <label className="flex items-center justify-center w-full px-4 py-3 bg-white/5 border border-white/10 border-dashed rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                                            <div className="flex items-center gap-2">
                                                <FiUpload className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-300">
                                                    {profileData.profilePhoto ? 'Change Photo' : 'Upload Photo'}
                                                </span>
                                            </div>
                                            <input 
                                                type="file"
                                                accept=".jpg,.jpeg,.png"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        setProfileData({...profileData, profilePhoto: file});
                                                        setProfilePicturePreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Contact Information */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                                    <input 
                                        type="text"
                                        value={profileData.location}
                                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                                        placeholder="City, State"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                    <input 
                                        type="tel"
                                        value={profileData.phoneNumber}
                                        onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                                        placeholder="+91 1234567890"
                                    />
                                </div>
                            </div>

                            {!isRecruiter && (
                                <>
                                    {/* Bio */}
                                    <div>
                                        <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                                        <textarea 
                                            value={profileData.bio}
                                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white resize-none"
                                            rows={3}
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>
                                    
                                     {/* Links & Company */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                         <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Current Company</label>
                                            <input 
                                                type="text"
                                                value={profileData.companyName}
                                                onChange={(e) => setProfileData({...profileData, companyName: e.target.value})}
                                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                                            />
                                        </div>
                                         <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                                            <input 
                                                type="url"
                                                value={profileData.linkedinProfile}
                                                onChange={(e) => setProfileData({...profileData, linkedinProfile: e.target.value})}
                                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                                            />
                                        </div>
                                         <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                                             <input 
                                                type="url"
                                                value={profileData.website}
                                                onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                                            />
                                        </div>
                                         <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Years of Exp.</label>
                                             <input 
                                                type="number"
                                                value={profileData.yearsOfExperience}
                                                onChange={(e) => setProfileData({...profileData, yearsOfExperience: e.target.value})}
                                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Skills (Candidate Only) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {profileData.skills.map((skill, index) => (
                                                <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm flex items-center gap-2">
                                                    {skill}
                                                    <button onClick={() => {
                                                            const newSkills = profileData.skills.filter((_, i) => i !== index);
                                                            setProfileData({...profileData, skills: newSkills});
                                                        }}
                                                        className="text-purple-400 hover:text-purple-200"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input 
                                                type="text"
                                                placeholder="Add a skill..."
                                                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                                        const newSkill = e.target.value.trim();
                                                        if (!profileData.skills.includes(newSkill)) {
                                                            setProfileData({...profileData, skills: [...profileData.skills, newSkill]});
                                                        }
                                                        e.target.value = '';
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Resume Upload (Candidate Only) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-3">Resume</label>
                                        <div className="space-y-3">
                                            <label className="flex items-center justify-center w-full px-4 py-4 bg-white/5 border-2 border-dashed border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                                                <div className="flex flex-col items-center gap-2">
                                                    <FiUpload className="w-6 h-6 text-gray-400" />
                                                    <span className="text-sm text-gray-300">
                                                        {resumeFileName ? 'Change Resume' : 'Upload Resume'}
                                                    </span>
                                                    <span className="text-xs text-gray-500">PDF only</span>
                                                </div>
                                                <input 
                                                    type="file"
                                                    accept="application/pdf"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            setProfileData({...profileData, resume: file});
                                                            setResumeFileName(file.name);
                                                        }
                                                    }}
                                                />
                                            </label>
                                            {resumeFileName && (
                                                <div className="flex items-center justify-between">
                                                    <div className="text-sm text-white flex items-center gap-2">
                                                        <FiFileText /> {resumeFileName}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setProfileData({...profileData, resume: ''});
                                                            setResumeFileName('');
                                                        }}
                                                        className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 transition-colors"
                                                    >
                                                        <FiX className="w-4 h-4" />
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Helper for Experience (Candidate Only) */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="block text-sm font-medium text-gray-300">Experience</label>
                                            <button 
                                                type="button"
                                                onClick={() => setIsExperienceModalOpen(true)}
                                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                            >
                                                + Add Experience
                                            </button>
                                        </div>
                                        {profileData.experiences.length > 0 ? (
                                            <div className="space-y-3">
                                                {profileData.experiences.map((exp, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                                                        <div>
                                                            <p className="font-medium text-sm">{exp.jobRole}</p>
                                                            <p className="text-xs text-gray-400">{exp.companyName}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                const updatedExperiences = profileData.experiences.filter((_, i) => i !== index);
                                                                setProfileData({...profileData, experiences: updatedExperiences});
                                                            }}
                                                            className="text-gray-400 hover:text-red-400 transition-colors"
                                                        >
                                                            <FiX />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-400 text-sm">No experience added</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={async () => {
                                    setIsLoading(true);
                                    await updateProfile(profileData);
                                    setIsEditing(false);
                                    setIsLoading(false);
                                }}
                                disabled={isLoading}
                                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                            >
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
             {/* Add Experience Modal (Reuse from previous, logic remains same) */}
            {isExperienceModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                     <div className="bg-[#1a1a1f] rounded-2xl border border-white/10 max-w-lg w-full p-6 space-y-4">
                        <h2 className="text-xl font-bold">Add Experience</h2>
                        <input
                            type="text"
                            placeholder="Job Role"
                            value={newExperience.jobRole}
                            onChange={(e) => setNewExperience({...newExperience, jobRole: e.target.value})}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
                        />
                         <input
                            type="text"
                            placeholder="Company"
                            value={newExperience.companyName}
                            onChange={(e) => setNewExperience({...newExperience, companyName: e.target.value})}
                             className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
                        />
                         <input
                            type="text"
                            placeholder="Timeline"
                            value={newExperience.timeline}
                            onChange={(e) => setNewExperience({...newExperience, timeline: e.target.value})}
                             className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
                        />
                         <textarea
                            placeholder="Description"
                            value={newExperience.description}
                            onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                             className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
                        />
                         <div className="flex justify-end gap-3">
                            <button onClick={() => setIsExperienceModalOpen(false)} className="text-gray-400">Cancel</button>
                             <button 
                                onClick={() => {
                                    if(newExperience.jobRole){
                                         setProfileData({ ...profileData, experiences: [...profileData.experiences, newExperience] });
                                         setNewExperience({ jobRole: '', companyName: '', timeline: '', description: '' });
                                         setIsExperienceModalOpen(false);
                                    }
                                }}
                                className="px-4 py-2 bg-blue-600 rounded-lg text-white"
                             >Add</button>
                         </div>
                     </div>
                </div>
            )}
        </div>
    );
};

export default Profile;