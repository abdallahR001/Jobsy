import FollowCompanyButton from "@/app/components/FollowCompanyButton/FollowCompanyButton"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import JobCard from "@/app/components/JobCard/JobCard"
export default async function Company({params})
{
    const cookieStore = cookies()
        
    const token = (await cookieStore).get("token")?.value
    
    if(!token)
        redirect("/login/jobseeker")

    const companyId = (await params).companyId

    const response = await fetch(`http://localhost:4000/api/users/company/${companyId}`,{
        headers:{
            token:token
        }
    })

    if(response.status === 401 || response.status === 403)
        redirect("/login/jobseeker")

    const data = await response.json()

    console.log(data)

    const company = data.company

    const jobs = data.jobs

    return(
        <div className="w-full h-screen flex gap-2 flex-col items-center justify-center">
            <div className="flex gap-2 items-center">
                <h1>{company.name}</h1>
                <FollowCompanyButton companyId={company.id} initialIsCompanyFollowed={data.isFollowed}/>
            </div>
            <span>{company.email}</span>
            <p>{company.description}</p>
            <div className="flex gap-2">
                <span>{company._count.followers} followers</span>
                <span>{company._count.jobs} available jobs</span>
                <span>{company.employees_count}</span>
            </div>
            {
                company.website !== null &&(
                <a target="_blank" href={`https://${company.website}`}>{company.website}</a>
                )
            }
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    jobs.map((job) =>(
                        <JobCard key={job.id} job={job}/>
                    ))
                }
            </div>
        </div>
    )
}