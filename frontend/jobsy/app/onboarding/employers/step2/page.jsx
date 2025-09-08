"use client"
import { useRouter } from "next/navigation"
import { useState,useEffect } from "react"

export default function Step2(){
    const [city,setCity] = useState("")
    
    const router = useRouter()

    const handleContinue = () =>
    {
        router.push("/onboarding/employers/step3")
    }

    useEffect(() =>
        {
            try {
                const fetchData = async ()=>
                {
                    const response = await fetch("http://localhost:4000/api/companies/onBoarding",{
                        credentials:"include"
                    })
    
                    if(!response.ok)
                    {
                        router.push("/join")
                        return
                    }
    
                    const data = await response.json()
    
                    if(data.hasSeenOnboarding === true)
                    {
                        router.push("/profile")
                    }
                }
    
                fetchData()
            } 
            catch (error) {
                console.log(error)    
            }
        },[router])
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4">
      <h1 className="text-3xl font-bold text-center text-indigo-500 mb-6">
        Where is your company located?
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Please tell us the city where your company operates.
      </p>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="e.g. Cairo"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <button
            onClick={handleContinue}
            disabled={!city.trim()}
            className={`w-full py-3 rounded-lg font-medium transition ${
              city.trim()
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