import { Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function JobDetails({params}){
    const jobId = (await params).jobId
    
    const response = await fetch(`http://localhost:4000/api/jobs/${jobId}`)

    const data = await response.json()

    const job = data.result

    console.log(job);

    return(
        <div className="w-full h-screen flex items-center justify-center flex-col">
            <div className="flex items-center justify-center gap-3">
                <Image 
                src={`http://localhost:4000/${job.Company.image}`}
                width={300}
                height={300}
                priority
                alt="company image"
                className="w-10 h-10 rounded-full"
                />
                <h1 className="text-xl text-gray-800">{job.Company.name}</h1>
            </div>
            <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl capitalize text-gray-800">{job.title}</h1>
                <span className="text-gray-500">{job._count.applications}</span>
                <span className="text-gray-500">{job.type}</span>
            </div>
            <span>{job.job_status}</span>
            <p>{job.description}</p>
            <p>years required: {job.minimum_years_required ? job.minimum_years_required : "N/A"}</p>
            <p>salary: {job.salary ? job.salary : "N/A"}</p>
            <div className="flex gap-2 items-center justify-center">
                {
                    job.skills.map((skill) => (
                        <span className="bg-indigo-500 capitalize text-gray-100 px-4 py-2 rounded-full" key={skill.id}>{skill.name}</span>
                    ))
                }      
            </div>
            <Link href={`/apply/${job.id}`}
            className="mt-3 text-gray-800 px-2 py-3 border border-indigo-500 font-bold flex items-center gap-2 text-sm rounded-full transition-all duration-300 hover:bg-indigo-500 hover:text-gray-100 hover:scale-110"
            >Apply Now! <Rocket/></Link>
        </div>
    )
}