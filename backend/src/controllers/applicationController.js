import { Application } from '../models/Application.js';
import { Job } from '../models/Job.js';

export const applyJob = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const userId = req.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({message: 'Job not found', success: false
            });
        }
        const existingApplication = await Application.findOne({job:jobId, applicant:userId})
        if(existingApplication){
            return res.status(400).json({message: 'You have already applied for this job', success: false
            });
        }
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });
        job.applications.push(newApplication._id);
        await job.save();
        res.status(201).json({ message: 'Application submitted successfully', success: true });
    }catch(error){
        res.status(400).json({ message: error.message, success: false });
    }
}

export const getAppliedJobs = async(req,res)=>{
    try{
        const userId = req.id;
        const applications = await Application.find({applicant: userId}).sort({createdAt: -1}).populate({path:"job", options:{sort:{createdAt:-1}},
        populate:{path:"company", options:{sort:{createdAt:-1}}}});
        if(!applications){
            return res.status(404).json({message: 'No applications found', success: false
            });
        }
        res.status(200).json({applications, success: true});
    }catch(error){
        res.status(400).json({ message: error.message, success: false });
    }
}

export const getApplicant = async(req,res)=>{
    try{
        const id = req.params.id;
        const userId = req.id;
        
        // Find the job and verify it belongs to the recruiter
        const job = await Job.findById(id);
        if(!job){
            return res.status(404).json({message: 'Job not found', success: false});
        }
        
        // Check if the job was posted by the current recruiter
        if(job.created_by.toString() !== userId){
            return res.status(403).json({message: 'Access denied. You can only view applications for jobs you posted', success: false});
        }
        
        // Populate applications with applicant details
        const jobWithApplications = await Job.findById(id).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{path:"applicant"}
        });
        
        res.status(200).json({applications: jobWithApplications.applications, success: true});
    }catch(error){
        res.status(400).json({ message: error.message, success: false });
    }
}

export const updateStatus = async(req,res)=>{
    try{
        const applicationId= req.params.id;
        const {status}= req.body;
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({message: 'Application not found', success: false
            });
        }
        application.status= status.toLowerCase();
        await application.save();
        res.status(200).json({message: 'Application status updated successfully', success: true});
    }catch(error){
        res.status(400).json({ message: error.message, success: false });
    }
}