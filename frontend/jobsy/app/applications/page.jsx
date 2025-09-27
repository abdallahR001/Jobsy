import { cookies } from "next/headers"
import Image from "next/image"
import { redirect } from "next/navigation"

export default async function Applications()
{
    const cookieStore = cookies()
    
    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/jobseeker")

    const response = await fetch(`http://localhost:4000/api/applications/my-applications`,{
        headers:{
            token:token
        }
    })

    if(response.status === 401 || response.status === 403)
        redirect("/login/jobseeker")

    const data = await response.json()

    console.log(data);

    const applications = data.applications
    
    return(
        <div className="w-full h-screen flex flex-col items-center justify-center gap-3">
            {
                applications.length > 0 ?
                applications.map((application) => (
                    <div key={application.id} className="w-1/2 p-4 shadow-sm rounded-2xl">
                        <span className="text-green-500">{application.status}</span>
                        <div className="flex gap-2 items-center">
                            {
                            application.job.Company.image ? 
                            <Image 
                            src={`http://localhost:4000/${application.job.Company.image}`}
                            alt="company image"
                            width={300}
                            height={300}
                            priority
                            className="w-10 h-10 rounded-full"
                            />
                            :
                            <div className="h-10 w-10 rounded-full bg-indigo-500"></div>
                        }
                        <h1>{application.job.Company.name}</h1>
                        </div>
                        <h1>{application.job.title}</h1>
                        <span>job salary: {application.job.salary} - required years: {application.job.years_of_excperience}</span>
                        <span>location: {application.job.location} 📍</span>
                        <p>{application.cover_letter}</p>
                    </div>
                ))
                : "no applications yet"
            }
        </div>
    )
}