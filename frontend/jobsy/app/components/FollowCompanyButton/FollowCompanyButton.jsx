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
        // Styling for Follow Button
        <button 
            onClick={handleFollow} 
            className={`cursor-pointer group relative px-6 py-3 rounded-2xl font-bold text-white shadow-lg transition-all duration-300 flex items-center gap-2 overflow-hidden ${
                isFollowed 
                    ? 'bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 hover:from-gray-700 hover:via-gray-800 hover:to-gray-700' 
                    : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-600'
            } hover:shadow-xl hover:scale-105 ${
                isFollowed ? 'hover:shadow-gray-500/25' : 'hover:shadow-indigo-500/25'
            }`}
        >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-2">
                {isFollowed ? (
                    <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span>Following</span>
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Follow Company</span>
                    </>
                )}
            </span>
        </button>
    )
}