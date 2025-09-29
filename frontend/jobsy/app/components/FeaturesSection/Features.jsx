// Updated Features Component
import { Briefcase, Users, Sparkles, Target, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Features() {
    return (
        <section className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 py-24 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold mb-6">
                        <Zap className="w-4 h-4" />
                        Why Choose Us
                    </div>
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        Why Choose <span className="text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">Jobsy?</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Experience the future of job hunting with our cutting-edge features
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Feature Card 1 */}
                    <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Briefcase className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Apply for Jobs</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Find the best jobs tailored for your skills and apply with one click using our smart matching algorithm.
                            </p>
                            <div className="mt-6 flex items-center gap-2 text-sm text-indigo-600 font-semibold">
                                <TrendingUp className="w-4 h-4" />
                                <span>95% Match Accuracy</span>
                            </div>
                        </div>
                    </div>

                    {/* Feature Card 2 */}
                    <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Find the Best Candidates</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Find the best candidates as a company or agency faster than ever with our advanced filtering system.
                            </p>
                            <div className="mt-6 flex items-center gap-2 text-sm text-green-600 font-semibold">
                                <Target className="w-4 h-4" />
                                <span>50K+ Active Candidates</span>
                            </div>
                        </div>
                    </div>

                    {/* Feature Card 3 */}
                    <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden sm:col-span-2 lg:col-span-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Enhance Your Resume with AI</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Get AI-powered suggestions to improve your resume and stand out from the competition with smart recommendations.
                            </p>
                            <div className="mt-6 flex items-center gap-2 text-sm text-purple-600 font-semibold">
                                <Zap className="w-4 h-4" />
                                <span>AI-Powered Enhancement</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <button className="group bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-indigo-500/25 hover:scale-105 transition-all duration-300">
                        <Link href={"/login/jobseeker"} className="flex items-center gap-3">
                            Get Started Today
                            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        </Link>
                    </button>
                </div>
            </div>
        </section>
    )
}