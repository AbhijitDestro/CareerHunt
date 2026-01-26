import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FiSearch, FiMapPin, FiUser, FiTrendingUp } from 'react-icons/fi';
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const searchBarRef = useRef(null);
  const cardsRef = useRef(null);
  const starRefs = useRef([]);
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  const addToRefs = (el) => {
    if (el && !starRefs.current.includes(el)) {
      starRefs.current.push(el);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Build query parameters
    const params = new URLSearchParams();
    if (jobTitle.trim()) params.append('keyword', jobTitle.trim());
    if (location.trim()) params.append('location', location.trim());
    
    // Navigate to job search page with query parameters
    navigate(`/job-search?${params.toString()}`);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Float animation for stars
      starRefs.current.forEach((star, i) => {
        gsap.to(star, {
          y: -15,
          repeat: -1,
          yoyo: true,
          duration: 2 + i * 0.5,
          ease: "sine.inOut",
        });
      });

      // Entry animations
      const tl = gsap.timeline();
     
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      .from(searchBarRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-[#0d0d12] overflow-hidden text-white pt-32 pb-20 px-4 md:px-8 flex flex-col items-center justify-center font-sans">
     
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-700/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Stars */}
      <div ref={addToRefs} className="absolute top-32 left-32 text-white/80 text-2xl">✦</div>
      <div ref={addToRefs} className="absolute top-90 left-12 text-white/80 text-2xl">✦</div>
      <div ref={addToRefs} className="absolute top-120 right-20 text-white/80 text-2xl">✦</div>
      <div ref={addToRefs} className="absolute top-60 right-12 lg:top-55 lg:right-100 text-white/80 text-2xl">✦</div>
      <div ref={addToRefs} className="absolute top-40 right-48 text-white/50 text-xl">✦</div>
      <div ref={addToRefs} className="absolute bottom-60 left-16 text-white/40 text-3xl">✦</div>
      <div ref={addToRefs} className="absolute top-24 right-1/4 text-white/30 text-lg">✦</div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center text-center w-full max-w-5xl">
       
        <p className="text-gray-400 text-sm sm:text-lg tracking-widest mb-4 font-semibold uppercase">Find Your Dream Career</p>
       
        <div ref={titleRef} className="mb-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
            Unlock Your <br />
            <span className="flex items-center justify-center gap-4 flex-wrap">
              Career
              <span className="inline-flex items-center justify-center gap-2 px-8 py-2 bg-gradient-to-r from-blue-300 to-blue-700 rounded-full text-black transform -rotate-3 shadow-lg">
                <GoArrowUpRight className="text-xl" />
                <GoArrowUpRight className="text-xl rotate-90" />
                <GoArrowUpRight className="text-xl" />
                <GoArrowUpRight className="text-xl rotate-90" />
              </span>
              Potential
            </span>
          </h1>
        </div>

        {/* Search Bar */}
        <form ref={searchBarRef} onSubmit={handleSearch} className="w-full max-w-3xl bg-white rounded-2xl md:rounded-full p-3 md:p-2 flex flex-col md:flex-row items-stretch md:items-center shadow-2xl mb-24">
          <div className="flex-1 flex items-center px-4 py-3 md:py-0 w-full md:w-auto mb-2 md:mb-0">
            <FiSearch className="text-gray-400 text-2xl mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Job title or Keyword"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 py-1 md:py-3 min-w-0"
            />
          </div>
         
          <div className="hidden md:block w-px h-8 bg-gray-300 mx-2"></div>
         
          <div className="flex-1 flex items-center px-4 py-3 md:py-0 w-full md:w-auto mb-2 md:mb-0">
            <FiMapPin className="text-gray-400 text-xl mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 py-1 md:py-3 min-w-0"
            />
          </div>

          <button 
            type="submit"
            className="w-full md:w-auto bg-blue-400 hover:bg-blue-600 text-white px-6 md:px-8 py-3 rounded-xl md:rounded-full font-medium transition-colors duration-300 shadow-md cursor-pointer flex-shrink-0"
          >
            Search
          </button>
        </form>

        {/* How It Works Section */}
        <div ref={cardsRef} className="w-full bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/5 text-left relative overflow-hidden">
           {/* Subtle texture lines */}
           <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"
                style={{backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2) 0%, transparent 10%)'}}>
           </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 relative z-10">
            <div>
              <span className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-2 block">#How_it_works</span>
              <h3 className="text-2xl md:text-3xl font-bold max-w-md leading-relaxed">
                Easy step to get your<br />dream job here
              </h3>
            </div>
            <p className="text-gray-400 text-sm max-w-sm mt-4 md:mt-0">
              We ensure your next step is a step forward. That's why we built a jobs marketplace that cuts off the boring job search processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#E8DCC0] flex items-center justify-center shrink-0 text-black mt-1">
                <FiUser className="text-sm" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Register</h4>
                <p className="text-gray-400 text-sm leading-relaxed">You can create account and can search job.</p>
              </div>
            </div>

             {/* Step 2 */}
             <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#E8DCC0] flex items-center justify-center shrink-0 text-black mt-1">
                 <FiSearch className="text-sm font-bold" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Find job</h4>
                <p className="text-gray-400 text-sm leading-relaxed">You can search so many jobs with lots of fields.</p>
              </div>
            </div>

             {/* Step 3 */}
             <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#E8DCC0] flex items-center justify-center shrink-0 text-black mt-1">
                <FiTrendingUp className="text-sm" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Up your future</h4>
                <p className="text-gray-400 text-sm leading-relaxed">You can build your future through us.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;


