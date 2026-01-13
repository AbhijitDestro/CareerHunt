import express from 'express';
import { postJob, getAllJobs, getJobById, getJobByUserId, getJobsByCompanyId, updateJob, deleteJob } from '../controllers/jobController.js';
import useAuth from '../middleware/userAuth.js';
import recruiterAuth from '../middleware/recruiterAuth.js';

const router = express.Router();

router.post('/create', useAuth, recruiterAuth, postJob);
router.get('/get', useAuth, getAllJobs);
router.get('/get/:id', useAuth, getJobById);
router.get('/get/user/:userId', useAuth, recruiterAuth, getJobByUserId);
router.get('/get/company/:companyId', useAuth, getJobsByCompanyId);
router.put('/update/:id', useAuth, recruiterAuth, updateJob);
router.delete('/delete/:id', useAuth, recruiterAuth, deleteJob);

export default router;
