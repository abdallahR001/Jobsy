"use client"
import { Bookmark } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function SaveJobButton({jobId,initialIsSaved}){
    const [isSaved, setIsSaved] = useState(initialIsSaved)
    const handleSave = async () =>
    {
      try {
        const response = await fetch("http://localhost:4000/api/users/save",{
          credentials:"include",
          method:"POST",
          body: JSON.stringify({
            jobId: jobId
          }),
          headers:{
            "content-type":"application/json"
          }
        })

        const result = await response.json()

        if(!response.ok)
        {
          setIsSaved(prev => prev)
          console.log(result)
          return
        }

        setIsSaved(result.isSaved)
        
        console.log(result.message)
      } 
      catch (error) {
        setIsSaved(prev => prev)
      }
    }
    return(
        <button onClick={handleSave} className={`border rounded-full border-black p-2 cursor-pointer transition-all duration-300 ${isSaved ? "bg-indigo-500 text-white border-white" : "bg-white hover:bg-indigo-500 hover:text-white hover:border-white"}`}><Bookmark/></button>
    )
}