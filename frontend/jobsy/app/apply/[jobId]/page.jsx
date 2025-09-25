"use client"

import { Rocket } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Apply(){
    const [coverLetter,setCoverLetter] = useState("")
    const [salary,setSalary] = useState("")
    const [loading,setLoading] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")

    const params = useParams()

    const router = useRouter()

    console.log(params);
    

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const response = await fetch("http://localhost:4000/api/users/me",{
                credentials:"include"
            })

            if(response.status === 401 || response.status === 403)
                router.push("/login/jobseeker")
        }

        fetchData()
    },[])

    const handleSubmit = async (e) =>
    {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:4000/api/applications/${params.jobId}`,{
                method:"POST",
                credentials:"include",
                headers:{
                    "content-type":"application/json"
                },
                body: JSON.stringify({
                    cover_letter : coverLetter,
                    salaryNumber : salary
                })
            })

            const result = await response.json()

            if(!response.ok)
            {
                setErrorMessage(result.message)
                return
            }

            router.push("/")
        } 
        catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="w-full h-screen text-center flex-col flex items-center justify-center">
            <h1 className="text-2xl text-red-500 font-semibold">{errorMessage}</h1>
            <h1 className="text-indigo-500 text-3xl mb-4 font-bold">submit a proposal!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <textarea className="border border-gray-500 w-full p-4 rounded-2xl" placeholder="cover letter..." onChange={(e) => setCoverLetter(e.target.value)} value={coverLetter}></textarea>
                <input placeholder="salary (optional)" className="border border-gray-500 w-full p-4 rounded-2xl" type="number" value={salary} onChange={(e) => setSalary(e.target.value)}/>
                <button className="mt-3 cursor-pointer text-gray-800 px-2 py-3 border border-indigo-500 font-bold flex items-center gap-2 text-sm rounded-full transition-all duration-300 hover:bg-indigo-500 hover:text-gray-100 hover:scale-110">
                    Send Application <Rocket/>
                </button>
            </form>
        </div>
        
    )
}