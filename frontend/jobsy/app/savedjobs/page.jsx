import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import JobCard from "../components/JobCard/JobCard"
export default async function SavedJobs(){

    const cookieStore = cookies()
    
    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/employer")

    const response = await fetch(`http://localhost:4000/api/users/savedjobs`,{
        headers:{
            token:token
        }
    })

    if(response.status === 401 || response.status === 403)
        redirect("/login/jobseeker")

    const data = await response.json()

    console.log(data)

    const jobs = data.savedJobs

    return(
        <div className="flex items-center justify-center w-full h-screen flex-col gap-9">
            <h1 className="text-gray-800 text-3xl font-bold">saved jobs</h1>
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
                jobs.map((job) => (
                    <JobCard key={job.id} job={job}/>
                ))
            }
        </div>
        </div>
    )

}