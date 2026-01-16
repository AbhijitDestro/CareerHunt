import React from 'react';
import { FiLogIn } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 lg:px-32 py-6 text-white bg-transparent backdrop-blur-sm">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-wide">CareerHunt</h1>
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
        <Link to="/" className="hover:text-white transition-colors">Jobs</Link>
        <span className="text-gray-500">+</span>
        <Link to="/" className="hover:text-white transition-colors">Companies</Link>
        <span className="text-gray-500">+</span>
        <Link to="/about" className="hover:text-white transition-colors">About</Link>
        <span className="text-gray-500">+</span>
        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
      </div>

      <div>
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
    </nav>
  );
};

export default Navbar;



