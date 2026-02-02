import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '../../utils/constant';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2, X} from 'lucide-react';

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuth();
    const [selectedRole, setSelectedRole] = useState('candidate');
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: '',
        password: '',
        role: 'candidate',
    });

    const changeEventHandler=(e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const handleRoleChange = (role) => {
        setSelectedRole(role);
        setInput({
            ...input,
            role: role,
        });
    };

    const submitEventHandler= async (e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log('Login response:', res.data);
            if(res.data.success){
                setUser(res.data.user);
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                }
                toast.success('Login Successful! Welcome back!');
                navigate('/dashboard');
            }
        } catch(err){
            console.log(err);
            if(err.response?.data?.message){
                toast.error(err.response.data.message);
            } else {
                toast.error('An error occurred during login. Please try again.');
            }
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-4 font-sans text-white relative">
             {/* Close button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 right-6 w-14 h-14 cursor-pointer bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
                aria-label="Close and return to home"
            >
                <X className="w-8 h-8" />
            </button>

            <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-4 h-full lg:h-[90vh]">
               
                {/* Left Panel - Hero/Stepper */}
                <div className="hidden lg:flex flex-col justify-between p-12 rounded-[2rem] relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-900 to-black">
                     {/* Background noise/mesh effects if needed */}
                     <div className="absolute top-0 right-0 w-full h-full bg-white/5 backdrop-blur-[1px]" />
                     <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px]" />
                     
                     <div className="relative z-10">
                         {/* Logo */}
                         <div className="flex items-center gap-2 mb-20">
                              <img src="/logo.png" alt="CareerHunt Logo" className="w-10 h-10" />
                             <span className="text-2xl font-bold">CareerHunt</span>
                         </div>

                         <div className="mb-20">
                             <h1 className="text-5xl font-bold mb-6 leading-tight">Welcome Back!</h1>
                             <p className="text-gray-300 text-lg max-w-md">Sign in to continue your journey with CareerHunt.</p>
                         </div>

                         <div className="space-y-4 max-w-md">
                             <div className="bg-white text-black p-5 rounded-2xl flex items-center gap-4 shadow-xl translate-x-4 transition-transform">
                                 <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold shadow-md">✓</div>
                                 <span className="font-semibold">Secure Login</span>
                             </div>
                             <div className="bg-white/10 p-5 rounded-2xl flex items-center gap-4 text-gray-400 border border-white/5">
                                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">🔒</div>
                                 <span>Protected Data</span>
                             </div>
                         </div>
                     </div>
                </div>

                {/* Right Panel - Form */}
                <div className="flex flex-col justify-center px-4 md:px-12 lg:px-24 py-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">Sign In to Account</h2>
                        <p className="text-gray-400 text-sm">Enter your credentials to access your account.</p>
                    </div>

                    <form className="space-y-6" onSubmit={submitEventHandler}>
                        {/* Role Selection */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-400 ml-1">I am a</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleRoleChange('candidate')}
                                    className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                                        selectedRole === 'candidate'
                                            ? 'border-blue-500 bg-blue-500/20 text-white'
                                            : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                                    }`}
                                >
                                    <div className="text-center">
                                        <div className="text-lg mb-1">👤</div>
                                        <div className="font-semibold text-sm">Candidate</div>
                                        <div className="text-xs opacity-70">Looking for jobs</div>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleRoleChange('recruiter')}
                                    className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                                        selectedRole === 'recruiter'
                                            ? 'border-blue-500 bg-blue-500/20 text-white'
                                            : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                                    }`}
                                >
                                    <div className="text-center">
                                        <div className="text-lg mb-1">💼</div>
                                        <div className="font-semibold text-sm">Recruiter</div>
                                        <div className="text-xs opacity-70">Posting jobs</div>
                                    </div>
                                </button>
                            </div>
                            <input type="hidden" name="role" value={selectedRole} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-400 ml-1">Email</label>
                            <input
                                type="email"
                                placeholder="eg. johnfrans@gmail.com"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500 transition-colors text-sm placeholder:text-gray-600"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-semibold text-gray-400">Password</label>
                                <a href="#" className="text-xs text-blue-400 hover:text-blue-300">Forgot Password?</a>
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="Enter your password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500 transition-colors text-sm placeholder:text-gray-600"
                            />
                        </div>
                         {
                            loading ? <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors mt-4 flex items-center justify-center"><Loader2 className="animate-spin"/> Please Wait </button> :
                        <button
                            type="submit"
                            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors mt-4 cursor-pointer"
                        >
                            Log In
                        </button>
                         }

                        <p className="text-center text-sm text-gray-400">
                            Don't have an account? <Link to="/signup" className="text-white font-semibold hover:underline cursor-pointer">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn

