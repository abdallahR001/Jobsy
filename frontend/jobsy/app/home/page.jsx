"use client"
import MainSearch from "../components/SearchForm/MainSearch"
import { Briefcase, TrendingUp, Users, Building2, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
    // Dummy data للوظائف
    const recentJobs = [
        {
            id: 1,
            title: "Senior Frontend Developer",
            company: "Tech Solutions Inc",
            location: "Cairo, Egypt",
            type: "Full-Time",
            salary: "$50,000 - $70,000",
            logo: null,
            postedAt: "2 days ago"
        },
        {
            id: 2,
            title: "UI/UX Designer",
            company: "Creative Studio",
            location: "Remote",
            type: "Remote",
            salary: "$40,000 - $60,000",
            logo: null,
            postedAt: "3 days ago"
        },
        {
            id: 3,
            title: "Backend Engineer",
            company: "Data Corp",
            location: "Alexandria, Egypt",
            type: "Full-Time",
            salary: "$45,000 - $65,000",
            logo: null,
            postedAt: "5 days ago"
        },
        {
            id: 4,
            title: "Product Manager",
            company: "Innovation Labs",
            location: "Cairo, Egypt",
            type: "Full-Time",
            salary: "$60,000 - $80,000",
            logo: null,
            postedAt: "1 week ago"
        },
        {
            id: 5,
            title: "Mobile Developer",
            company: "App Factory",
            location: "Remote",
            type: "Part-Time",
            salary: "$35,000 - $50,000",
            logo: null,
            postedAt: "1 week ago"
        },
        {
            id: 6,
            title: "DevOps Engineer",
            company: "Cloud Systems",
            location: "Cairo, Egypt",
            type: "Full-Time",
            salary: "$55,000 - $75,000",
            logo: null,
            postedAt: "2 weeks ago"
        }
    ]

    // Dummy data للشركات
    const featuredCompanies = [
        { id: 1, name: "Tech Solutions Inc", employees: 250, openJobs: 12, logo: null },
        { id: 2, name: "Creative Studio", employees: 80, openJobs: 5, logo: null },
        { id: 3, name: "Data Corp", employees: 500, openJobs: 20, logo: null },
        { id: 4, name: "Innovation Labs", employees: 150, openJobs: 8, logo: null },
        { id: 5, name: "App Factory", employees: 100, openJobs: 6, logo: null },
        { id: 6, name: "Cloud Systems", employees: 300, openJobs: 15, logo: null },
        { id: 7, name: "Digital Agency", employees: 60, openJobs: 4, logo: null },
        { id: 8, name: "Marketing Pro", employees: 120, openJobs: 7, logo: null }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
            {/* Hero Section with Search */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-indigo-700 px-6 py-3 rounded-full font-semibold border border-indigo-100 shadow-lg mb-6 animate-bounce">
                            <TrendingUp className="w-5 h-5" />
                            <span>50,000+ Jobs Available</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Find Your Dream Job <br/>
                            <span className="text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text">
                                Today
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover thousands of opportunities from top companies. Your next career move starts here.
                        </p>
                    </div>

                    <MainSearch />
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 text-center hover:scale-105 transition-transform duration-300">
                            <div className="text-4xl font-bold text-indigo-600 mb-2">50K+</div>
                            <div className="text-gray-600 font-semibold">Active Jobs</div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 text-center hover:scale-105 transition-transform duration-300">
                            <div className="text-4xl font-bold text-green-600 mb-2">100K+</div>
                            <div className="text-gray-600 font-semibold">Job Seekers</div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 text-center hover:scale-105 transition-transform duration-300">
                            <div className="text-4xl font-bold text-purple-600 mb-2">5K+</div>
                            <div className="text-gray-600 font-semibold">Companies</div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 text-center hover:scale-105 transition-transform duration-300">
                            <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
                            <div className="text-gray-600 font-semibold">Success Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Jobs Section */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-2">Latest Job Openings</h2>
                            <p className="text-lg text-gray-600">Fresh opportunities posted recently</p>
                        </div>
                        <Link 
                            href="/search"
                            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            <span>View All Jobs</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {recentJobs.map((job) => (
                            <div 
                                key={job.id}
                                className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                                        <Briefcase className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                                        {job.type}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                                    {job.title}
                                </h3>
                                <p className="text-gray-600 mb-4">{job.company}</p>
                                
                                <div className="space-y-2 text-sm text-gray-600 mb-4">
                                    <p>📍 {job.location}</p>
                                    <p>💰 {job.salary}</p>
                                    <p className="text-gray-400">🕒 {job.postedAt}</p>
                                </div>

                                <Link 
                                    href={`/job/${job.id}`}
                                    className="block w-full bg-indigo-600 text-white py-3 rounded-xl text-center font-semibold hover:bg-indigo-700 transition-colors duration-300"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>

                    <Link 
                        href="/search"
                        className="md:hidden flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                    >
                        <span>View All Jobs</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Featured Companies Section */}
            <section className="py-16 px-4 bg-white/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Companies</h2>
                        <p className="text-lg text-gray-600">Explore top companies hiring right now</p>
                    </div>

                    {/* Scrollable Container */}
                    <div className="overflow-x-auto overflow-y-hidden pb-6">
                        <div className="flex gap-6 min-w-max">
                            {featuredCompanies.map((company) => (
                                <Link
                                    key={company.id}
                                    href={`/company/${company.id}`}
                                    className="group w-80 flex-shrink-0 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                                            <Building2 className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors duration-300">
                                                {company.name}
                                            </h3>
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                                            <Users className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                                            <p className="text-sm font-bold text-gray-900">{company.employees}</p>
                                            <p className="text-xs text-gray-500">Employees</p>
                                        </div>
                                        <div className="bg-indigo-50 rounded-xl p-3 text-center">
                                            <Briefcase className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                                            <p className="text-sm font-bold text-gray-900">{company.openJobs}</p>
                                            <p className="text-xs text-gray-500">Open Jobs</p>
                                        </div>
                                    </div>

                                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
                                        Follow Company
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <p className="text-center text-sm text-gray-500 mt-4">
                        ← Scroll to see more companies →
                    </p>
                </div>
            </section>

            <style jsx>{`
                /* Custom scrollbar styling */
                .overflow-x-auto {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
                }
                
                .overflow-x-auto::-webkit-scrollbar {
                    height: 8px;
                }
                
                .overflow-x-auto::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 10px;
                }
                
                .overflow-x-auto::-webkit-scrollbar-thumb {
                    background: rgba(99, 102, 241, 0.3);
                    border-radius: 10px;
                }
                
                .overflow-x-auto::-webkit-scrollbar-thumb:hover {
                    background: rgba(99, 102, 241, 0.5);
                }
            `}</style>
        </div>
    )
}