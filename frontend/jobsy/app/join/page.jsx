import Image from "next/image";
import Link from "next/link";
import { User, Building2, ArrowRight, Briefcase, Users, Zap, Target, TrendingUp, CheckCircle, Sparkles } from "lucide-react";

export default function Join(){
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
                {/* Header Section */}
                <div className="text-center mb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-indigo-700 px-6 py-3 rounded-full font-semibold border border-indigo-100 shadow-lg mb-8">
                        <Sparkles className="w-4 h-4" />
                        Join the Revolution
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                        Choose Your{" "}
                        <span className="text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text">
                            Path
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Whether you're seeking your dream job or looking for top talent, 
                        <span className="font-semibold text-indigo-600"> Jobsy</span> is your gateway to success.
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="font-medium">50K+ Active Jobs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">100K+ Job Seekers</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-purple-500" />
                            <span className="font-medium">5K+ Companies</span>
                        </div>
                    </div>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full">
                    {/* Job Seeker Card */}
                    <Link 
                        href={"/register/jobseeker"} 
                        className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/20 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                    >
                        {/* Background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                            {/* Icon */}
                            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                                <User className="w-10 h-10 text-white" />
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                                I'm Looking for a Job
                            </h2>

                            {/* Description */}
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Discover amazing opportunities, get matched with your dream jobs, and accelerate your career with AI-powered recommendations.
                            </p>

                            {/* Features */}
                            <div className="space-y-4 mb-8 w-full">
                                {/* <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span>AI-powered job matching</span>
                                </div> */}
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span>One-click applications</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span>Resume builder with AI suggestions</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span>Track application status</span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="w-full">
                                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 group-hover:shadow-xl group-hover:shadow-indigo-500/25 transition-all duration-300">
                                    <span>Start Job Hunting</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                                <p className="text-sm text-gray-500 mt-3">Free to start • No credit card required</p>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
                    </Link>

                    {/* Employer Card */}
                    <Link 
                        href={"/register/employer"} 
                        className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/20 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                    >
                        {/* Background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                            {/* Icon */}
                            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                                <Building2 className="w-10 h-10 text-white" />
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                                I Want to Hire
                            </h2>

                            {/* Description */}
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Find exceptional talent faster than ever. Post jobs, screen candidates, and build your dream team with our advanced tools.
                            </p>

                            {/* Features */}
                            <div className="space-y-4 mb-8 w-full">
                                {/* <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span>Smart candidate filtering</span>
                                </div> */}
                                {/* <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span>Automated screening tools</span>
                                </div> */}
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span>Easy job posting</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span>Analytics and insights</span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="w-full">
                                <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 group-hover:shadow-xl group-hover:shadow-green-500/25 transition-all duration-300">
                                    <span>Start Hiring</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                                <p className="text-sm text-gray-500 mt-3">Free to start • No credit card required</p>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
                    </Link>
                </div>

                {/* Bottom Section */}
                <div className="text-center mt-16">
                    <p className="text-gray-600 text-lg mb-6">
                        Already have an account? 
                        <Link href="/login/jobseeker" className="text-indigo-600 hover:text-indigo-700 font-semibold ml-2 underline decoration-2 underline-offset-2">
                            Sign in here
                        </Link>
                    </p>

                    {/* Trust indicators */}
                    <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Trusted by 1000+ companies</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>99.9% uptime guarantee</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>GDPR compliant</span>
                        </div>
                    </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-1/4 left-8 w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl rotate-12 opacity-10 animate-bounce"></div>
                <div className="absolute top-1/3 right-12 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl -rotate-12 opacity-10 animate-bounce animation-delay-2000"></div>
            </div>
        </div>
    )
}