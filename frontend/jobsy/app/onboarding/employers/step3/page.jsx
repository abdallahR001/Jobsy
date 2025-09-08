"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Step3(){
    const [companyName, setCompanyName] = useState("")
    const [employeesCount,setEmployeesCount] = useState("")

    const router = useRouter()

    const employeeOptions = [
    "1 - 5 employees",
    "6 - 10 employees",
    "11 - 15 employees",
    "16 - 25 employees",
    "26 - 50 employees",
    "51 - 100 employees",
    "100+ employees",
    ];

    useEffect(() =>
    {
        setCompanyName(localStorage.getItem("companyName"))
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
    },[])

    const handleContinue = () =>
    {
        localStorage.setItem("employeesCount",employeesCount)
        router.push("/onboarding/employers/step4")
    }
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4">
      <h1 className="text-3xl font-bold text-center text-indigo-500 mb-6">
        {companyName
          ? `${companyName}, let's talk about your team!`
          : "Let's talk about your team!"}
      </h1>
      <p className="text-gray-600 text-center mb-6">
        How many employees does your company have?
      </p>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <select
            value={employeesCount}
            onChange={(e) => setEmployeesCount(e.target.value)}
            className="border cursor-pointer border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="" disabled>
              Select employees count
            </option>
            {employeeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            disabled={!employeesCount}
            onClick={handleContinue}
            className={`w-full py-3 rounded-lg font-medium transition ${
              employeesCount
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