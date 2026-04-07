# Deployment Guide

This guide provides instructions for deploying the CareerHunt application (Frontend and Backend).

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (v18+ recommended).
- **MongoDB Atlas**: A cloud MongoDB instance.
- **Cloudinary**: An account for image and file uploads.

---

## Backend Deployment

The backend is a Node.js Express application.

### 1. Environment Variables

You need to set the following environment variables on your hosting platform:

- `PORT`: The port the server will run on (e.g., `3000`).
- `MONGODB_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A secret key for JWT token generation.
- `CLOUD_NAME`: Your Cloudinary cloud name.
- `API_KEY`: Your Cloudinary API key.
- `API_SECRET`: Your Cloudinary API secret.
- `FRONTEND_URL`: The URL of your deployed frontend (e.g., `https://your-frontend.vercel.app`).

### 2. Deployment Steps (Example: Render)

1. Create a new "Web Service" on [Render](https://render.com/).
2. Connect your GitHub repository.
3. Set the **Root Directory** to `backend`.
4. Set the **Build Command** to `npm install`.
5. Set the **Start Command** to `npm start`.
6. Add the environment variables listed above in the "Environment" section.
7. Deploy.

---

## Frontend Deployment

The frontend is a React application built with Vite.

### 1. Environment Variables

You need to set the following environment variable during the build process:

- `VITE_API_BASE_URL`: The URL of your deployed backend (e.g., `https://your-backend.onrender.com`).

### 2. Build Process

Vite generates a production-ready static site in the `dist` folder.

```bash
cd frontend
npm install
npm run build
```

### 3. Deployment Steps (Example: Vercel)

1. Create a new project on [Vercel](https://vercel.com/).
2. Connect your GitHub repository.
3. Set the **Root Directory** to `frontend`.
4. Vercel should automatically detect Vite settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add the environment variable `VITE_API_BASE_URL` in the "Environment Variables" section.
6. Deploy.

---

## Local Development (Quick Start)

1. Clone the repository.
2. Install dependencies in both `frontend` and `backend` folders.
3. Create a `.env` file in the `backend` folder with the necessary variables.
4. Run `npm run dev` in both folders.

---

## Troubleshooting

### 1. Authentication Issues (401 Unauthorized)

If you encounter 401 Unauthorized errors after logging in or during initial authentication checks in a deployed environment, consider the following:

- **Cross-Domain Cookies**: Browsers often block third-party cookies. The application is configured to use `sameSite: 'none'` and `secure: true` for cookies to support cross-domain communication between Vercel and Render.
- **Authorization Header**: As a fallback, the application stores the JWT token in `localStorage` and automatically attaches it to every outgoing request using an Axios interceptor.
- **Environment Variables**: Double-check that `JWT_SECRET` is identical on both local and production environments, and that `FRONTEND_URL` on Render is set to your actual Vercel URL.
- **CORS Configuration**: Ensure that the `FRONTEND_URL` provided to the backend matches exactly (including `https://` and no trailing slash) with your frontend URL.
