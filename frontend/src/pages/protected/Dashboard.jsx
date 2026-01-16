import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome to your Dashboard</h1>
                <p className="text-gray-600 mt-2">
                    Hello, {user?.fullname}! You are logged in as a {user?.role}.
                </p>
            </div>
            <button 
                onClick={() => logout(navigate)} 
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
            >
                Sign Out
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-gray-900">{user?.fullname}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-gray-900 capitalize">{user?.role}</p>
              </div>
            </div>
            <Link 
              to="/profile" 
              className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800"
            >
              Edit Profile →
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {user?.role === 'candidate' ? (
                <>
                  <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 text-gray-700 hover:text-gray-900">
                    Browse Jobs
                  </button>
                  <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 text-gray-700 hover:text-gray-900">
                    Applied Jobs
                  </button>
                  <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 text-gray-700 hover:text-gray-900">
                    Saved Jobs
                  </button>
                </>
              ) : (
                <>
                  <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 text-gray-700 hover:text-gray-900">
                    Post New Job
                  </button>
                  <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 text-gray-700 hover:text-gray-900">
                    Manage Jobs
                  </button>
                  <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 text-gray-700 hover:text-gray-900">
                    View Applications
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Jobs Posted</span>
                <span className="font-semibold text-gray-900">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Applications</span>
                <span className="font-semibold text-gray-900">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Profile Views</span>
                <span className="font-semibold text-gray-900">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;