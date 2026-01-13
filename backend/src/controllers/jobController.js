import { Job } from '../models/Job.js';
import { Company } from '../models/Company.js';

export const postJob = async(req,res)=>{
    try{
        const {title, description, requirements, salary, location, jobType, experienceLevel, company, vacancies, applicationDeadline} = req.body;
        if(!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !company || !vacancies || !applicationDeadline){
            return res.status(400).json({message: 'Please fill all the fields', success: false
            });
        }
        const userId = req.id;
        const companyData = await Company.findById(company);
        if(!companyData){
            return res.status(404).json({message: 'Company not found', success: false
            });
        }
        const job = new Job({
            title,
            description,
            requirements,
            salary: Number(salary),
            vacancies: Number(vacancies),
            applicationDeadline: new Date(applicationDeadline),
            location,
            jobType,
            experienceLevel: experienceLevel.toLowerCase(),
            company: companyData,
            created_by: userId,
        });
        await job.save();
        return res.status(201).json({message: 'Job posted successfully', success: true
        });
    }catch(error){
        return res.status(500).json({message: error.message, success: false
        });
    }
}

export const getAllJobs = async(req,res)=>{
    try{
        const keyword = req.query.keyword || '';
        let query = {};
        
        if (keyword) {
            query = {
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { location: { $regex: keyword, $options: 'i' } },
                    { jobType: { $regex: keyword, $options: 'i' } },
                    { experienceLevel: { $regex: keyword, $options: 'i' } }
                ]
            };
        }
        
        const jobs = await Job.find(query).populate('created_by', 'name email').populate('company', 'name');
        if(jobs.length === 0){
            return res.status(404).json({message: 'No jobs found', success: false
            });
        }
        return res.status(200).json({jobs, success: true
        });
    }catch(error){
        return res.status(500).json({message: error.message, success: false
        });
    }
}

export const getJobById = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate('created_by', 'name email').populate('company', 'name');
        if(!job){
            return res.status(404).json({message: 'Job not found', success: false
            });
        }
        return res.status(200).json({job, success: true
        });
    }catch(error){
        return res.status(500).json({message: error.message, success: false
        });
    }
}

export const getJobsByCompanyId = async(req,res)=>{
    try{
        const companyId = req.params.companyId;
        const jobs = await Job.find({company: companyId}).populate('created_by', 'name email').populate('company', 'name');
        if(jobs.length === 0){
            return res.status(404).json({message: 'No jobs found', success: false
            });
        }
        return res.status(200).json({jobs, success: true
        });
    }catch(error){
        return res.status(500).json({message: error.message, success: false
        });
    }
}

export const getJobByUserId = async(req,res)=>{
    try{
        const userId = req.id;
        const jobs = await Job.find({created_by: userId}).populate('created_by', 'name email').populate('company', 'name');
        if(jobs.length === 0){
            return res.status(404).json({message: 'No jobs found', success: false
            });
        }
        return res.status(200).json({jobs, success: true
        });
    }catch(error){
        return res.status(500).json({message: error.message, success: false
        });
    }
}

export const updateJob = async(req, res) => {
    try{
        const userId = req.id;
       const jobId = req.params.id;
       const job = await Job.findById(jobId);
       if(!job){
            return res.status(404).json({message: 'Job not found', success: false
            });
        }
        if(job.created_by.toString() !== userId){
            return res.status(403).json({message: 'You are not authorized to update this job', success: false
            });
        }
        const {title, description, requirements, salary, vacancies, applicationDeadline, location, jobType, experienceLevel} = req.body;
        if(title) job.title = title;
        if(description) job.description = description;
        if(requirements) job.requirements = requirements;
        if(salary) job.salary = Number(salary);
        if(vacancies) job.vacancies = Number(vacancies);
        if(applicationDeadline) job.applicationDeadline = new Date(applicationDeadline);
        if(location) job.location = location;
        if(jobType) job.jobType = jobType;
        if(experienceLevel) job.experienceLevel = experienceLevel.toLowerCase();
        await job.save();
        return res.status(200).json({message: 'Job updated successfully', success: true
        });
    }catch(error){
        return res.status(500).json({message: error.message, success: false
        });
    }
}

export const deleteJob = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({message: 'Job not found', success: false
            });
        }
        await job.deleteOne();
        return res.status(200).json({message: 'Job deleted successfully', success: true
        });
    }catch(error){
        return res.status(500).json({message: error.message, success: false
        });
    }
}