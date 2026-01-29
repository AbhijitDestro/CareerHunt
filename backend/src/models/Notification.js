import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['job_application', 'job_posting', 'interview', 'system'],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    state:{
        type: String,
        enum: ['unread', 'read', 'deleted'],
        default: 'unread',
    },
    actionUrl: {
        type: String,
        default: '',
    },
    relatedId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, state: 1 });

export const Notification = mongoose.model('Notification', notificationSchema);