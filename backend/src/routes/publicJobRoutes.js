import express from 'express';
import { getAllJobs, getJobById } from '../controllers/jobController.js';

const router = express.Router();

// Public job routes (no authentication required)
router.get('/get', getAllJobs);
router.get('/get/:id', getJobById);

export default router;