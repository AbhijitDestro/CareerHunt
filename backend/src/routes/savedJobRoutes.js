import express from 'express';
import { saveJob, unsaveJob, getSavedJobs, getSavedJobsCount, isJobSaved } from '../controllers/savedJobController.js';
import useAuth from '../middleware/userAuth.js';

const router = express.Router();

// Save a job
router.post('/save', useAuth, saveJob);

// Unsave a job
router.delete('/unsave/:jobId', useAuth, unsaveJob);

// Get all saved jobs for the logged-in user
router.get('/get', useAuth, getSavedJobs);

// Get saved jobs count for the logged-in user
router.get('/count', useAuth, getSavedJobsCount);

// Check if a specific job is saved by the logged-in user
router.get('/is-saved/:jobId', useAuth, isJobSaved);

export default router;