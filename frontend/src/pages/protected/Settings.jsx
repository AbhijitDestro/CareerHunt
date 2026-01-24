import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AppSidebar from '../../components/AppSidebar';

const Settings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: user?.emailNotifications || true,
    jobAlerts: user?.jobAlerts || true,
    interviewReminders: user?.interviewReminders || true,
    profileVisibility: user?.profileVisibility || 'public',
    language: user?.language || 'en',
    timezone: user?.timezone || 'UTC'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePasswordChange = (key, value) => {
    setPasswordData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // Save settings logic would go here
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }
    // Update password logic would go here
    console.log('Updating password');
    alert('Password updated successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-[#0d0d12] font-sans text-white flex">
      <AppSidebar />
      <div className="flex-1 md:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-2">
            Manage your account preferences and settings
          </p>
        </div>

        <div className="space-y-8">
          {/* Notification Settings */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Email Notifications</h3>
                  <p className="text-gray-400 text-sm">Receive notifications about job updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Job Alerts</h3>
                  <p className="text-gray-400 text-sm">Get notified about new job postings</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.jobAlerts}
                    onChange={(e) => handleSettingChange('jobAlerts', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Interview Reminders</h3>
                  <p className="text-gray-400 text-sm">Get reminders about upcoming interviews</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.interviewReminders}
                    onChange={(e) => handleSettingChange('interviewReminders', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Profile Visibility */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Profile Visibility</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Who can see your profile?</label>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="public">Public (Recruiters can find you)</option>
                  <option value="connections">Connections Only</option>
                  <option value="private">Private (Hidden from search)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm new password"
                />
              </div>
              <button
                onClick={handlePasswordUpdate}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Save Settings */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Save All Settings
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

