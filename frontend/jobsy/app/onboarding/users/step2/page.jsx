"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Step2(){
    const [userName, setUserName] = useState("")
    const [title,setTitle] = useState("")

    const router = useRouter()

    useEffect(() =>
    {
        const fetchData = async ()=>
            {
                const response = await fetch("http://localhost:4000/api/users/onBoarding",{
                    credentials:"include"
                })

                if(!response.ok)
                {
                    router.push("/join")
                    return
                }

                const data = await response.json()

                console.log(data)

                if(data.hasSeenOnBoarding === true)
                {
                    router.push("/profile")
                }
            }

            fetchData()
            setUserName(localStorage.getItem("userName"))
    },[router])
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4">
        <h1 className="text-3xl font-bold text-center text-indigo-500 mb-6">
          Nice to meet you, <span className="capitalize">{userName}</span>
        </h1>
        <p className="text-gray-600 text-center mb-6">
          What’s your current job title?
        </p>
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            onClick={() => {
                localStorage.setItem("title",title)
                router.push("/onboarding/users/step3")
            }}
            disabled={!title.trim()}
            className={`w-full py-3 rounded-lg font-medium transition ${
              title.trim()
                ? "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
    )
}