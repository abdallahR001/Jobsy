"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Step4(){
    const [website, setWebsite] = useState("")

    const router = useRouter()

    const handleContinue = () =>
    {
        localStorage.setItem("website",website)
        router.push("/onboarding/employers/step5")
    }

    const handleSkip = () =>
    {
        router.push("/onboarding/employers/step5")
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4">
      <h1 className="text-3xl font-bold text-center text-indigo-500 mb-6">
         Does your company have a website?
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Add your company's website link or skip if you don't have one.
      </p>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://example.com"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <button
            onClick={handleContinue}
            className={`w-full py-3 rounded-lg font-medium transition ${
              website
                ? "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!website}
          >
            Continue
          </button>

          <button
            onClick={handleSkip}
            className="w-full py-3 rounded-lg font-medium transition bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
          >
            I don't have a website
          </button>
        </div>
      </div>
    </div>
    )
}