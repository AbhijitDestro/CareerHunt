import express from 'express';
import {register, login, logout, getProfile, updateProfile, deleteProfile} from '../controllers/usercontroller.js';
import useAuth from '../middleware/userAuth.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(useAuth,logout);
router.route('/profile').get(useAuth, getProfile)
router.route('/profile/update').post(useAuth, updateProfile);
router.route('/profile/delete').delete(useAuth, deleteProfile);

export default router;