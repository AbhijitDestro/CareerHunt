import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="bg-[#0d0d12] py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden bg-linear-to-r from-blue-300 to-blue-700 rounded-[3rem] p-12 md:p-20 text-center">
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/20 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to shape your future?</h2>
                        <p className="text-purple-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            Join thousands of professionals who have found their dream careers through CareerHunt. Start your journey today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/signup" className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                                Get Started Now
                            </Link>
                            <Link to="/contact" className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                                Contact Sales
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
