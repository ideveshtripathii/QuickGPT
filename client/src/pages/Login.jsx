import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { assets } from '../assets/assets';

const Login = () => {

    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {axios, setToken, theme} = useAppContext()

    const handleSubmit = async (e) => {
      e.preventDefault();
      const url = state === "login" ? '/api/user/login' : '/api/user/register'

      try {
        const {data} = await axios.post(url, {name, email, password})
        if(data.success){
            setToken(data.token)
            localStorage.setItem('token', data.token)
        }else{
            toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }


  return (
    <div className="w-full max-w-md px-6 perspective-1000">
        {/* Card Container with Glassmorphism */}
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-5 items-center p-10 pt-12 text-gray-700 dark:text-gray-200 bg-[#1A181C]/70 backdrop-blur-2xl rounded-[32px] shadow-2xl shadow-purple-900/20 border border-white/10 overflow-hidden transform transition-all hover:scale-[1.01]">
            
            {/* Background Glow Effect behind Logo */}
            <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-purple-500/20 to-transparent pointer-events-none"></div>

            {/* Logo Injection */}
            <img 
               src={theme === 'dark' || true ? assets.logo_full_dark : assets.logo_full} 
               alt="PromptStack" 
               className='h-10 mb-2 drop-shadow-md z-10' 
            />

            <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-white uppercase text-center w-full z-10 mt-2 mb-2">
                {state === "login" ? "Welcome Back" : "Create Account"}
            </h2>

            <div className="w-full flex flex-col gap-4 z-10">
                {state === "register" && (
                    <div className="w-full">
                        <label className="block text-xs font-semibold text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">Full Name</label>
                        <div className="relative">
                            <input onChange={(e) => setName(e.target.value)} value={name} placeholder="John Doe" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500/50 shadow-inner placeholder-gray-500 transition-all font-medium" type="text" required />
                        </div>
                    </div>
                )}

                <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">Email Address</label>
                     <div className="relative">
                        <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="name@example.com" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500/50 shadow-inner placeholder-gray-500 transition-all font-medium" type="email" required />
                     </div>
                </div>

                <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">Password</label>
                    <div className="relative">
                        <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="••••••••" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500/50 shadow-inner placeholder-gray-500 transition-all font-medium" type="password" required />
                    </div>
                </div>
            </div>

            <button type='submit' className="mt-4 group relative flex justify-center items-center w-full py-3.5 font-bold text-white rounded-xl overflow-hidden shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 cursor-pointer z-10 hover:-translate-y-0.5">
                <div className="absolute inset-0 bg-gradient-to-r from-[#A456F7] to-[#3D81F6] opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700"></div>
                <span className="relative text-[15px] tracking-wide flex items-center gap-2">
                    {state === "register" ? "Sign Up Free" : "Secure Login"}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
            </button>

            <div className="mt-2 text-sm text-gray-400 text-center z-10 w-full mb-2">
                {state === "register" ? (
                    <p>
                        Already have an account? <span onClick={() => setState("login")} className="text-purple-400 font-semibold cursor-pointer hover:text-purple-300 hover:underline transition-all">Sign In</span>
                    </p>
                ) : (
                    <p>
                        Don't have an account? <span onClick={() => setState("register")} className="text-purple-400 font-semibold cursor-pointer hover:text-purple-300 hover:underline transition-all">Create one</span>
                    </p>
                )}
            </div>
            
        </form>
    </div>
  )
}

export default Login
