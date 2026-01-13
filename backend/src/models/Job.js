import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract'],
        default: 'full-time',
        required: true,
    },
    vacancies: {
        type: Number,
        required: true,
    },
    experienceLevel: {
        type: String,
        enum: ['entry-level', 'mid-level', 'senior-level'],
        default: 'entry-level',
        required: true,
    },
    requirements: [{
        type: String,
        trim: true,
    }],
    applicationDeadline: {
        type: Date,
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    applications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }]
},{timestamps: true})

export const Job = mongoose.model('Job', jobSchema);
