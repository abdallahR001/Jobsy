"use client"
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteJobButton({jobId}){
    const router = useRouter()
    const deleteJob = async () =>
    {
        try {
            const response = await fetch(`http://localhost:4000/api/jobs/${jobId}`,{
            credentials:"include",
            method:"DELETE"
        })

        const result = await response.json()
        console.log(result)

        if(response.status === 301 || response.status === 304)
        {
            router.push("/login/employer")
        }

        router.push("/dashboard?#")
        } 
        catch (error) {
            console.log(error)    
        }
    }
    return(
        <button onClick={deleteJob} className="outline-none text-sm p-2 rounded-full border border-red-500 text-red-500 cursor-pointer transition-all duration-300 hover:border-red-700 hover:text-red-700"><Trash/></button>
    )
}