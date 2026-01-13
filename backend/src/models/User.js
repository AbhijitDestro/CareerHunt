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
        minLength: [10, 'Email must be at least 10 characters long'],
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'Please use a valid phone number'],
        trim: true,
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
        resumeOriginalName: {type:String},
        companyName: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
        profilePhoto: {type:String, default: ''},
    }
},{timestamps: true})

export const User= mongoose.model('User', userSchema);