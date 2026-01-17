import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiDollarSign, FiMapPin, FiBriefcase, FiCheck } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock data service
const getJob = (id) => {
    // In a real app, fetch from API
    return {
        id: id,
        role: 'Senior Product Designer',
        company: 'Spotify',
        location: 'New York, NY (Remote)',
        type: 'Full Time',
        salary: '$120k - $140k',
        postedAt: '2 days ago',
        description: `
            <p>We are looking for a Senior Product Designer to join our team. You will be responsible for designing user-centric interfaces and experiences for our music streaming platform.</p>
            <h3>Responsibilities</h3>
            <ul>
                <li>Lead design projects from concept to launch.</li>
                <li>Collaborate with product managers and engineers.</li>
                <li>Conduct user research and usability testing.</li>
                <li>Create wireframes, prototypes, and high-fidelity mockups.</li>
            </ul>
             <h3>Requirements</h3>
            <ul>
                <li>5+ years of experience in product design.</li>
                <li>Proficiency in Figma and prototyping tools.</li>
                <li>Strong portfolio showcasing case studies.</li>
                <li>Excellent communication and leadership skills.</li>
            </ul>
        `,
        tags: ['UI/UX', 'Figma', 'React'],
        logoColor: 'bg-green-500',
        benefits: ['Health Insurance', 'Unlimited PTO', 'Remote Work', 'Learning Stipend']
    };
};

const JobDetails = () => {
    const { id } = useParams();
    const job = getJob(id);

    return (
        <div className="bg-[#0d0d12] min-h-screen text-white">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
                <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <FiArrowLeft className="mr-2" /> Back to Jobs
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header */}
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5">
                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                                <div className="flex items-center gap-4">
                                     <div className={`w-16 h-16 rounded-2xl ${job.logoColor} flex items-center justify-center text-2xl font-bold text-black`}>
                                        {job.company[0]}
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold mb-1">{job.role}</h1>
                                        <p className="text-gray-400 text-lg">{job.company}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                   {/* Actions could go here */}
                                </div>
                             </div>

                             <div className="flex flex-wrap gap-4 text-sm text-gray-300 border-t border-white/5 pt-6">
                                 <span className="flex items-center gap-2"><FiMapPin className="text-purple-400" /> {job.location}</span>
                                 <span className="flex items-center gap-2"><FiBriefcase className="text-blue-400" /> {job.type}</span>
                                 <span className="flex items-center gap-2"><FiDollarSign className="text-green-400" /> {job.salary}</span>
                                 <span className="flex items-center gap-2"><FiClock className="text-orange-400" /> {job.postedAt}</span>
                             </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5 prose prose-invert max-w-none">
                            <h2 className="text-2xl font-bold mb-4">Job Description</h2>
                            <div dangerouslySetInnerHTML={{ __html: job.description.replace(/<h3>/g, '<h3 class="text-xl font-bold mt-6 mb-3 text-white">').replace(/<ul>/g, '<ul class="list-disc pl-5 space-y-2 text-gray-300">').replace(/<li>/g, '<li class="marker:text-purple-500">') }} />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/5 sticky top-24">
                            <h3 className="text-xl font-bold mb-6">Apply for this job</h3>
                            <button className="w-full py-4 bg-[#6C2BD9] hover:bg-[#5b23b5] rounded-xl font-bold text-white transition-colors shadow-lg shadow-purple-900/20 mb-4">
                                Apply Now
                            </button>
                            <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-white transition-colors border border-white/5">
                                Save Job
                            </button>

                             <div className="mt-8">
                                <h4 className="font-bold text-white mb-4">Perks & Benefits</h4>
                                <ul className="space-y-3">
                                    {job.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-300 text-sm">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                                                <FiCheck size={14} />
                                            </div>
                                            {benefit}
                                        </li>
                                    ))}
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
