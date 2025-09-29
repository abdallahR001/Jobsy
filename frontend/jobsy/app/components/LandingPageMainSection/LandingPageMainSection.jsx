// Updated Main Component
import Features from "../FeaturesSection/Features";
import MainSearch from "../SearchForm/MainSearch";
import { Earth, Sparkles, TrendingUp, Zap } from "lucide-react";

export default function Main() {
    return (
        <>
            <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
                </div>

                <div className="relative z-10 flex items-center justify-center flex-col gap-16 min-h-screen px-4 py-20">
                    {/* Hero Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-indigo-700 px-6 py-3 rounded-full font-semibold border border-indigo-100 shadow-lg animate-fadeUp">
                        <Sparkles className="w-4 h-4" />
                        #1 Job Platform in <Earth/>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-5xl text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl text-gray-900 font-bold animate-fadeUp leading-tight mb-8">
                            Find your next job in a{" "}
                            <span className="relative inline-block">
                                <span className="text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text">
                                    Click.
                                </span>
                                <div className="absolute -bottom-2 left-0 w-full h-4 bg-gradient-to-r from-indigo-300 to-purple-300 opacity-30 rounded-full"></div>
                            </span>
                        </h1>
                        
                        <p className="mt-8 text-gray-600 text-xl sm:text-2xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
                            Explore <span className="font-semibold text-indigo-600">50,000+</span> opportunities, apply in seconds, and track your applications with our AI-powered platform.
                        </p>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-gray-500 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                <span>95% Success Rate</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                <span>AI-Powered Matching</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span>100K+ Active Users</span>
                            </div>
                        </div>
                    </div>

                    {/* Search Component */}
                    <div className="w-full max-w-4xl">
                        <MainSearch />
                    </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-1/4 left-8 w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl rotate-12 opacity-20 animate-bounce"></div>
                <div className="absolute top-1/3 right-12 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl -rotate-12 opacity-20 animate-bounce animation-delay-2000"></div>
            </main>
            
            <Features />
        </>
    )
}