import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AppSidebar from '../../components/AppSidebar';
import axios from 'axios';
import { NOTIFICATION_API_END_POINT } from '../../utils/constant';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // First sync application notifications
        await axios.post(`${NOTIFICATION_API_END_POINT}/sync-notifications`, {}, { withCredentials: true });
        
        // Then fetch notifications from new API
        const res = await axios.get(`${NOTIFICATION_API_END_POINT}/notifications`, { withCredentials: true });
        if (res.data.success) {
          setNotifications(res.data.notifications);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Don't use fallback - just show empty state to avoid recreating notifications
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchNotifications();
  }, [user]);

  const handleNotificationClick = async (notificationId, state) => {
    if (state === 'read') return;
    
    try {
      await axios.put(`${NOTIFICATION_API_END_POINT}/notifications/${notificationId}/read`, {}, { withCredentials: true });
      setNotifications(prev =>
        prev.map(notif =>
          notif._id === notificationId ? { ...notif, state: 'read' } : notif
        )
      );
    } catch (error) {
      console.error('Error marking as read:', error);
      // Fallback: update local state only
      setNotifications(prev =>
        prev.map(notif =>
          notif._id === notificationId ? { ...notif, state: 'read' } : notif
        )
      );
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(`${NOTIFICATION_API_END_POINT}/notifications/mark-all-read`, {}, { withCredentials: true });
      setNotifications(prev => prev.map(notif => ({ ...notif, state: 'read' })));
    } catch (error) {
      console.error('Error marking all as read:', error);
      // Fallback: update local state only
      setNotifications(prev => prev.map(notif => ({ ...notif, state: 'read' })));
    }
  };



  const getNotificationIcon = (type) => {
    switch (type) {
      case 'job_application':
        return '📋';
      case 'job_posting':
        return '💼';
      case 'interview':
        return '🗓️';
      case 'system':
        return '⚙️';
      default:
        return '📢';
    }
  };

  const unreadCount = notifications.filter(n => n.state === 'unread').length;

  return (
    <div className="min-h-screen bg-[#0d0d12] font-sans text-white flex">
      <AppSidebar />
      <div className="flex-1 md:ml-64">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : notifications.map((notification) => (
              <div
                key={notification._id}
                className={`bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors cursor-pointer ${
                  notification.state === 'unread' ? 'border-l-4 border-l-blue-500' : ''
                }`}
                onClick={() => handleNotificationClick(notification._id, notification.state)}
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
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">
                      {notification.message}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs px-2 py-1 rounded ${
                        notification.state === 'unread'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {notification.state === 'unread' ? 'Unread' : 'Read'}
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
