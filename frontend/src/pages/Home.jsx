import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedJobs from '../components/FeaturedJobs';
import Marquee from '../components/Marquee';
import BentoGrid from '../components/BentoGrid';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-[#0d0d12] min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <FeaturedJobs />
      <BentoGrid />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;


