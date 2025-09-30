import { redirect } from "next/dist/server/api-utils"
import { cookies } from "next/headers"
import Image from "next/image"
import { Users, Mail, DollarSign, FileText, Briefcase, User } from "lucide-react"

export default async function Applicants(){
    const cookieStore = cookies()

    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/employer")
    
    const response = await fetch("http://localhost:4000/api/companies/applicants",{
        headers:{
            token: token
        }
    })

    if(response.status === 401 || response.status === 403)
        redirect("/login/employer")

    const data = await response.json()

    console.log(data);
    

    return(
        <div className="w-full min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">All Applicants</h1>
                            <p className="text-lg text-gray-600">{data.applicants.length} total applicants</p>
                        </div>
                    </div>
                </div>

                {/* Applicants List */}
                {data.applicants.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {data.applicants.map((applicant) => (
                            <div 
                                key={applicant.id} 
                                className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Background gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                <div className="relative z-10 p-6">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        {/* Left Section - Applicant Info */}
                                        <div className="flex-1">
                                            {/* Profile */}
                                            <div className="flex items-center gap-4 mb-6">
                                                {applicant.image ? (
                                                    <Image 
                                                        src={`http://localhost:4000/${applicant.image}`}
                                                        width={80}
                                                        height={80}
                                                        priority
                                                        className="w-16 h-16 rounded-2xl object-cover shadow-lg ring-4 ring-white" 
                                                        alt="applicant image"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                                                        <User className="w-8 h-8 text-white" />
                                                    </div>
                                                )}
                                                <div>
                                                    <h2 className="text-2xl font-bold text-gray-900 capitalize">
                                                        {applicant.first_name} {applicant.last_name}
                                                    </h2>
                                                    <h3>{applicant.title}</h3>
                                                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                                                        <Mail className="w-4 h-4" />
                                                        <span className="text-sm">{applicant.email}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Applications */}
                                            <div className="space-y-4">
                                                {applicant.applications.map((application) => (
                                                    <div key={application.id} className="space-y-4">
                                                        {/* Job Title */}
                                                        <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-xl border border-indigo-100">
                                                            <Briefcase className="w-4 h-4 text-indigo-600" />
                                                            <span className="font-semibold text-indigo-900">
                                                                Applied for: {application.job.title}
                                                            </span>
                                                        </div>

                                                        {/* Cover Letter */}
                                                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <FileText className="w-4 h-4 text-gray-600" />
                                                                <h3 className="font-semibold text-gray-900">Cover Letter</h3>
                                                            </div>
                                                            <p className="text-gray-700 leading-relaxed max-w-3xl break-words">
                                                                {application.cover_letter}
                                                            </p>
                                                        </div>

                                                        {/* Salary */}
                                                        <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 rounded-xl border border-green-100 w-fit">
                                                            <DollarSign className="w-5 h-5 text-green-600" />
                                                            <div>
                                                                <p className="text-xs text-green-600 font-medium">Expected Salary</p>
                                                                <p className="text-lg font-bold text-green-900">
                                                                    {application.salary || "Not specified"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right Section - Actions */}
                                        <div className="lg:w-64 flex flex-col gap-3">
                                            <button className="w-full cursor-pointer bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105">
                                                Accept
                                            </button>
                                            <button className="w-full cursor-pointer bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105">
                                                Reject
                                            </button>
                                            <button className="w-full cursor-pointer bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-300 transition-all duration-300">
                                                View Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-16 text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-10 h-10 text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Applicants Yet</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            When candidates apply to your jobs, they will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}