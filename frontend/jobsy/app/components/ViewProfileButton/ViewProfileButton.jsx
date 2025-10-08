"use client"
import { Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ViewProfileButton({userId,applicationId}) {
    const router = useRouter()
    
    const handleViewProfile = async () =>
    {
        const notificationResponse = await fetch("http://localhost:4000/api/notifications",{
            credentials:"include",
            method:"POST",
            body:JSON.stringify({
                applicationId:applicationId,
                type:"view profile"
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
        <Link 
            href={`/dashboard`}
            onClick={handleViewProfile}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 flex items-center justify-center gap-2"
        >
            <Eye/>
            <span>View Profile</span>
        </Link>
    )
}