import express from 'express';
import { applyJob, getApplicant, updateStatus, getAppliedJobs } from '../controllers/applicationController.js';
import useAuth from '../middleware/userAuth.js';
import recruiterAuth from '../middleware/recruiterAuth.js';

const router= express.Router();

router.post('/apply/:id', useAuth, applyJob);
router.get('/get/applied', useAuth, getAppliedJobs);
router.get('/get/:id', useAuth, recruiterAuth, getApplicant);
router.put('/update/:id', useAuth, recruiterAuth, updateStatus);

export default router;