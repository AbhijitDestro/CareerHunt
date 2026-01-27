import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  deleteProfile,
  checkAuth,
  downloadResume,
} from "../controllers/usercontroller.js";
import useAuth from "../middleware/userAuth.js";
import { singleUpload, multiUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(useAuth, logout);
router.route("/profile").get(useAuth, getProfile);
router.route("/profile/update").post(useAuth, multiUpload, updateProfile);
router.route("/profile/delete").delete(useAuth, deleteProfile);
router.route("/me").get(useAuth, checkAuth);
router.route("/download-resume/:userId").get(useAuth, downloadResume);

export default router;
