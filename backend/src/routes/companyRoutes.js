import express from 'express';
import { registerCompany, getCompany, getCompanyById, updateCompany } from '../controllers/companyController.js';
import useAuth from '../middleware/userAuth.js';
import recruiterAuth from '../middleware/recruiterAuth.js';
import { singleUpload } from '../middleware/multer.js';

const router= express.Router();

router.post('/register', useAuth, recruiterAuth, singleUpload, registerCompany);
router.get('/get', useAuth, getCompany);
router.get('/get/:id', useAuth, getCompanyById);
router.put('/update/:id', useAuth, singleUpload, updateCompany);

export default router;