import { Company } from '../models/Company.js';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { name, description, email, phoneNumber, address } = req.body;
        
        // Handle file upload if present
        let logo = req.body.logo;
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        // Check if all required fields are provided
        if (!name || !description || !email || !phoneNumber || !address) {
            return res.status(400).json({ message: 'Please provide all required fields', success: false });
        }
        const userId = req.id;
        // Check if the company with the same name or email or phone number already exists
        const existingCompany = await Company.findOne({
            $or: [{name}, { email }, { phoneNumber }],
        });
        if (existingCompany) {
            return res.status(400).json({ message: 'Company with the same name or email or phone number already exists', success: false });
        }
        let company = await Company.create({
            name,
            description,
            email,
            phoneNumber,
            address,
            logo,
            userId,
        });
        return res.status(201).json({ message: 'Company registered successfully',success: true, company });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
}

export const getCompany = async (req,res) =>{
    try{
        const userId=req.id;
        const companies=await Company.find({userId});
        if(!companies){
            return res.status(404).json({message: 'Companies not found', success: false});
        }
        return res.status(200).json({message: 'Companies found', success: true, companies});
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
}

export const getCompanyById= async(req,res) =>{
    try{
        const companyId= req.params.id;
        const company= await Company.findById(companyId);
        if(!company){
            return res.status(404).json({message: 'Company not found', success: false});
        }
        return res.status(200).json({message: 'Company found', success: true, company});
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
}

export const updateCompany =async(req,res) =>{
    try{
        const companyId= req.params.id;
        const { name, description, email, phoneNumber, address, logo } = req.body;
        // Check if all required fields are provided
        if (!name || !description || !email || !phoneNumber || !address) {
            return res.status(400).json({ message: 'Please provide all required fields', success: false });
        }
        const company= await Company.findById(companyId);
        if(!company){
            return res.status(404).json({message: 'Company not found', success: false});
        }
        company.name= name;
        company.description= description;
        company.email= email;
        company.phoneNumber= phoneNumber;
        company.address= address;
        company.logo= logo || company.logo;
        await company.save();
        return res.status(200).json({message: 'Company updated successfully', success: true, company});
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
}
