import React from 'react';
import { FiUsers, FiClock, FiDollarSign, FiSearch, FiTrendingUp, FiCheckCircle, FiBriefcase, FiTarget, FiZap } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const ForEmployer = () => {
  return (
    <div className="bg-[#0d0d12] min-h-screen font-sans text-white">
      <Navbar />
      
      {/* Header */}
      <div className="pt-48 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-700/40 rounded-full blur-[120px] pointer-events-none" />
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 relative z-10">
          Find Top Talent <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-700">
            Faster & Smarter
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto relative z-10 leading-relaxed">
          Connect with qualified candidates, streamline your hiring process, and build your dream team with CareerHunt's powerful recruitment platform.
        </p>
      </div>

      {/* Story Content */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold">Why Choose CareerHunt?</h2>
                <p className="text-gray-400 leading-relaxed">
                    We understand that finding the right talent is crucial for your business success. That's why we've built a platform that connects you with top-tier candidates faster and more efficiently than traditional recruitment methods.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    Our AI-powered matching system, extensive candidate database, and streamlined hiring process help you build exceptional teams while saving time and resources.
                </p>
            </div>
            <div className="grid grid-cols-2 w-[400px] gap-4">
                <div className="bg-white/10 h-50 rounded-2xl">
                  <img src="https://images.unsplash.com/photo-1653669485641-8582ad808121?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Recruitment Team" className="w-full h-full object-cover rounded-2xl" />
                </div>
                <div className="bg-white/5 h-50 rounded-2xl mt-8">
                <img src="https://images.unsplash.com/photo-1713947503813-da5351679a0c?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hiring Process" className="w-full h-full object-cover rounded-2xl" />
                </div>
                <div className="bg-white/5 h-50 rounded-2xl">
                <img src="https://images.unsplash.com/photo-1698047682091-782b1e5c6536?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Team Building" className="w-full h-full object-cover rounded-2xl" /></div>
                <div className="bg-white/10 h-50 rounded-2xl mt-4">
                <img src="https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Success" className="w-full h-full object-cover rounded-2xl" /></div>
            </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-16">Why Employers Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                  <FiUsers className="text-3xl text-blue-400 mb-6" />
                  <h3 className="text-xl font-bold mb-4">Access to Top Talent</h3>
                  <p className="text-gray-400 leading-relaxed">Reach thousands of qualified professionals actively seeking new opportunities. Our platform attracts the best candidates in the industry.</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                  <FiClock className="text-3xl text-blue-400 mb-6" />
                  <h3 className="text-xl font-bold mb-4">Faster Hiring Process</h3>
                  <p className="text-gray-400 leading-relaxed">Reduce time-to-hire with our streamlined application process, automated screening tools, and efficient candidate management system.</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                  <FiDollarSign className="text-3xl text-blue-400 mb-6" />
                  <h3 className="text-xl font-bold mb-4">Cost-Effective Solutions</h3>
                  <p className="text-gray-400 leading-relaxed">Save on recruitment costs with our affordable pricing plans. Get maximum ROI on your hiring investment with our efficient platform.</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                  <FiSearch className="text-3xl text-blue-400 mb-6" />
                  <h3 className="text-xl font-bold mb-4">Advanced Search & Filtering</h3>
                  <p className="text-gray-400 leading-relaxed">Find the perfect candidates with our advanced search filters, skills matching, and intelligent candidate recommendations.</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                  <FiTrendingUp className="text-3xl text-blue-400 mb-6" />
                  <h3 className="text-xl font-bold mb-4">Data-Driven Insights</h3>
                  <p className="text-gray-400 leading-relaxed">Make informed hiring decisions with detailed analytics, candidate insights, and performance metrics for your job postings.</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                  <FiCheckCircle className="text-3xl text-blue-400 mb-6" />
                  <h3 className="text-xl font-bold mb-4">Quality Assurance</h3>
                  <p className="text-gray-400 leading-relaxed">Every candidate is verified and pre-screened. We ensure you receive only high-quality applications from serious professionals.</p>
              </div>
          </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Smart Candidate Matching</h2>
            <p className="text-gray-400 leading-relaxed">
              Our AI-powered algorithm matches your job requirements with the most suitable candidates, saving you time and ensuring better hires.
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center"><FiCheckCircle className="text-blue-400 mr-3" /> Skills-based matching</li>
              <li className="flex items-center"><FiCheckCircle className="text-blue-400 mr-3" /> Experience level filtering</li>
              <li className="flex items-center"><FiCheckCircle className="text-blue-400 mr-3" /> Location preferences</li>
              <li className="flex items-center"><FiCheckCircle className="text-blue-400 mr-3" /> Salary expectations</li>
            </ul>
          </div>
          <div className="bg-white/10 rounded-2xl p-6">
            <div className="h-64 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <div className="text-white text-center w-[90%] h-[90%]">
                <img src="https://images.unsplash.com/photo-1758518730162-09a142505bfd?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Perfect Match" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-white/10 rounded-2xl p-6 lg:order-1">
            <div className="h-64 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
              <div className="text-white text-center w-[90%] h-[90%]">
                <img src="https://images.unsplash.com/photo-1758518729240-7162d07427b8?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Perfect Match" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
          </div>
          <div className="space-y-6 lg:order-2">
            <h2 className="text-3xl font-bold">Streamlined Hiring Process</h2>
            <p className="text-gray-400 leading-relaxed">
              From job posting to candidate selection, our platform simplifies every step of your recruitment journey with intuitive tools and automation.
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center"><FiCheckCircle className="text-blue-400 mr-3" /> Easy job posting</li>
              <li className="flex items-center"><FiCheckCircle className="text-blue-400 mr-3" /> Automated screening</li>
              <li className="flex items-center"><FiCheckCircle className="text-blue-400 mr-3" /> Interview scheduling</li>
              <li className="flex items-center"><FiCheckCircle className="text-blue-400 mr-3" /> Candidate tracking</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Hiring Process?
        </h2>
        <p className="text-xl text-gray-400 mb-8">
          Join thousands of companies who have already streamlined their recruitment with CareerHunt.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
          <button className="bg-blue-400 hover:bg-blue-600 w-full text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 cursor-pointer">
            Get Started Today
          </button>
          </Link>
          <button className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-medium transition-colors duration-300">
            Schedule Demo
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForEmployer;