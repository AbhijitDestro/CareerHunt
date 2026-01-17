import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Footer from '../../components/Footer';
import AppSidebar from '../../components/AppSidebar';
import CandidateDashboard from './CandidateDashboard';
import RecruiterDashboard from './RecruiterDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0d0d12] font-sans text-white flex">
      <AppSidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400 mt-2">
                    Welcome back, <span className="text-white font-semibold">{user?.fullname}</span>
                </p>
            </div>
          </div>

          {/* content based on role */}
          {user?.role === 'candidate' ? (
              <CandidateDashboard user={user} />
          ) : (
              <RecruiterDashboard user={user} />
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;