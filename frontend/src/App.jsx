import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import Dashboard from './pages/protected/Dashboard'
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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
      </AuthProvider>
      <Toaster />
    </BrowserRouter>
  )
}

export default App

