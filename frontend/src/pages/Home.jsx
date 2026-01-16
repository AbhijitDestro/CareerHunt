import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedJobs from '../components/FeaturedJobs';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-[#0d0d12] min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedJobs />
      <Footer />
    </div>
  );
};

export default Home;


