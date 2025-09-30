import FollowCompanyButton from "@/app/components/FollowCompanyButton/FollowCompanyButton"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import JobCard from "@/app/components/JobCard/JobCard"
import { Building2, Mail, Users, Briefcase, Globe, Heart } from "lucide-react"

export default async function Company({params})
{
    const cookieStore = cookies()
        
    const token = (await cookieStore).get("token")?.value
    
    if(!token)
        redirect("/login/jobseeker")

    const companyId = (await params).companyId

    const response = await fetch(`http://localhost:4000/api/users/company/${companyId}`,{
        headers:{
            token:token
        }
    })

    if(response.status === 401 || response.status === 403)
        redirect("/login/jobseeker")

    const data = await response.json()

    const company = data.company
    const jobs = data.jobs

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Company Header Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
                    {/* Company Name & Follow Button */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-8 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{company.name}</h1>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm">{company.email}</span>
                                </div>
                            </div>
                        </div>
                        
                        <FollowCompanyButton companyId={company.id} initialIsCompanyFollowed={data.isFollowed}/>
                    </div>

                    {/* Company Description */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-indigo-600" />
                            About Company
                        </h2>
                        <p className="text-gray-700 leading-relaxed max-w-4xl">
                            {company.description}
                        </p>
                    </div>

                    {/* Company Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {/* Followers */}
                        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4 border border-pink-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Followers</p>
                                    <p className="text-2xl font-bold text-gray-900">{company._count.followers}</p>
                                </div>
                            </div>
                        </div>

                        {/* Available Jobs */}
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                    <Briefcase className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Open Positions</p>
                                    <p className="text-2xl font-bold text-gray-900">{company._count.jobs}</p>
                                </div>
                            </div>
                        </div>

                        {/* Employees */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Employees</p>
                                    <p className="text-2xl font-bold text-gray-900">{company.employees_count}</p>
                                </div>
                            </div>
                        </div>

                        {/* Website */}
                        {company.website && company.website !== "null" && (
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                        <Globe className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-gray-500 font-medium mb-1">Website</p>
                                        <a 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            href={`https://${company.website}`}
                                            className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200 truncate block"
                                        >
                                            {company.website}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Jobs Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Open Positions</h2>
                            <p className="text-gray-600">Explore available opportunities at {company.name}</p>
                        </div>
                    </div>

                    {jobs.length > 0 ? (
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {jobs.map((job) => (
                                <JobCard key={job.id} job={job}/>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-16 text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <Briefcase className="w-10 h-10 text-gray-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Open Positions</h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                                This company doesn't have any job openings at the moment. Follow them to get notified when new positions are posted!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}