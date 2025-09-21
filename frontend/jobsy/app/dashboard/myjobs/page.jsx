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
                <Link href={"/dashboard/newjob"} className="flex itmes-center gap-1 cursor-pointer duration-300 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full transition">
                    Post a New Job
                    <Plus />
                </Link>
            </div>
            <div className="grid gap-4 grid-cols-1 shadow-sm p-4 rounded-2xl">
                {
                    data.jobs.map((job) =>(
                        <JobDashboardCard key={job.id} job={job}/>
                    ))
                }
            </div>
        </div>
    )
}