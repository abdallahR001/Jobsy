"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StepDescription() {
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const router = useRouter();

  useEffect(() => {
    setCompanyName(localStorage.getItem("companyName") || "");
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
  }, []);

  const handleContinue = () => {
    localStorage.setItem("description", description);
    router.push("/onboarding/employers/step6"); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4">
      <h1 className="text-3xl font-bold text-center text-indigo-500 mb-6">
        {companyName
          ? `Tell us more about ${companyName}`
          : "Tell us more about your company"}
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Write a short description to let others know what your company does.
      </p>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your company..."
            rows={5}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
          />

          <button
            onClick={handleContinue}
            disabled={!description.trim()}
            className={`w-full py-3 rounded-lg font-medium transition ${
              description.trim()
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
