import express from 'express';
import { getAllCompanies, getCompanyById } from '../controllers/companyController.js';

const router = express.Router();

// Public company routes (no authentication required)
router.get('/get', getAllCompanies);
router.get('/get/:id', getCompanyById);

export default router;