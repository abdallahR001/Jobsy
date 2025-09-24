import Link from "next/link";
import JobDashboardCard from "../JobCard/JobDashboardCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";

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
    <div className="flex flex-col gap-6 mt-8 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Recent Jobs</h2>
        <Link href={"/dashboard/newjob"} className="flex items-center gap-1 cursor-pointer duration-300 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full transition">
          Post a New Job
          <Plus/>
        </Link>
      </div>

      {/* Jobs List */}
      {
        recentJobs.length > 0 ?
        <div className="flex flex-col gap-4 md:grid md:grid-cols-1 p-4 rounded-xl shadow-sm w-full">
        {recentJobs.map((job) => (
          <JobDashboardCard key={job.id} job={job} />
        ))}
      </div>
      : <h1 className="text-2xl text-indigo-500 font-bold text-center mt-5">you have no jobs yet</h1>
      }
    </div>
  );
}
