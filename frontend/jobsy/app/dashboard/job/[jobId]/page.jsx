import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, DollarSign, Clock, Users, MapPin, Award, FileText } from "lucide-react";

export default async function Getjob({params}){
    const cookieStore = cookies()

    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/employer")

    const jobId = (await params).jobId

    const response = await fetch(`http://localhost:4000/api/jobs/dashboard/${jobId}`,{
        headers:{
            token: token
        }
    })

    const data = await response.json()

    const job = data.job

    const getProfileImage = (user) => {
        if (!user?.image) return "/default-avatar.png"
        return user.image.startsWith("http")
            ? user.image
            : `http://localhost:4000/${user.image}`
    }
    
    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Job Header Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8 mb-8">
                    {/* Title Section */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <Briefcase className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        job.job_status === 'open' 
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {job.job_status}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 capitalize">
                                        {job.type}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed text-base">{job.description}</p>
                    </div>

                    {/* Job Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Salary</p>
                                    <p className="text-lg font-bold text-gray-900">${job.salary}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Experience</p>
                                    <p className="text-lg font-bold text-gray-900">{job.minimum_years_required} years</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Applicants</p>
                                    <p className="text-lg font-bold text-gray-900">{job._count.applications}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Skills Required</p>
                                    <p className="text-lg font-bold text-gray-900">{job.skills.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Required Skills */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Award className="w-5 h-5 text-indigo-600" />
                            Required Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill) => (
                                <span 
                                    key={skill.id} 
                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 capitalize text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    {skill.name}
                                </span>
                            ))}  
                        </div>
                    </div>
                </div>

                {/* Applicants Section */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Applicants</h2>
                            <p className="text-sm text-gray-500">{job.applications.length} candidates applied</p>
                        </div>
                    </div>

                    {job.applications.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {job.applications.map((applicant) => (
                                <Link 
                                    href={`/dashboard/userprofile/${applicant.user.id}`} 
                                    key={applicant.id} 
                                    className="group bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-indigo-50 hover:to-purple-50 rounded-2xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Profile Image */}
                                        <div className="flex-shrink-0">
                                            {applicant.user.image ? (
                                                <Image 
                                                    src={getProfileImage(applicant.user)}
                                                    width={80}
                                                    height={80}
                                                    priority
                                                    alt="profile image"
                                                    className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                                                    {applicant.user.first_name?.[0]}
                                                </div>
                                            )}
                                        </div>

                                        {/* Applicant Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {applicant.user.first_name} {applicant.user.last_name}
                                            </h3>
                                            
                                            <p className="text-indigo-600 font-semibold text-sm mb-3 flex items-center gap-2">
                                                <Briefcase className="w-4 h-4" />
                                                {applicant.user.title}
                                            </p>

                                            {applicant.cover_letter && (
                                                <div className="bg-white rounded-xl p-4 mb-3 border border-gray-200">
                                                    <p className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
                                                        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                                        <span>{applicant.cover_letter}</span>
                                                    </p>
                                                </div>
                                            )}

                                            <div className="flex flex-wrap gap-3">
                                                <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5">
                                                    <DollarSign className="w-4 h-4" />
                                                    ${applicant.salary}
                                                </span>
                                                <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4" />
                                                    {applicant.user.location}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Arrow Icon */}
                                        <div className="flex items-center justify-center">
                                            <div className="w-10 h-10 bg-indigo-100 group-hover:bg-indigo-500 rounded-xl flex items-center justify-center transition-all duration-300">
                                                <svg className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                <Users className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No applicants yet</h3>
                            <p className="text-gray-600">Be patient, candidates will start applying soon</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}