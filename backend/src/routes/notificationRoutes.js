import express from 'express';
import { 
    getNotifications, 
    markAsRead, 
    markAllAsRead, 
    markMultipleAsRead, 
    deleteNotifications,
    syncNotifications
} from '../controllers/notificationController.js';
import useAuth from '../middleware/userAuth.js';

const router = express.Router();

router.get('/notifications', useAuth, getNotifications);
router.post('/sync-notifications', useAuth, syncNotifications);
router.put('/notifications/:notificationId/read', useAuth, markAsRead);
router.put('/notifications/mark-all-read', useAuth, markAllAsRead);
router.put('/notifications/mark-multiple-read', useAuth, markMultipleAsRead);
router.delete('/notifications/delete-multiple', useAuth, deleteNotifications);

export default router;