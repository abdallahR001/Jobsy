import { Rocket, MapPin, Clock, DollarSign, Users, Calendar, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function JobDetails({ params }) {

  const cookieStore = cookies()
            
  const token = (await cookieStore).get("token")?.value
        
  if(!token)
        redirect("/login/jobseeker")

  const jobId = (await params).jobId;  

  const response = await fetch(`http://localhost:4000/api/jobs/${jobId}`,{
    headers:{
        token:token
    }
  });

  if(response.status === 401 || response.status === 403)
        redirect("/login/jobseeker")

  const data = await response.json();

  const job = data.job

  console.log(data);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 mb-8 border border-white/20">
          {/* Company Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-5">
              <div className="relative">
                <Image
                  src={`http://localhost:4000/${job.Company.image}`}
                  width={80}
                  height={80}
                  priority
                  alt="company image"
                  className="w-20 h-20 rounded-2xl object-cover shadow-lg ring-4 ring-white"
                />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div className="space-y-2">
                <Link href={`/company/${job.Company.id}`} className="text-2xl font-bold text-gray-900 tracking-tight">
                  {job.Company.name}
                </Link>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
                      job.job_status === "open"
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      job.job_status === "open" ? "bg-emerald-500" : "bg-red-500"
                    }`}></div>
                    {job.job_status}
                  </span>
                </div>
              </div>
            </div>

            {/* Applications Count */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-2xl font-bold text-indigo-700">
                    {job._count.applications}
                  </p>
                  <p className="text-sm text-indigo-600 font-medium">Applications</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Title & Type */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h2 className="text-4xl font-bold text-gray-900 capitalize leading-tight">
                {job.title}
              </h2>
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-2xl text-sm font-semibold shadow-lg">
                <Clock className="w-4 h-4" />
                {job.type}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-white/20 ">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                Job Description
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {job.description}
              </p>
            </div>

            {/* Skills */}
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill, index) => (
                  <span
                    className="group relative bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 capitalize px-6 py-3 rounded-2xl text-sm font-semibold shadow-sm border border-indigo-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default"
                    key={skill.id}
                  >
                    <span className="relative z-10">{skill.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Job Details */}
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Job Details</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Experience</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {job.minimum_years_required ? `${job.minimum_years_required} years` : "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Salary</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {job.salary ? job.salary : "Negotiable"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Location</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {job.location ? job.location : "Remote"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-white/20">
              {
                job.job_status === "closed" ?
                <div className="w-full cursor-not-allowed rounded-2xl items-center text-center justify-center gap-3 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 px-8 py-4">
                    <p className="text-gray-100 flex items-center justify-center gap-3">job is closed <X/></p>
                </div>
                :
                data.isApplied ? 
                <div className="w-full cursor-not-allowed rounded-2xl items-center text-center justify-center gap-3 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 px-8 py-4">
                    <p className="text-gray-100 flex items-center justify-center gap-3">already applied <Clock/></p>
                </div>
                :
                <Link
                href={`/apply/${job.id}`}
                className="group relative w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-indigo-500/25 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10">Apply Now!</span>
                <Rocket className="relative z-10 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                
                {/* Animated background */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                  <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                  <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
                </div>
              </Link>
              }
               
              <p className="text-center text-sm text-gray-500 mt-4">
                Join our amazing team today! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}