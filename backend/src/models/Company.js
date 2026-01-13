import mongoose from 'mongoose';

const companySchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
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
    address: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        default: '',
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {timestamps: true});

export const Company = mongoose.model('Company', companySchema);
