import { Notification } from '../models/Notification.js';
import { Application } from '../models/Application.js';
import { Job } from '../models/Job.js';
import { Company } from '../models/Company.js';

export const getNotifications = async (req, res) => {
    try {
        const userId = req.id;
        const { page = 1, limit = 20, filter = 'all' } = req.query;
        
        const query = { userId, state: { $ne: 'deleted' } };
        if (filter === 'unread') {
            query.state = 'unread';
        }
        
        const notifications = await Notification.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
            
        const total = await Notification.countDocuments(query);
        
        res.status(200).json({
            notifications,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const userId = req.id;
        const { notificationId } = req.params;
        
        const notification = await Notification.findOneAndUpdate(
            { _id: notificationId, userId },
            { state: 'read' },
            { new: true }
        );
        
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found', success: false });
        }
        
        res.status(200).json({ message: 'Notification marked as read', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const markAllAsRead = async (req, res) => {
    try {
        const userId = req.id;
        
        await Notification.updateMany(
            { userId, state: 'unread' },
            { state: 'read' }
        );
        
        res.status(200).json({ message: 'All notifications marked as read', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const markMultipleAsRead = async (req, res) => {
    try {
        const userId = req.id;
        const { notificationIds } = req.body;
        
        if (!notificationIds || !Array.isArray(notificationIds)) {
            return res.status(400).json({ message: 'Invalid notification IDs', success: false });
        }
        
        await Notification.updateMany(
            { _id: { $in: notificationIds }, userId },
            { state: 'read' }
        );
        
        res.status(200).json({ message: 'Selected notifications marked as read', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.id;
        const { notificationIds } = req.body;
        
        if (!notificationIds || !Array.isArray(notificationIds)) {
            return res.status(400).json({ message: 'Invalid notification IDs', success: false });
        }
        
        await Notification.updateMany(
            { _id: { $in: notificationIds }, userId },
            { state: 'deleted' }
        );
        
        res.status(200).json({ message: 'Notifications deleted successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const createNotification = async (userId, type, title, message, actionUrl = '', relatedId = null) => {
    try {
        const notification = new Notification({
            userId,
            type,
            title,
            message,
            actionUrl,
            relatedId
        });
        
        await notification.save();
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        return null;
    }
};

export const syncApplicationNotifications = async (userId) => {
    try {
        const applications = await Application.find({ applicant: userId })
            .populate({
                path: 'job',
                populate: { path: 'company' }
            });
        
        for (const app of applications) {
            if (app.status !== 'pending') {
                const existingNotification = await Notification.findOne({
                    userId,
                    relatedId: app._id,
                    type: 'job_application'
                });
                
                if (!existingNotification) {
                    // Only create new notification if it doesn't exist
                    await createNotification(
                        userId,
                        'job_application',
                        `Application ${app.status.charAt(0).toUpperCase() + app.status.slice(1)}`,
                        `Your application for ${app.job?.title || 'a job'} at ${app.job?.company?.name || 'a company'} has been ${app.status}.`,
                        '/applied-jobs',
                        app._id
                    );
                }
                // If notification exists, do nothing - preserve its current state
            }
        }
    } catch (error) {
        console.error('Error syncing application notifications:', error);
    }
};

export const syncNotifications = async (req, res) => {
    try {
        const userId = req.id;
        await syncApplicationNotifications(userId);
        
        res.status(200).json({ message: 'Notifications synced successfully', success: true });
    } catch (error) {
        console.error('Error syncing notifications:', error);
        res.status(500).json({ message: error.message, success: false });
    }
};