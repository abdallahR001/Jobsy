"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function step5(){
    const [experience,setExperience] = useState("")
    const router = useRouter()
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4">
      <p className="text-indigo-500 text-3xl text-center font-bold mb-6">
        How many years of experience do you have?
      </p>
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <input
            type="number"
            min="0"
            placeholder="e.g. 3"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            onClick={() => {
              localStorage.setItem("experience", experience);
              router.push("/onboarding/step6"); // الصفحة اللي بعدها
            }}
            disabled={!experience.trim()}
            className={`w-full py-3 rounded-lg font-medium transition ${
              experience.trim()
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