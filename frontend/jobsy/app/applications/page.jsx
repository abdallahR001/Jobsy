import { cookies } from "next/headers"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Briefcase, MapPin, DollarSign, Calendar, Building2, FileText, CheckCircle, Clock, XCircle } from "lucide-react"
import Link from "next/link"

export default async function Applications()
{
    const cookieStore = cookies()
    
    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/jobseeker")

    const response = await fetch(`http://localhost:4000/api/applications/my-applications`,{
        headers:{
            token:token
        }
    })

    if(response.status === 401 || response.status === 403)
        redirect("/login/jobseeker")

    const data = await response.json()

    const applications = data.applications
    
    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">My Applications</h1>
                            <p className="text-lg text-gray-600">{applications.length} applications submitted</p>
                        </div>
                    </div>
                </div>

                {/* Applications List */}
                {applications.length > 0 ? (
                    <div className="space-y-4">
                        {applications.map((application) => (
                            <div 
                                key={application.id}
                                className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300"
                            >
                                {/* Status Badge */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold text-sm ${
                                        application.status === "accepted" 
                                            ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-2 border-green-300"
                                            : application.status === "rejected"
                                                ? "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-2 border-red-300"
                                                : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-2 border-gray-300"
                                    }`}>
                                        {application.status === "accepted" ? (
                                            <CheckCircle className="w-4 h-4" />
                                        ) : application.status === "rejected" ? (
                                            <XCircle className="w-4 h-4" />
                                        ) : (
                                            <Clock className="w-4 h-4" />
                                        )}
                                        <span className="capitalize">{application.status}</span>
                                    </div>

                                    {application.createdAt && (
                                        <span className="text-sm text-gray-500">
                                            {new Date(application.createdAt).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Left: Company & Job Info */}
                                    <div className="lg:col-span-2">
                                        {/* Company */}
                                        <Link 
                                            href={`/company/${application.job.Company.id}`}
                                            className="flex items-center gap-3 mb-4 group/company hover:bg-gray-50 p-3 rounded-2xl transition-colors duration-200"
                                        >
                                            {application.job.Company.image ? (
                                                <Image 
                                                    src={`http://localhost:4000/${application.job.Company.image}`}
                                                    alt="company image"
                                                    width={48}
                                                    height={48}
                                                    priority
                                                    className="w-12 h-12 rounded-2xl object-cover shadow-md ring-2 ring-white"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
                                                    <Building2 className="w-6 h-6 text-white" />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-semibold text-gray-900 group-hover/company:text-indigo-600 transition-colors duration-200">
                                                    {application.job.Company.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">View company</p>
                                            </div>
                                        </Link>

                                        {/* Job Title */}
                                        <Link 
                                            href={`/job/${application.job.id}`}
                                            className="block mb-4"
                                        >
                                            <h2 className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                                                {application.job.title}
                                            </h2>
                                        </Link>

                                        {/* Job Details Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                            {/* Location */}
                                            {application.job.location && (
                                                <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl border border-blue-100">
                                                    <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                                    <span className="text-sm text-gray-700">{application.job.location}</span>
                                                </div>
                                            )}

                                            {/* Salary */}
                                            {application.job.salary && (
                                                <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-xl border border-green-100">
                                                    <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                    <span className="text-sm text-gray-700">{application.job.salary}</span>
                                                </div>
                                            )}

                                            {/* Experience */}
                                            {application.job.minimum_years_required && (
                                                <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-xl border border-orange-100">
                                                    <Calendar className="w-4 h-4 text-orange-600 flex-shrink-0" />
                                                    <span className="text-sm text-gray-700">
                                                        {application.job.minimum_years_required} years exp.
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right: Cover Letter */}
                                    <div className="lg:col-span-1">
                                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 h-full">
                                            <div className="flex items-center gap-2 mb-3">
                                                <FileText className="w-4 h-4 text-gray-600" />
                                                <h4 className="font-semibold text-gray-900 text-sm">Cover Letter</h4>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-6">
                                                {application.cover_letter}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-16 text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Briefcase className="w-10 h-10 text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Applications Yet</h3>
                        <p className="text-gray-600 max-w-md mx-auto mb-8">
                            Start applying to jobs and track your applications here.
                        </p>
                        <Link 
                            href="/home"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <Briefcase className="w-5 h-5" />
                            <span>Browse Jobs</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}