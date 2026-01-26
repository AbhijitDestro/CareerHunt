import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please use a valid email address'],
        trim: true,
        minLength: [8, 'Email must be at least 8 characters long'],
    },
    phoneNumber: {
        type: String,
        sparse: true,
        validate: { validator: v => v === null || v === '' || /^[0-9]{10}$/.test(v), message: 'Please use a valid phone number' },
        trim: true,
        default: null,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String,
        enum: ['candidate', 'recruiter'],
        default: 'candidate',
        required: true,
    },
    profile: {
        bio: {type: String,trim: true},
        skills: [{type: String,trim: true}],
        resume: {type:String},
        location: {type:String},
        yearsOfExperience: {type:Number, default: 0},
        linkedinProfile: {type:String},
        resumeOriginalName: {type:String},
        companyName: {type: String},
        profilePhoto: {type:String, default: ''},
        experiences: [
            {
                jobRole: {type: String},
                companyName: {type: String},
                timeline: {type: String},
                description: {type: String}
            }
        ]
    }
},{timestamps: true})


export const User= mongoose.model('User', userSchema);