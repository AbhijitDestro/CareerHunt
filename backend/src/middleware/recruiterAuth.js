import { User } from '../models/User.js';

const recruiterAuth = async (req, res, next) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        
        if (user.role !== 'recruiter') {
            return res.status(403).json({ message: 'Access denied. Only recruiters can perform this action.', success: false });
        }
        
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

export default recruiterAuth;