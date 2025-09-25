import { redirect } from "next/dist/server/api-utils"
import { cookies } from "next/headers"
import Image from "next/image"

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
        <div className="w-full h-screen p-6 flex gap-5 items-center justify-center flex-col">
            <h1 className="text-gray-800 text-left text-2xl">All Applicants</h1>
            {
                data.applicants.map((applicant) =>
                (
                    <div key={applicant.id} className="w-full p-4 shadow-sm rounded-2xl">
                        <div>
                            <div className="flex items-center gap-2">
                            {
                                applicant.image ? 
                                <Image 
                                    src={`http://localhost:4000/${applicant.image}`}
                                    width={300}
                                    height={300}
                                    priority
                                    className="w-10 h-10 rounded-full" 
                                    alt="applicant image"
                                />
                                : 
                                <div className="w-10 h-10 rounded-full bg-gray-500"></div>
                            }
                            <h1>{applicant.first_name} {applicant.last_name}</h1>
                        </div>
                        <span className="text-gray-500 mt-3">{applicant.email}</span>
                        {
                            applicant.applications.map((application) => (
                                <div key={application.id}>
                                    <p>
                                        {application.cover_letter}
                                    </p>
                                    <span className="text-gray-500">{application.salary ? application.salary : "N/A"} 💰</span>
                                </div>
                            ))
                        }
                        </div>
                        <div>
                            {
                                applicant.applications.map((application) => (
                                    <h1 key={application.id}>{application.job.title}</h1>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
    
}