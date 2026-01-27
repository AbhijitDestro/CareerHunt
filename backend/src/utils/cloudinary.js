import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    // Add secure delivery URL configuration
    secure: true,
    // Ensure we're using HTTPS
    secure_distribution: true
});

export default cloudinary;