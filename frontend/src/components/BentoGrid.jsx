import React from 'react';
import { FiTrendingUp, FiCpu, FiShield, FiGlobe } from 'react-icons/fi';
import { BiNetworkChart } from 'react-icons/bi';
import { RiRobot2Line } from 'react-icons/ri';

const BentoGrid = () => {
    return (
        <section className="bg-[#0d0d12] py-24 px-4 md:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-2 block">Why Choose CareerHunt</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Features that set us apart</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We leverage cutting-edge technology to make your job search faster, smarter, and more effective.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
                    {/* Large Card Left */}
                    <div className="md:col-span-1 md:row-span-2 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-purple-500/30 transition-colors duration-300 flex flex-col justify-between group overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                                <RiRobot2Line className="text-2xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">AI-Powered Matching</h3>
                            <p className="text-gray-400">
                                Our heavy AI algorithms analyze your profile and resume to find the perfect job matches that fit your skills and career goals.
                            </p>
                        </div>
                        <div className="mt-8 relative h-40 w-full bg-[#13131f] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
                            {/* Illustration Mockup */}
                            <div className="text-center">
                                <span className="text-xs text-green-400 font-mono">match_score: 98%</span>
                                <div className="mt-2 w-32 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
                                    <div className="h-full w-[98%] bg-green-500 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Middle Card */}
                    <div className="md:col-span-1 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:border-blue-500/30 transition-colors duration-300 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                            <FiGlobe className="text-xl" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Global Reach</h3>
                        <p className="text-gray-400 text-sm">
                            Access opportunities from top companies worldwide with remote-first options.
                        </p>
                    </div>

                    {/* Top Right Card */}
                    <div className="md:col-span-1 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:border-pink-500/30 transition-colors duration-300 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                         <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
                            <FiTrendingUp className="text-xl" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Market Insights</h3>
                        <p className="text-gray-400 text-sm">
                            Real-time salary data and industry trends to help you negotiate better.
                        </p>
                    </div>

                    {/* Bottom Wide Card */}
                    <div className="md:col-span-2 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-orange-500/30 transition-colors duration-300 relative group overflow-hidden flex flex-col md:flex-row items-center gap-8">
                         <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                         <div className="flex-1">
                             <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 mb-6">
                                <FiShield className="text-2xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Verified Companies</h3>
                            <p className="text-gray-400">
                                We manually verify every company to ensure a safe and legitimate job hunting experience. No scams, just real jobs.
                            </p>
                         </div>
                         <div className="flex-1 w-full flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-4 opacity-80">
                                <div className="bg-[#1a1a24] p-3 rounded-lg border border-white/5">
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 mb-2"></div>
                                    <div className="h-2 w-16 bg-gray-700 rounded mb-1"></div>
                                    <div className="h-2 w-10 bg-gray-700 rounded"></div>
                                </div>
                                <div className="bg-[#1a1a24] p-3 rounded-lg border border-white/5 translate-y-4">
                                     <div className="w-8 h-8 rounded-full bg-green-500/20 mb-2"></div>
                                    <div className="h-2 w-16 bg-gray-700 rounded mb-1"></div>
                                    <div className="h-2 w-10 bg-gray-700 rounded"></div>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
