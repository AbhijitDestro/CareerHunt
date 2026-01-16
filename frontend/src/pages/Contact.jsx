import React from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="bg-[#0d0d12] min-h-screen font-sans text-white">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
         
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in touch</h1>
            <p className="text-gray-400 text-lg mb-12 max-w-md">
              Have a question or just want to say hi? We'd love to hear from you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <FiMail className="text-xl text-[#6C2BD9]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-gray-400">support@joboost.com</p>
                  <p className="text-gray-400">sales@joboost.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <FiMapPin className="text-xl text-[#6C2BD9]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Office</h3>
                  <p className="text-gray-400">123 Innovation Dr.</p>
                  <p className="text-gray-400">San Francisco, CA 94103</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <FiPhone className="text-xl text-[#6C2BD9]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                  <p className="text-gray-400">Mon-Fri from 8am to 5pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">First Name</label>
                  <input type="text" className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#6C2BD9] transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Last Name</label>
                  <input type="text" className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#6C2BD9] transition-colors" placeholder="Doe" />
                </div>
              </div>
             
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <input type="email" className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#6C2BD9] transition-colors" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Message</label>
                <textarea rows="4" className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#6C2BD9] transition-colors resize-none" placeholder="Tell us how we can help..."></textarea>
              </div>

              <button type="button" className="w-full bg-[#6C2BD9] hover:bg-[#5b23b5] text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-purple-900/20">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
     
      <Footer />
    </div>
  );
};

export default Contact;


