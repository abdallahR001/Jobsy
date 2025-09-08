"use client"
import { useState , useEffect} from "react";
import { useRouter } from "next/navigation";
export default function Step3(){
    const [userName, setUserName] = useState("")
    const [location,setLocation] = useState("")

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
      <h1 className="text-3xl font-bold text-center text-indigo-500 mb-6 capitalize">
        {userName ? `Almost there, ${userName}` : "Almost there!"}
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Which city do you currently live in?
      </p>
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="e.g. Cairo"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            onClick={() => {
              localStorage.setItem("location", location);
              router.push("/onboarding/users/step4");
            }}
            disabled={!location.trim()}
            className={`w-full py-3 rounded-lg font-medium transition ${
              location.trim()
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