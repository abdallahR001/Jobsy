import CompanyDescription from "@/app/components/CompanyProfile/Description"
import CompanyEmployeesCount from "@/app/components/CompanyProfile/EmployeesCount"
import CompanyImage from "@/app/components/CompanyProfile/Image"
import CompanyName from "@/app/components/CompanyProfile/Name"
import RecentJobsSection from "@/app/components/RecentJobsSection/RecentJobsSection"
import { redirect } from "next/dist/server/api-utils"
import { cookies } from "next/headers"
import { Globe, Mail, Users, Building2 } from "lucide-react"

export default async function MyCompany() {
    const cookieStore = cookies()
    
    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/employer")

    const response = await fetch("http://localhost:4000/api/companies",{
        headers:{
            token:token
        }
    })

    const data = await response.json()

    const company = data.company

    return(
        <div className="w-full p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Company Profile</h1>
                    <p className="text-lg text-gray-600">Manage your company information</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
                    {/* Company Image */}
                    <div className="flex justify-center mb-6">
                        <CompanyImage companyImage={company.image}/>
                    </div>

                    {/* Company Name */}
                    <div className="flex justify-center mb-4">
                        <CompanyName name={company.name}/>
                    </div>

                    {/* Company Email */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{company.email}</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-6"></div>

                    {/* Company Description */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Building2 className="w-5 h-5 text-indigo-600" />
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">About Company</h3>
                        </div>
                        <CompanyDescription description={company.description}/>
                    </div>

                    {/* Company Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* Employees Count */}
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Employees</p>
                                    <CompanyEmployeesCount employeesCount={company.employees_count}/>
                                </div>
                            </div>
                        </div>

                        {/* Website */}
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Website</p>
                                    {company.website !== "null" ? (
                                        <a 
                                            href={`https://${company.website}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
                                        >
                                            {company.website}
                                        </a>
                                    ) : (
                                        <span className="text-sm text-gray-400">No website provided</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Jobs Section */}
                <RecentJobsSection />
            </div>
        </div>
    )
}