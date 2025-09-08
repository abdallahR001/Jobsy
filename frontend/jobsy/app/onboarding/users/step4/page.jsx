"use client"
import { useState , useEffect} from "react"
import { useRouter } from "next/navigation"
export default function step4(){
    const [userName, setUserName] = useState("")
    const [bio,setBio] = useState("")
    
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
      <h1 className="text-3xl font-bold text-center text-indigo-500 mb-6">
        {userName ? `Tell us more, ${userName}` : "Tell us more about you"}
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Write a short bio about yourself.
      </p>
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <textarea
            placeholder="Write something about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={5}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
          />
          <button
            onClick={() => {
              localStorage.setItem("bio", bio);
              router.push("/onboarding/users/step5");
            }}
            disabled={!bio.trim()}
            className={`w-full py-3 rounded-lg font-medium transition ${
              bio.trim()
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