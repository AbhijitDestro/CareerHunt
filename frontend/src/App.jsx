import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import Home from './pages/public/Home'
import About from './pages/public/About'
import Contact from './pages/public/Contact'
import ForEmployer from './pages/public/ForEmployer'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import Dashboard from './pages/protected/Dashboard'
import Profile from './pages/protected/Profile'
import JobDetails from './pages/JobDetails'
import ProtectedJobDetails from './pages/protected/JobDetails'
import Settings from './pages/protected/Settings'
import JobSearch from './pages/protected/JobSearch'
import PublicJobSearch from './pages/public/JobSearch'
import Jobs from './pages/public/Jobs'
import PublicCompanies from './pages/public/Companies'
import Notifications from './pages/protected/Notifications'
import AppliedJobs from './pages/protected/AppliedJobs'
import Applicants from './pages/protected/Applicants'
import Companies from './pages/protected/Companies'
import CompanyCreate from './pages/protected/CompanyCreate'
import PostJob from './pages/protected/PostJob'
import RecruiterJobs from './pages/protected/RecruiterJobs'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/for-employer" element={<ForEmployer />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/companies" element={<PublicCompanies />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/applied-jobs" element={<ProtectedRoute><AppliedJobs /></ProtectedRoute>} />
        <Route path="/job-search" element={<ProtectedRoute><JobSearch /></ProtectedRoute>} />
        <Route path="/job-search/:id" element={<ProtectedRoute><ProtectedJobDetails /></ProtectedRoute>} />
        <Route path="/admin/jobs/:id/applicants" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
        <Route path="/admin/jobs/create" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
        <Route path="/admin/jobs/:id/edit" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
        <Route path="/admin/jobs" element={<ProtectedRoute><RecruiterJobs /></ProtectedRoute>} />
        <Route path="/admin/companies" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
        <Route path="/admin/companies/create" element={<ProtectedRoute><CompanyCreate /></ProtectedRoute>} />
        <Route path="/admin/companies/:id" element={<ProtectedRoute><CompanyCreate /></ProtectedRoute>} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
      </AuthProvider>
      <Toaster />
    </BrowserRouter>
  )
}

export default App

