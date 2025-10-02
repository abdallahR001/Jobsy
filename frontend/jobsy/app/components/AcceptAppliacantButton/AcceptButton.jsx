"use client"

import { CheckCircle } from "lucide-react";

export default function AcceptButton({id,token})
{
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
            console.log(result.message);
            return
        }

        console.log(result);

        window.location.reload()
        
    }

    return(
        <button onClick={() => handleAccept(id)} className="flex-1 cursor-pointer bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
           <CheckCircle/> Accept
        </button>
    )
}