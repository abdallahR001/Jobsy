"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
export default function Step6(){
    const [userName, setUserName] = useState("")
    const [image,setImage] = useState(null)
    const [preview,setPreview] = useState(null)

    const router = useRouter()

    const sendData = async () =>
    {
        const data = new FormData()

        data.append("title",localStorage.getItem("title"))
        data.append("field",localStorage.getItem("field"))
        data.append("bio",localStorage.getItem("bio"))
        data.append("location",localStorage.getItem("location"))
        data.append("years_of_experience",localStorage.getItem("experience"))

        if(image)
            data.append("image",image)

        const response = await fetch("http://localhost:4000/api/users/update-profile",{
            method:"PUT",
            credentials:"include",
            body:data
        })

        if(!response.ok)
        {
            console.log(await response.text())
            return
        }

        window.location.replace("/")
    }

    useEffect(()=>
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
    },[])

    const handleImageChange = (e) =>
    {
        const file = e.target.files[0]

        if(file)
        {
            setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSkip = () =>
    {
        sendData()
    }
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4">
      <h1 className="text-2xl font-semibold text-center text-indigo-500 mb-6">
        {userName ? `Last step, ${userName}!` : "Last step!"}
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Upload a professional profile picture (optional)
      </p>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col items-center space-y-4">
        {/* صورة معاينة */}
        {preview ? (
          <Image
            src={preview}
            alt="Profile Preview"
            className="w-32 h-32 rounded-full object-cover border border-gray-300"
            width={32}
            height={32}
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        {/* رفع الصورة */}
        <label className="w-full">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="w-full py-3 text-center rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100 transition">
            {image ? "Change Picture" : "Upload Picture"}
          </div>
        </label>

        {/* أزرار Continue و Skip */}
        <div className="flex gap-4 w-full">
          <button
            onClick={sendData}
            disabled={!image}
            className="flex-1 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer"
          >
            Continue
          </button>
          <button
            onClick={handleSkip}
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition cursor-pointer"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
    )
}