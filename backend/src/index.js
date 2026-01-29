import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/dbConfig.js';
import userRoutes from './routes/userRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import savedJobRoutes from './routes/savedJobRoutes.js';
import publicJobRoutes from './routes/publicJobRoutes.js';
import publicCompanyRoutes from './routes/publicCompanyRoutes.js';

dotenv.config();
connectDB();
const app = express();
const corsOption = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log('Body:', req.body);
    }
    next();
});

const PORT= process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>CareerHunt - Job Portal</h1>");
});

//apis
app.use('/api/user', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api', notificationRoutes);
app.use('/api', savedJobRoutes);

// Public APIs (no authentication required)
app.use('/api/public/job', publicJobRoutes);
app.use('/api/public/company', publicCompanyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});