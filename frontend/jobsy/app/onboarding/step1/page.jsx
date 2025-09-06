"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
export default function StepOne(){
    const [userName,setUserName] = useState("")
    const [field,setField] = useState("")

    const fields = [
        "Software Development",
        "Graphic Design",
        "Marketing",
        "Sales",
        "Customer Support",
        "Other",
    ];

    const router = useRouter()
    useEffect(() =>
    {
        try {
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

                if(data.hasSeenOnBoarding === true)
                {
                    router.push("/profile")
                }
            }

            setUserName(localStorage.getItem("userName"))

            fetchData()
        } 
        catch (error) {
            console.log(error)    
        }
    },[router])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4">
        <h1 className="text-3xl font-bold text-center text-indigo-500 mb-6 capitalize">
          hello {userName}, Let's Get Started
        </h1>
        <p className="text-gray-600 text-center mb-6">
          What's your primary field of work?
        </p>
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <select
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="border cursor-pointer border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="" disabled>
              Select your field
            </option>
            {fields.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <button
            disabled={!field}
            className={`w-full py-3 rounded-lg font-medium transition ${
              field
                ? "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() => {
                localStorage.setItem("field",field)
                router.push("/onboarding/step2")
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
        
    )
}