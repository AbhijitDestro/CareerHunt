import React, { useState } from 'react';
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 lg:px-32 py-6 text-white bg-transparent backdrop-blur-sm">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="CareerHunt Logo" className="w-10 h-10 mr-2" />
          <h1 className="text-2xl lg:text-3xl font-bold tracking-wide">CareerHunt</h1>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
        <Link to="/jobs" className="hover:text-white transition-colors">Jobs</Link>
        <span className="text-gray-500">+</span>
        <Link to="/companies" className="hover:text-white transition-colors">Companies</Link>
        <span className="text-gray-500">+</span>
        <Link to="/for-employer" className="hover:text-white transition-colors">Employers</Link>
        <span className="text-gray-500">+</span>
        <Link to="/about" className="hover:text-white transition-colors">About</Link>
        <span className="text-gray-500">+</span>
        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
      </div>

      {/* Desktop Login Button */}
      <div className="hidden md:block">
        {user ? (
          <Link to="/dashboard">
            <button className="flex items-center cursor-pointer text-black rounded-xl gap-2 px-4 py-2 text-sm font-medium bg-white transition-opacity hover:opacity-80">
                Dashboard
            </button>
          </Link>
        ) : (
          <Link to="/signin">
            <button className="flex items-center cursor-pointer text-black rounded-xl gap-2 px-4 py-2 text-sm font-medium bg-white transition-opacity hover:opacity-80">
              <FiLogIn className="text-lg text-black" />
              Log in
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-gray-300 transition-colors"
        >
          {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-sm border-t border-gray-800">
          <div className="flex flex-col px-8 py-4 space-y-4">
            <Link to="/job-search" className="hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Jobs</Link>
            <Link to="/companies" className="hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Companies</Link>
            <Link to="/for-employer" className="hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Employers</Link>
            <Link to="/about" className="hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className="hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            {user ? (
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full flex items-center justify-center cursor-pointer text-black rounded-xl gap-2 px-4 py-2 text-sm font-medium bg-white transition-opacity hover:opacity-80">
                  Dashboard
                </button>
              </Link>
            ) : (
              <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full flex items-center justify-center cursor-pointer text-black rounded-xl gap-2 px-4 py-2 text-sm font-medium bg-white transition-opacity hover:opacity-80">
                  <FiLogIn className="text-lg text-black" />
                  Log in
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



