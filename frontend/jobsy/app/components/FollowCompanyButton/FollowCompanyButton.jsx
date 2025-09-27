"use client"

import { Plus, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function FollowCompanyButton({companyId,initialIsCompanyFollowed}){
    const [isFollowed,setIsFollowed] = useState(initialIsCompanyFollowed)

    const router = useRouter()

    const handleFollow = async () =>
    {
        try {
            const response = await fetch("http://localhost:4000/api/users/follow",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({
                    companyId: companyId
                })
            })

            if(response.status === 401 || response.status === 403)
                router.push("/login/jobseeker")

            const result = await response.json()

            if(!response.ok)
            {
                setIsFollowed(prev => prev)
                console.log(result.message);
                return
            }

            setIsFollowed(result.isFollowed)

            console.log(result);
            
        } 
        catch (error) {
            setIsFollowed(prev => prev)    
        }
    }
    
    return(
        <button onClick={handleFollow} className={`${isFollowed ? "bg-indigo-700 hover:bg-indigo-500" : "bg-indigo-500"} py-2 px-4 font-bold rounded-full flex items-center justify-between gap-1 transition-all cursor-pointer duration-300 hover:bg-indigo-800 text-gray-100`}>
            {
                isFollowed ? `Unfollow Company` : `Follow Company`
            }
        </button>
    )
}