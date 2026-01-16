import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaDribbble } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0d0d12] text-white pt-20 pb-8 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold mb-6">Joboost</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We ensure your next step is a step forward. Discover the best remote opportunities with us.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#6C2BD9] hover:text-white transition-all duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#6C2BD9] hover:text-white transition-all duration-300">
                <FaLinkedin />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#6C2BD9] hover:text-white transition-all duration-300">
                <FaGithub />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#6C2BD9] hover:text-white transition-all duration-300">
                <FaDribbble />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#6C2BD9] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#6C2BD9] transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-[#6C2BD9] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#6C2BD9] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#6C2BD9] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#6C2BD9] transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-[#6C2BD9] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#6C2BD9] transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#6C2BD9] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#6C2BD9] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#6C2BD9] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Joboost. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


