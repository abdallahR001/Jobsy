"use client"
import Link from "next/link";
import { useState } from "react";
import { User, Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff, Sparkles } from "lucide-react";

export default function JobSeekerRegisterForm(){
    const [first_name,setFirstName] = useState("")
    const [last_name,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")
    const [emailError,setEmailError] = useState(false)
    const [nameError,setNameError] = useState(false)
    const [passwordError,setPasswordError] = useState(false)
    const [loading,setLoading] = useState(false)

    const handleFirstNameChange = (e) =>
    {
        setFirstName(e.target.value)
        if(nameError && e.target.value.trim().length > 0) {
            setNameError(false)
            setErrorMessage("")
        }
    }

    const handleLastNameChange = (e) =>
    {
        setLastName(e.target.value)
        if(nameError && e.target.value.trim().length > 0 && first_name.trim().length > 0) {
            setNameError(false)
            setErrorMessage("")
        }
    }

    const handleEmailChange = (e) =>
    {
        setEmail(e.target.value)
        if(emailError && e.target.value.trim().length > 0) {
            setEmailError(false)
            setErrorMessage("")
        }
    }

    const handlePasswordChange = (e) =>
    {
        setPassword(e.target.value)
        if(passwordError && e.target.value.trim().length > 0) {
            setPasswordError(false)
            setErrorMessage("")
        }
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault()
        try {
            setNameError(false)
            setEmailError(false)
            setPasswordError(false)

            if(first_name.trim().length === 0 || last_name.trim().length === 0)
            {
                setNameError(true)
                setErrorMessage("Name cannot be empty")
                return 
            }

            if(email.trim().length === 0)
            {
                setEmailError(true)
                setErrorMessage("Email cannot be empty")
                return
            }

            if(password.trim().length === 0)
            {
                setPasswordError(true)
                setErrorMessage("Password cannot be empty")
                return 
            }

            if(password.length < 6) {
                setPasswordError(true)
                setErrorMessage("Password must be at least 6 characters")
                return
            }

            setErrorMessage("")
            setLoading(true)

            const response = await fetch("http://localhost:4000/api/users/signUp",
                {
                    body:JSON.stringify({
                        first_name,
                        last_name,
                        email,
                        password
                    }),
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    credentials:"include"
                }
            )

            const data = await response.json()

            if(!response.ok)
            {
                setErrorMessage(data.message)
                setLoading(false)
                return
            }

            setLoading(false)
            setEmailError(false)
            setPasswordError(false)

            localStorage.setItem("userName",first_name)

            window.location.replace("/onboarding/users/step1")
        } 
        catch (error) {
            setErrorMessage("Something went wrong, please try again later")
            console.log(error)
            setLoading(false)
        }
    }

    const isFormValid = first_name.trim() && last_name.trim() && email.trim() && password.trim()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-indigo-700 px-4 py-2 rounded-full font-semibold border border-indigo-100 shadow-lg mb-6">
                        <Sparkles className="w-4 h-4" />
                        Join as Job Seeker
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Create Your <span className="text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">Account</span>
                    </h1>
                    <p className="text-gray-600 text-lg">Start your journey to find your dream job</p>
                </div>

                {/* Form Container */}
                <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20">
                    {/* Error Message */}
                    {errorMessage && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 animate-shake">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <p className="text-red-700 font-medium">{errorMessage}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                        {/* Name Fields */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-2 ${nameError ? "shake" : ""}`}>
                                <div className="relative flex-1 group">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300" />
                                    <input 
                                        type="text" 
                                        value={first_name}
                                        onChange={(e) => handleFirstNameChange(e)} 
                                        placeholder="First name" 
                                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:bg-white focus:outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 ${
                                            nameError 
                                            ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                                            : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                        }`}
                                    />
                                </div>
                                <div className="relative flex-1 group">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300" />
                                    <input 
                                        type="text" 
                                        value={last_name}
                                        onChange={(e) => handleLastNameChange(e)} 
                                        placeholder="Last name" 
                                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:bg-white focus:outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 ${
                                            nameError 
                                            ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                                            : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300" />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => handleEmailChange(e)} 
                                    placeholder="Enter your email" 
                                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:bg-white focus:outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 ${
                                        emailError 
                                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                                        : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300" />
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => handlePasswordChange(e)} 
                                    placeholder="Create a strong password" 
                                    className={`w-full pl-12 pr-12 py-4 bg-gray-50 border-2 rounded-2xl focus:bg-white focus:outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 ${
                                        passwordError 
                                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                                        : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {password.length > 0 && (
                                <div className="mt-2 space-y-1">
                                    <div className={`flex items-center gap-2 text-xs ${password.length >= 6 ? 'text-green-600' : 'text-gray-400'}`}>
                                        <CheckCircle className="w-3 h-3" />
                                        <span>At least 6 characters</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading || !isFormValid} 
                            className="group cursor-pointer disabled:cursor-not-allowed relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 disabled:from-gray-300 disabled:via-gray-400 disabled:to-gray-300 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-indigo-500/25 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
                        >
                            <div className="flex items-center justify-center gap-3 relative z-10">
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                    </>
                                )}
                            </div>
                            
                            {/* Hover effect */}
                            {isFormValid && !loading && (
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            )}
                        </button>

                        {/* Terms */}
                        <p className="text-xs text-gray-500 text-center leading-relaxed">
                            By creating an account, you agree to our{" "}
                            <Link href="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                Privacy Policy
                            </Link>
                        </p>
                    </form>

                    {/* Login Link */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-center text-gray-600">
                            Already have an account?{" "}
                            <Link 
                                href="/login/jobseeker" 
                                className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors duration-200"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom message */}
                <div className="text-center mt-6">
                    <p className="text-gray-500 text-sm">
                        🚀 Join thousands of professionals who found their dream jobs
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
                .shake {
                    animation: shake 0.3s ease-in-out;
                }
            `}</style>
        </div>
    )
}