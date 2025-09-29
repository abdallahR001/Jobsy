"use client"

import { Rocket, FileText, DollarSign, AlertCircle, CheckCircle } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Apply(){
    const [coverLetter,setCoverLetter] = useState("")
    const [salary,setSalary] = useState("")
    const [loading,setLoading] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")

    const params = useParams()
    const router = useRouter()

    console.log(params);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const response = await fetch("http://localhost:4000/api/users/me",{
                credentials:"include"
            })

            if(response.status === 401 || response.status === 403)
                router.push("/login/jobseeker")
        }

        fetchData()
    },[])

    const handleSubmit = async (e) =>
    {
        e.preventDefault()
        setLoading(true)
        setErrorMessage("")
        
        try {
            const response = await fetch(`http://localhost:4000/api/applications/${params.jobId}`,{
                method:"POST",
                credentials:"include",
                headers:{
                    "content-type":"application/json"
                },
                body: JSON.stringify({
                    cover_letter : coverLetter,
                    salaryNumber : salary
                })
            })

            const result = await response.json()

            if(!response.ok)
            {
                setErrorMessage(result.message)
                setLoading(false)
                return
            }

            // Success animation delay
            setTimeout(() => {
                router.push("/")
            }, 1000)
        } 
        catch (error) {
            console.log(error)
            setErrorMessage("Something went wrong. Please try again.")
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl shadow-2xl mb-6">
                        <Rocket className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent mb-4">
                        Submit Your Proposal!
                    </h1>
                    <p className="text-lg text-gray-600 font-medium">
                        Take the next step in your career journey 🚀
                    </p>
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 animate-shake">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-red-700 font-medium">{errorMessage}</p>
                    </div>
                )}

                {/* Application Form */}
                <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20">
                    <form onSubmit={(e) => handleSubmit(e)} className="space-y-8">
                        {/* Cover Letter Section */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-3 text-lg font-bold text-gray-800">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-white" />
                                </div>
                                Cover Letter
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <textarea 
                                    className="w-full min-h-[200px] p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 resize-none text-gray-700 placeholder-gray-400 shadow-sm"
                                    placeholder="Tell us why you're the perfect fit for this role! Share your passion, experience, and what makes you unique..."
                                    onChange={(e) => setCoverLetter(e.target.value)} 
                                    value={coverLetter}
                                    required
                                />
                                <div className="absolute bottom-4 right-4 text-sm text-gray-400 font-medium">
                                    {coverLetter.length} characters
                                </div>
                            </div>
                        </div>

                        {/* Salary Section */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-3 text-lg font-bold text-gray-800">
                                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-4 h-4 text-white" />
                                </div>
                                Expected Salary
                                <span className="text-sm font-normal text-gray-500">(Optional)</span>
                            </label>
                            <div className="relative">
                                <input 
                                    placeholder="Enter your expected salary..." 
                                    className="w-full p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm"
                                    type="number" 
                                    value={salary} 
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                                    USD
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button 
                                type="submit"
                                disabled={loading || !coverLetter.trim()}
                                className="group relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-8 py-6 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
                            >
                                {/* Button Content */}
                                <div className="relative z-10 flex items-center justify-center gap-3">
                                    {loading ? (
                                        <>
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Sending Application...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Application</span>
                                            <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                                        </>
                                    )}
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                {/* Animated background */}
                                <div className="absolute inset-0 -z-10">
                                    <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                                    <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
                                </div>
                            </button>

                            {/* Success Message */}
                            {loading && (
                                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 animate-bounce">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <p className="text-green-700 font-medium">
                                        Almost there! Preparing your application...
                                    </p>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                {/* Footer Message */}
                <div className="text-center mt-8">
                    <p className="text-gray-600 font-medium">
                        Good luck with your application! 🍀 
                        <span className="block text-sm text-gray-500 mt-2">
                            We'll get back to you soon with an update.
                        </span>
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
            `}</style>
        </div>
    )
}