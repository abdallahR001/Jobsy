import JobDashboardCard from "@/app/components/JobCard/JobDashboardCard"
import { Plus } from "lucide-react"
import { redirect } from "next/dist/server/api-utils"
import { cookies } from "next/headers"
import Link from "next/link"

export default async function MyJobs(){
    const cookieStore = cookies()

    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/employer")

    const response = await fetch("http://localhost:4000/api/jobs/companyjobs",{
        cache:"no-cache",
        headers:{
            token: token
        }
    })

    const data = await response.json()

    console.log(data)
    return(
        <div className="p-6 w-full">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Your Jobs</h1>
                <Link 
                    href={"/dashboard/newjob"} 
                    className="group bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 flex items-center gap-2 hover:scale-105"
                    >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"/>
                    <span>Post a New Job</span>
                </Link>
            </div>
            <div className="flex flex-col gap-4 md:grid md:gap-4 md:grid-cols-1 shadow-sm p-4 rounded-2xl">
                {
                    data.jobs.map((job) =>(
                        <JobDashboardCard key={job.id} job={job}/>
                    ))
                }
            </div>
        </div>
    )
}