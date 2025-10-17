"use client"
import { Briefcase, TrendingUp, Users, Building2, Cpu } from "lucide-react"
import MainSearch from "../SearchForm/MainSearch"
import Link from "next/link"
import Image from "next/image"
import SaveJobButton from "../SaveJobButton/SaveJobButton"
import FollowCompanyButton from "../FollowCompanyButton/FollowCompanyButton"

export default function HomePageContent({activeJobsCount,jobSeekersCount,companiesCount,jobsFeed,companiesFeed})
{

    const getProfileImage = (user) => {
    if (!user?.image) return "/default-avatar.png" // صورة افتراضية لو مفيش صورة
    return user.image.startsWith("http")
      ? user.image // من جوجل أو أي لينك خارجي
      : `http://localhost:4000/${user.image}` // متخزنة في السيرفر بتاعك
  }

    return(
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
                            <div className="text-4xl font-bold text-indigo-600 mb-2">{activeJobsCount}</div>
                            <div className="text-gray-600 font-semibold">Active Jobs</div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 text-center hover:scale-105 transition-transform duration-300">
                            <div className="text-4xl font-bold text-green-600 mb-2">{jobSeekersCount}</div>
                            <div className="text-gray-600 font-semibold">Job Seekers</div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 text-center hover:scale-105 transition-transform duration-300">
                            <div className="text-4xl font-bold text-purple-600 mb-2">{companiesCount}</div>
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
                        {/* <Link 
                            href="/search"
                            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            <span>View All Jobs</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link> */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {jobsFeed.length > 0 ? jobsFeed.map((job) => (
                            <div 
                                key={job.id}
                                className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <Link href={`/company/${job.Company.id}`} className="flex items-center gap-3">
                                        {
                                            job.Company.image ? 
                                            <Image 
                                            src={getProfileImage(job.Company)}
                                            width={150}
                                            height={150}
                                            alt="company profile image"
                                            priority
                                            className="w-12 h-12 rounded-2xl"
                                            />
                                            :
                                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                                            <Briefcase className="w-6 h-6 text-white" />
                                            </div>
                                        }
                                        <span className="text-sm hover:text-indigo-500 duration-300 transition-all text-gray-800 font-bold">{job.Company.name}</span>
                                    </Link>
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
                                    <p>💰 {job.salary ? job.salary : "Not specified"}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link 
                                    href={`/job/${job.id}`}
                                    className="block w-full bg-indigo-600 text-white py-3 rounded-xl text-center font-semibold hover:bg-indigo-700 transition-colors duration-300"
                                    >
                                    View Details
                                    </Link>
                                    <SaveJobButton jobId={job.id} initialIsSaved={job.isSaved}/>
                                </div>
                            </div>
                        ))
                        :
                        <h1>there is no jobs that matches your field or skills yet</h1>
                    }
                    </div>

                    {/* <Link 
                        href="/search"
                        className="md:hidden flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                    >
                        <span>View All Jobs</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link> */}
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
                            {companiesFeed.length > 0 ? companiesFeed.map((company) => (
                                <Link
                                    key={company.id}
                                    href={`/company/${company.id}`}
                                    className="group w-80 flex-shrink-0 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        {
                                            company.image ? 
                                            <Image 
                                                src={getProfileImage(company)}
                                                width={150}
                                                height={150}
                                                alt="company profile image"
                                                priority
                                                className="w-12 h-12 rounded-2xl"
                                            />
                                            :
                                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                                            <Briefcase className="w-6 h-6 text-white" />
                                            </div>
                                        }
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors duration-300">
                                                {company.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                                            <Users className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                                            <p className="text-sm font-bold text-gray-900">{company.employees_count}</p>
                                        </div>
                                        <div className="bg-indigo-50 rounded-xl p-3 text-center">
                                            <Briefcase className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                                            <p className="text-sm font-bold text-gray-900">{company._count.jobs}</p>
                                            <p className="text-xs text-gray-500">Open Jobs</p>
                                        </div>
                                    </div>

                                    <FollowCompanyButton companyId={company.id} initialIsCompanyFollowed={company.isFollowed}/>
                                </Link>
                                
                            ))
                            :
                            <h1>there is no companies in your field now</h1>
                        }
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