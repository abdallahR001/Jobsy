import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Getjob({params}){
    const cookieStore = cookies()

    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/employer")

    const jobId = (await params).jobId

    const response = await fetch(`http://localhost:4000/api/jobs/dashboard/${jobId}`,{
        headers:{
            token: token
        }
    })

    const data = await response.json()

    const job = data.job

    const getProfileImage = (user) => {
    if (!user?.image) return "/default-avatar.png" // صورة افتراضية لو مفيش صورة
    return user.image.startsWith("http")
      ? user.image // من جوجل أو أي لينك خارجي
      : `http://localhost:4000/${user.image}` // متخزنة في السيرفر بتاعك
  }
    return(
        <div className="p-6 w-full h-screen flex flex-col gap-3 items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
            <p>{job.description}</p>
            <span className="text-sm text-indigo-500 font-bold">status: {job.job_status}</span>
            <span className="text-sm text-indigo-500 font-bold">years required: {job.minimum_years_required}</span>
            <span className="text-sm text-green-500 font-bold">salary: {job.salary}</span>
            <span className="text-sm text-purple-500 font-bold">type: {job.type}</span>
            <span className="text-sm text-purple-500 font-bold">applicants count: {job._count.applications}</span>
            <div className="flex gap-2 items-center justify-center">
                {
                    job.skills.map((skill) => (
                        <span className="bg-indigo-500 capitalize text-gray-100 px-4 py-2 rounded-full" key={skill.id}>{skill.name}</span>
                    ))
                }  
            </div>
            <div className="flex flex-col gap-4 w-full items-center justify-center">
                {
                    job.applications.map((applicant) => (
                        <div key={applicant.id} className="shadow-sm w-full flex flex-col rounded-2xl p-6">
                            {
                                applicant.user.image ?
                                <Image 
                                    src={`${getProfileImage(applicant.user)}`}
                                    width={300}
                                    height={300}
                                    priority
                                    alt="profile image"
                                    className="w-10 h-10 rounded-full"
                                />
                                :
                                <div className="w-10 h-10 rounded-full bg-gray-800"></div>
                            }
                            <h1>{applicant.user.first_name}</h1>
                            <span className="text-indigo-500 font-bold text-2xl">title: {applicant.user.title}</span>
                            <p>{applicant.cover_letter}</p>
                            <span className="text-green-500 font-bold">{applicant.salary}</span>
                            <span className="text-green-500 font-bold">location: {applicant.user.location}📍</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
    
}