import { SavedJob } from '../models/SavedJob.js';
import { Job } from '../models/Job.js';
import { Company } from '../models/Company.js';

export const saveJob = async (req, res) => {
    try {
        const userId = req.id;
        const { jobId } = req.body;

        if (!jobId) {
            return res.status(400).json({ message: 'Job ID is required', success: false });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found', success: false });
        }

        // Check if already saved
        const existingSave = await SavedJob.findOne({ userId, jobId });
        if (existingSave) {
            return res.status(400).json({ message: 'Job already saved', success: false });
        }

        const savedJob = new SavedJob({ userId, jobId });
        await savedJob.save();

        res.status(201).json({ message: 'Job saved successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const unsaveJob = async (req, res) => {
    try {
        const userId = req.id;
        const { jobId } = req.params;

        if (!jobId) {
            return res.status(400).json({ message: 'Job ID is required', success: false });
        }

        const result = await SavedJob.deleteOne({ userId, jobId });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Saved job not found', success: false });
        }

        res.status(200).json({ message: 'Job unsaved successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const { page = 1, limit = 10 } = req.query;

        const savedJobs = await SavedJob.find({ userId })
            .populate({
                path: 'jobId',
                populate: {
                    path: 'company',
                    model: 'Company'
                }
            })
            .sort({ savedAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await SavedJob.countDocuments({ userId });

        res.status(200).json({
            savedJobs: savedJobs.map(save => ({
                ...save.toObject(),
                job: save.jobId
            })),
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const getSavedJobsCount = async (req, res) => {
    try {
        const userId = req.id;
        const count = await SavedJob.countDocuments({ userId });
        res.status(200).json({ count, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const isJobSaved = async (req, res) => {
    try {
        const userId = req.id;
        const { jobId } = req.params;

        if (!jobId) {
            return res.status(400).json({ message: 'Job ID is required', success: false });
        }

        const savedJob = await SavedJob.findOne({ userId, jobId });
        res.status(200).json({ isSaved: !!savedJob, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};