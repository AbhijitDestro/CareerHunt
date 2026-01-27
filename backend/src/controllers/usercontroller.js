import { User } from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async(req,res)=>{
    try{
        console.log('Registration request received:', req.body);
        const {email,fullname, password, role} = req.body;
        console.log('Extracted data:', {email, fullname, password: password ? '***' : 'missing', role});
        
        if(!email || !fullname || !password || !role){
            console.log('Validation failed: missing fields');
            return res.status(400).json({message: 'Please fill in all fields', success: false
            });
        }
        console.log('Checking if user exists with email:', email);
        const user= await User.findOne({email});
        if(user){
            console.log('User already exists');
            return res.status(400).json({message: 'User already exists with this email', success: false
            });
        }
        const hashedPassword= await bcrypt.hash(password, 10);
        const newUser= new User({
            email,
            fullname,
            phoneNumber: '',
            password: hashedPassword,
            role,
        });
        console.log('Creating new user with data:', {email, fullname, role, phoneNumber: null});
        await newUser.save();
        console.log('User saved successfully:', newUser._id);
        
        const tokenData={
            userId:newUser._id
        }
        const token= jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '1d'});
        
        return res.status(201).cookie('token', token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict'}).json({message: 'User registered successfully', success: true, user: newUser});
    }catch(error){
        console.error('Registration error:', error);
        console.error('Error stack:', error.stack);
        return res.status(500).json({message: error.message, success: false
        });
    }
}

export const login = async(req,res)=>{
    try{
        const {email, password , role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({message: 'Please fill in all fields', success: false
            });
        }
        let user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Incorrect email or password', success: false
            });
        }
        const isPasswordValid= await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: 'Incorrect email or password', success: false
            });
        }
        if(user.role !== role){
            return res.status(400).json({message: "Account doesn't exist with current role", success: false
            });
        }
        const tokenData={
            userId:user._id
        }
        const token= jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '1d'});
        return res.status(200).cookie('token', token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict'}).json({message: `Welcome back ${user.role}, ${user.fullname}`, success: true, user, token});
    }catch(error){
        return res.status(500).json({message: error.message, success: false
        });
    }
}

export const logout = async(req,res)=>{
    try{
        return res.status(200).cookie('token', '', {httpOnly: true, expires: new Date(Date.now()), httpOnly: true, sameSite: 'strict'}).json({message: 'User logged out successfully', success: true
        });
    }catch(error){
        return res.status(500).json({message: error.message, success: false
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills, location, linkedinProfile, yearsOfExperience, companyName, experiences } = req.body;
        
        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: 'User not found', success: false
            });
        }

        // Handle file uploads
        if(req.files) {
            if (req.files.profilePhoto) {
                const profilePhotoFile = req.files.profilePhoto[0];
                const profilePhotoUri = getDataUri(profilePhotoFile);
                const cloudResponse = await cloudinary.uploader.upload(profilePhotoUri.content);
                user.profile.profilePhoto = cloudResponse.secure_url;
            }

            if (req.files.resume) {
                const resumeFile = req.files.resume[0];
                const resumeUri = getDataUri(resumeFile);
                // Use resource_type: 'auto' to allow non-image files like PDFs to be handling correctly
                const cloudResponse = await cloudinary.uploader.upload(resumeUri.content, { resource_type: 'auto' });
                user.profile.resume = cloudResponse.secure_url;
                user.profile.resumeOriginalName = resumeFile.originalname;
            }
        }

        // Handle resume removal - if resume is empty string, clear it
        if(resume === '' && user.profile?.resume) {
            user.profile.resume = '';
            user.profile.resumeOriginalName = '';
        }

        // Update fields if provided
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        
        // Handle phone number - store as string for better formatting
        if(phoneNumber !== undefined && phoneNumber !== null && phoneNumber !== "null" && phoneNumber !== "undefined") {
            if(phoneNumber.trim() === "") {
                user.phoneNumber = null;
            } else {
                // Remove any non-numeric characters and store as string
                const cleanedPhone = phoneNumber.toString().replace(/[^0-9]/g, '');
                user.phoneNumber = cleanedPhone || null;
            }
        }
        
        if (!user.profile) user.profile = {};

        if(bio) user.profile.bio = bio;
        
        if(skills) {
            try {
                // simple splitting if it's comma separated, or JSON parse
                if(typeof skills === 'string') {
                    if(skills.startsWith('[')) {
                         user.profile.skills = JSON.parse(skills);
                    } else {
                         user.profile.skills = skills.split(',').map(skill => skill.trim()).filter(s => s);
                    }
                } else if(Array.isArray(skills)){
                    user.profile.skills = skills;
                }
            } catch (error) {
                console.log("Error parsing skills:", error);
            }
        }

        if(location) user.profile.location = location;
        if(linkedinProfile) user.profile.linkedinProfile = linkedinProfile;
        if(yearsOfExperience) user.profile.yearsOfExperience = Number(yearsOfExperience);
        if(companyName) user.profile.companyName = companyName;
        
        if(experiences) {
            try {
                 user.profile.experiences = typeof experiences === 'string' ? JSON.parse(experiences) : experiences;
            } catch (e) {
                console.error("Error parsing experiences:", e);
            }
        }

        await user.save();

        user = await User.findById(userId); // Fetch updated user to return

        return res.status(200).json({
            message: 'Profile updated successfully',
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message, success: false
        });
    }
}

export const getProfile = async(req,res)=>{
    try{
        const userId = req.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: 'User not found', success: false
            });
        }
        return res.status(200).json({user, success: true});
    }catch(error){
        return res.status(500).json({message: error.message, success: false
        });
    }
}

export const deleteProfile = async(req,res)=>{
    try{
        const userId = req.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: 'User not found', success: false
            });
        }
        await user.deleteOne();
        return res.status(200).json({message: 'Profile deleted successfully', success: true
        });
    }catch(error){
        return res.status(500).json({message: error.message, success: false
        });
    }
}

export const checkAuth = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

export const downloadResume = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).select("profile");
        
        if (!user || !user.profile?.resume) {
            return res.status(404).json({ message: "Resume not found", success: false });
        }

        const resumeUrl = user.profile.resume;
        
        // If it's a Cloudinary URL, modify it to force download
        if (resumeUrl.includes('cloudinary.com')) {
            // Transform the URL to force download
            const url = new URL(resumeUrl);
            // Add transformation parameters to force download
            url.searchParams.set('fl', 'attachment');
            url.searchParams.set('filename', user.profile.resumeOriginalName || 'resume.pdf');
            
            // Fetch the file using axios
            const response = await axios.get(url.toString(), { responseType: 'arraybuffer' });
            
            // Set appropriate headers for PDF download
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${user.profile.resumeOriginalName || 'resume.pdf'}"`);
            res.setHeader('Content-Length', response.data.length);
            
            return res.send(response.data);
        }
        
        // For other URLs, fetch using axios
        const response = await axios.get(resumeUrl, { responseType: 'arraybuffer' });
        const contentType = response.headers['content-type'] || 'application/octet-stream';
        
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${user.profile.resumeOriginalName || 'resume.pdf'}"`);
        res.setHeader('Content-Length', response.data.length);
        
        return res.send(response.data);
        
    } catch (error) {
        console.log('Download resume error:', error);
        return res.status(500).json({ message: "Error downloading resume", success: false });
    }
}
