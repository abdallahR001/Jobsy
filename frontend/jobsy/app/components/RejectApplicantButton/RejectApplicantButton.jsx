"use client"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RejectButton({id, token}) {
    const router = useRouter()
    const handleReject = async (id) => {
        const response = await fetch(`http://localhost:4000/api/applications/reject/${id}`, {
            method: "PUT",
            headers: {
                token: token
            }
        })

        const result = await response.json()

        if(!response.ok) {
            console.log(result.message);
            return
        }

        console.log(result);

        const notificationResponse = await fetch("http://localhost:4000/api/notifications",{
            credentials:"include",
            method:"POST",
            body:JSON.stringify({
                applicationId:id,
                type:"reject application"
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

        router.refresh()
    }

    return(
        <button 
            onClick={() => handleReject(id)} 
            className="flex-1 cursor-pointer bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
        >
            <X/>
            <span>Reject</span>
        </button>
    )
}