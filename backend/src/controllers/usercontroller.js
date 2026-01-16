import { User } from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async(req,res)=>{
    try{
        const {email,fullname, phoneNumber, password, role} = req.body;
        if(!email || !fullname || !password || !role){
            return res.status(400).json({message: 'Please fill in all fields', success: false
            });
        }
        const user= await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'User already exists with this email', success: false
            });
        }
        const hashedPassword= await bcrypt.hash(password, 10);
        const newUser= new User({
            email,
            fullname,
            phoneNumber,
            password: hashedPassword,
            role,
        });
        await newUser.save();
        
        const tokenData={
            userId:newUser._id
        }
        const token= jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '1d'});
        
        return res.status(201).cookie('token', token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict'}).json({message: 'User registered successfully', success: true, user: newUser});
    }catch(error){
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

export const updateProfile = async(req,res)=>{
    try{
     const {fullname, email, phoneNumber, bio, skills, resume, resumeOriginalName, companyName, profilePhoto} = req.body;
     const file = req.file;

     const skillsArray= skills ? skills.split(',') : [];
     const userId = req.id;
     let user= await User.findById(userId);
     if(!user){
        return res.status(400).json({message: 'User not found', success: false
        });
     }
     user.fullname= fullname || user.fullname;
     user.email= email || user.email;
     user.phoneNumber= phoneNumber || user.phoneNumber;
     user.profile.bio= bio || user.profile.bio;
     user.profile.skills= skillsArray || user.profile.skills;
     user.profile.resume= resume || user.profile.resume;
     user.profile.resumeOriginalName= resumeOriginalName || user.profile.resumeOriginalName;
     user.profile.companyName= companyName || user.profile.companyName;
     user.profile.profilePhoto= profilePhoto || user.profile.profilePhoto;
     await user.save();
     return res.status(200).json({message: 'Profile updated successfully', success: true
     });
    } catch(error){
        return res.status(500).json({message: error.message, success: false
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
