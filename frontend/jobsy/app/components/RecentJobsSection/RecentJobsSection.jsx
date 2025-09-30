import Link from "next/link";
import JobDashboardCard from "../JobCard/JobDashboardCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Plus, Briefcase, Sparkles } from "lucide-react";

export default async function RecentJobsSection() {
  const cookieStore = cookies()

  const token = (await cookieStore).get("token")?.value

  if(!token)
    redirect("/login/employer")

  const response = await fetch("http://localhost:4000/api/companies/dashboard",{
    cache:"no-cache",
    headers:{
      token: token
    }
  })

  if(response.status === 401 || response.status === 403)
  {
    redirect("/login/employer")
  }

  const data = await response.json()

  const recentJobs = data.recentJobs

  return (
    <div className="flex flex-col z-10 gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Jobs</h2>
          <p className="text-gray-600">Manage your latest job postings</p>
        </div>
        
        <Link 
          href={"/dashboard/newjob"} 
          className="group bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 flex items-center gap-2 hover:scale-105"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"/>
          <span>Post a New Job</span>
        </Link>
      </div>

      {/* Jobs List */}
      {
        recentJobs.length > 0 ?
        <div className="grid grid-cols-1 gap-6">
          {recentJobs.map((job) => (
            <JobDashboardCard key={job.id} job={job} />
          ))}
        </div>
        : 
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-16 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Jobs Yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start building your team by posting your first job opening. It only takes a few minutes!
          </p>
          <Link 
            href={"/dashboard/newjob"} 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            <span>Create Your First Job</span>
          </Link>
        </div>
      }
    </div>
  );
}