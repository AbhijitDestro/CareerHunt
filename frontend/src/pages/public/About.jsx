import React from 'react';
import { FiUsers, FiAward, FiGlobe } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const About = () => {
  return (
    <div className="bg-[#0d0d12] min-h-screen font-sans text-white">
      <Navbar />
     
      {/* Header */}
      <div className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />
       
        <h1 className="text-5xl md:text-7xl font-bold mb-6 relative z-10">
          We're changing the way <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            people find work.
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto relative z-10 leading-relaxed">
          Joboost connects talent with opportunity. We believe in a world where location doesn't limit your potential.
        </p>
      </div>

      {/* Stats */}
      <section className="py-16 bg-white/5 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
                <div className="text-4xl font-bold mb-2 text-[#6C2BD9]">10k+</div>
                <div className="text-gray-400">Companies Hiring</div>
            </div>
            <div>
                <div className="text-4xl font-bold mb-2 text-[#6C2BD9]">2M+</div>
                <div className="text-gray-400">Candidate Profiles</div>
            </div>
            <div>
                <div className="text-4xl font-bold mb-2 text-[#6C2BD9]">150+</div>
                <div className="text-gray-400">Countries Served</div>
            </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="text-gray-400 leading-relaxed">
                    Founded in 2024, Joboost started with a simple idea: talent is distributed equally, but opportunity is not. We set out to build a platform that bridges that gap.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    Today, we help thousands of companies build diverse, global teams and empower millions of professionals to build careers they love, from anywhere.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 h-48 rounded-2xl"></div>
                <div className="bg-white/5 h-48 rounded-2xl mt-8"></div>
                <div className="bg-white/5 h-48 rounded-2xl"></div>
                <div className="bg-white/10 h-48 rounded-2xl -mt-8"></div>
            </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-16">Why we do what we do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                  <FiUsers className="text-3xl text-purple-400 mb-6" />
                  <h3 className="text-xl font-bold mb-4">People First</h3>
                  <p className="text-gray-400 leading-relaxed">We believe that behind every resume is a person with dreams and potential.</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                  <FiGlobe className="text-3xl text-purple-400 mb-6" />
                  <h3 className="text-xl font-bold mb-4">Global Impact</h3>
                  <p className="text-gray-400 leading-relaxed">Connecting the world through meaningful work and economic opportunity.</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                  <FiAward className="text-3xl text-purple-400 mb-6" />
                  <h3 className="text-xl font-bold mb-4">Excellence</h3>
                  <p className="text-gray-400 leading-relaxed">We settle for nothing less than the best experience for our users.</p>
              </div>
          </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;


