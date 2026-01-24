import React, { useState, useEffect } from 'react';
import AppSidebar from '../../components/AppSidebar';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { FiEdit2, FiMail, FiPhone, FiMapPin, FiLinkedin, FiUpload, FiX, FiCheck, FiFileText, FiBriefcase } from 'react-icons/fi';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const isRecruiter = user?.role === 'recruiter';
    
    const [profileData, setProfileData] = useState({
        bio: "",
        location: "",
        phone: "",
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
                phone: user.phoneNumber || "",
                website: user.profile?.website || "",
                skills: user.profile?.skills || [],
                linkedinProfile: user.profile?.linkedinProfile || "",
                yearsOfExperience: user.profile?.yearsOfExperience || "",
                companyName: user.profile?.companyName || "",
                resume: user.profile?.resume || "",
                profilePhoto: user.profile?.profilePhoto || "",
                experiences: user.profile?.experiences || [],
            });
            if(user.profile?.resumeOriginalName) setResumeFileName(user.profile.resumeOriginalName);
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
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'User'}`} alt="Avatar" className="w-full h-full object-cover" />
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
                                        <span>{profileData.phone || "Not set"}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400"><FiMapPin /></div>
                                        <span>{profileData.location || "Not set"}</span>
                                    </div>
                                    {!isRecruiter && profileData.linkedinProfile && (
                                         <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400"><FiLinkedin /></div>
                                            <a href={profileData.linkedinProfile} target="_blank" rel="noopener noreferrer" className="truncate hover:text-blue-400">LinkedIn</a>
                                        </div>
                                    )}
                                     {!isRecruiter && profileData.resume && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400"><FiFileText /></div>
                                            <a href={profileData.resume} target="_blank" rel="noopener noreferrer" className="truncate hover:text-blue-400">Resume</a>
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
                            <div className="md:col-span-2 flex items-center justify-center p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/5">
                                <p className="text-gray-400">Manage your companies and jobs from the dashboard sidebar.</p>
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
                            
                            {/* Common Field: Name (Should update fullname in backend, but userController expects fullname in root. The state 'profileData' doesn't seem to track fullname directly? Ah, useAuth stores it in `user`. We might need to handle fullname update distinct from profile or include it). 
                               wait, userController `updateProfile` handles fullname from req.body.
                               I need to add fullname to profileData state if I want to edit it.
                               Currently profileData state doesn't have fullname. I should add it.
                            */}
                            
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
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
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
                                                <div className="text-sm text-white flex items-center gap-2">
                                                    <FiFileText /> {resumeFileName}
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