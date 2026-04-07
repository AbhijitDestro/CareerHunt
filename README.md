# CareerHunt - Modern Job Portal

CareerHunt is a robust, full-stack job portal application designed to bridge the gap between talented job seekers and recruiters. It offers a seamless experience for finding opportunities, managing applications, and hiring top talent.

---

## 🚀 Features

### For Candidates
- **User Authentication**: Secure registration and login as a candidate.
- **Profile Management**: Build a professional profile with bio, skills, resume upload, work experience, and social links (LinkedIn, GitHub).
- **Job Search**: Browse and search through public and protected job listings with advanced filters.
- **Easy Application**: Apply to jobs with a single click and track your application status.
- **Job Saving**: Save interesting jobs to your favorites for later review.
- **Notifications**: Stay updated with real-time notifications about application statuses and new opportunities.

### For Recruiters
- **Recruiter Dashboard**: Manage company profiles and posted jobs from a centralized hub.
- **Company Registration**: Create and update company details, including logo and location.
- **Job Posting**: Create, update, and manage detailed job listings with specific requirements.
- **Applicant Management**: View and manage applicants for each job, with the ability to update their application status.
- **Profile Customization**: Maintain a recruiter profile associated with your company.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**: Modern UI development with functional components and hooks.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for rapid and responsive styling.
- **Redux Toolkit**: Efficient state management.
- **React Router Dom**: For declarative routing.
- **Lucide React & React Icons**: For high-quality vector icons.
- **Sonner**: Elegant toast notifications.
- **GSAP**: For smooth UI animations.

### Backend
- **Node.js**: Asynchronous event-driven JavaScript runtime.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB & Mongoose**: NoSQL database for flexible data storage and object modeling.
- **JWT (JSON Web Token)**: Secure authentication and authorization.
- **Cloudinary**: Cloud-based image and file management (for resumes and profile photos).
- **Multer & DataURI**: For handling multipart/form-data and file uploads.
- **Bcrypt.js**: For secure password hashing.

---

## 📁 Project Structure

```text
CareerHunt/
├── backend/            # Express.js Server
│   ├── src/
│   │   ├── config/     # Database and server config
│   │   ├── controllers/# Business logic
│   │   ├── middleware/ # Auth and file upload middlewares
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API endpoints
│   │   └── utils/      # Helper functions (Cloudinary, DataURI)
│   └── package.json
├── frontend/           # React.js Application
│   ├── src/
│   │   ├── api/        # Axios API services
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # React context (Auth)
│   │   ├── pages/      # Page-level components
│   │   ├── lib/        # Redux store and slices
│   │   └── utils/      # Constants and helper functions
│   └── package.json
├── DEPLOYMENT.md       # Production deployment instructions
└── README.md           # Project documentation
```

---

## 💻 Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone <repository-url>
cd CareerHunt
```

### 2. Backend Setup
1. Navigate to the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file and add the following:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   FRONTEND_URL=http://localhost:5173
   ```
4. Start the server: `npm run dev`

### 3. Frontend Setup
1. Navigate to the `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file and add the following:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```
4. Start the application: `npm run dev`

---

## 🌍 Deployment

For production deployment instructions on platforms like Render (Backend) and Vercel (Frontend), please refer to the [DEPLOYMENT.md](./DEPLOYMENT.md) file.
