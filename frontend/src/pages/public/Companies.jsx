import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { PUBLIC_COMPANY_API_END_POINT } from '../../utils/constant';
 

const PublicCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      let query = '';
      if (searchTerm || location) {
        query = `?keyword=${searchTerm}&location=${location}`;
      }
      
      const res = await axios.get(`${PUBLIC_COMPANY_API_END_POINT}/get${query}`);
      if(res.data.success){
        setCompanies(res.data.companies);
      }
    } catch (error) {
      console.log(error);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [searchTerm, location]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCompanies();
  };

  return (
    <div className="min-h-screen bg-[#0d0d12] font-sans text-white">
      <Navbar />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Companies</h1>
            <p className="text-gray-400 mt-2">
              Discover amazing companies and their opportunities
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. Tech Innovators"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Mumbai"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Search Companies
                </button>
              </div>
            </form>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400">Loading companies...</p>
              </div>
            ) : companies.map((company) => (
              <div 
                key={company._id} 
                className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors h-[260px]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                    {company.logo ? (
                      <img src={company.logo} alt={company.name} className="w-full h-full object-cover"/>
                    ) : (
                      <span className="text-2xl font-bold text-gray-400">{company.name[0]}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-white truncate">{company.name}</h3>
                    <p className="text-gray-400 text-sm">{company.address}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm line-clamp-3 h-[100px]">{company.description}</p>
                
                <div className="flex-col text-sm">
                  <div className="text-gray-400">
                    Email.- {company.email} 
                  </div>
                  <div className="text-gray-400">
                    Phone No.- {company.phoneNumber} 
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!loading && companies.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No companies found</h3>
              <p className="text-gray-400">
                {searchTerm || location 
                  ? "Try adjusting your search criteria" 
                  : "No companies available at the moment. Please check back later!"}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PublicCompanies;
