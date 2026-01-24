import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AppSidebar from '../../components/AppSidebar';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../utils/constant';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const fetchNotifications = async () => {
         try {
             // We derive notifications from application status
             const res = await axios.get(`${APPLICATION_API_END_POINT}/get/applied`, { withCredentials: true });
             if(res.data.success){
                 const apps = res.data.applications;
                 // Filter for non-pending apps to show as "updates"
                 const updates = apps.filter(app => app.status !== 'pending').map(app => ({
                     id: app._id,
                     type: 'job_application',
                     title: `Application ${app.status.charAt(0).toUpperCase() + app.status.slice(1)}`,
                     message: `Your application for ${app.job?.title || 'a job'} at ${app.job?.company?.name || 'a company'} has been ${app.status}.`,
                     timestamp: new Date(app.updatedAt).toLocaleDateString(),
                     read: false, // Local state only
                     actionUrl: '/applied-jobs'
                 }));
                 setNotifications(updates);
             }
         } catch (error) {
             console.log(error);
         } finally {
             setLoading(false);
         }
     }
     if(user) fetchNotifications();
  }, [user]);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getNotificationIcon = (type) => {
     return '📋';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#0d0d12] font-sans text-white flex">
      <AppSidebar />
      <div className="flex-1 md:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
            <p className="text-gray-400 mt-2">
              {unreadCount > 0 ? `${unreadCount} unread updates` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Mark All as Read
            </button>
          )}
        </div>

        <div className="space-y-4">
          {loading ? <p className="text-gray-400">Loading...</p> : notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors cursor-pointer ${
                !notification.read ? 'border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {notification.title}
                    </h3>
                    <span className="text-sm text-gray-400 ml-2">
                      {notification.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-3">
                    {notification.message}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded ${
                      !notification.read
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {!notification.read ? 'Unread' : 'Read'}
                    </span>
                    {notification.actionUrl && (
                      <a
                        href={notification.actionUrl}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Details →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-5 5v-5zM9 7H4l5-5v5zM15 7h5l-5-5v5zM9 17H4l5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No notifications</h3>
            <p className="text-gray-400 mb-4">You're all caught up!</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;

