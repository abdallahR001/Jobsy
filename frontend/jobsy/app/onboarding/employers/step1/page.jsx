"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Step1() {
  const [companyField, setCompanyField] = useState("");
  const [companyName, setCompanyName] = useState("");
  const router = useRouter();

  const fields = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Retail",
    "Hospitality",
    "Other",
  ];

  useEffect(() =>
    {
        try {
            const fetchData = async ()=>
            {
                const response = await fetch("http://localhost:4000/api/companies/onBoarding",{
                    credentials:"include"
                })

                const data = await response.json()

                console.log(data)

                if(!response.ok)
                {
                    router.push("/join")
                    return
                }

                console.log(data)

                if(data.hasSeenOnboarding === true)
                {
                    router.push("/profile")
                }
            }

            setCompanyName(localStorage.getItem("companyName"))

            fetchData()
        } 
        catch (error) {
            console.log(error)    
        }
    },[router])

  const handleContinue = () => {
    localStorage.setItem("field", companyField);
    router.push("/onboarding/employers/step2"); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4">
      <h1 className="text-3xl font-bold text-center text-indigo-500 mb-6">
        {companyName} is a nice name!
      </h1>
      <p className="text-gray-600 text-center mb-6">
        What's your company's main field of work?
      </p>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <select
            value={companyField}
            onChange={(e) => setCompanyField(e.target.value)}
            className="border cursor-pointer border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="" disabled>
              Select company field
            </option>
            {fields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>

          <button
            disabled={!companyField}
            onClick={handleContinue}
            className={`w-full py-3 rounded-lg font-medium transition ${
              companyField
                ? "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
