"use client"

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AcceptButton({id,token,message})
{
    const router = useRouter()
    const handleAccept = async (id) =>
    {
        const response = await fetch(`http://localhost:4000/api/applications/accept/${id}`,{
            method:"PUT",
            headers:{
                token:token
            }
        })

        const result = await response.json()

        if(!response.ok)
        {
            router.push("/dashboard/applicants?#")
        }

        const notificationResponse = await fetch("http://localhost:4000/api/notifications",{
            credentials:"include",
            method:"POST",
            body:JSON.stringify({
                message:message,
                applicationId:id,
                type:"accept application"
            }),
            headers:{
                "content-type":"application/json"
            }
        })

        const notificationResult = await notificationResponse.json()

        if(!notificationResponse.ok)
        {
            console.log(notificationResult);
            router.push("/dashboard/applicants?#")
        }

        router.push("/dashboard/applicants?#")
    }

    return(
        <button onClick={() => handleAccept(id)} className=" cursor-pointer bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
           <CheckCircle/> Accept
        </button>
    )
}