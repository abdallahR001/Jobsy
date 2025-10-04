"use client"
import { Camera, Save, Loader2, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserImage({userImage}){
    const [image,setImage] = useState(null)
    const [preview,setPreview] = useState(userImage)
    const [updateMode,setUpdateMode] = useState(false)
    const [loading,setLoading] = useState(false)

    const router = useRouter()

    const getProfileImage = () => {
    if (!userImage) return "/default-avatar.png" // صورة افتراضية لو مفيش صورة
    return userImage.startsWith("http")
      ? userImage // من جوجل أو أي لينك خارجي
      : `http://localhost:4000/${userImage}` // متخزنة في السيرفر بتاعك
  }

    const handleImageChange = (e) =>
    {
        setUpdateMode(true)
        const file = e.target.files[0]

        if(file)
        {
            setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const save = async () =>
    {
        try {
            if(!image)
            {
                setUpdateMode(false)
                return
            }

            setLoading(true)

            const formData = new FormData()
            formData.append("image",image)

            const response = await fetch("http://localhost:4000/api/users/update-profile",{
                credentials:"include",
                method:"PUT",
                body: formData
            })

            const data = await response.json()

            console.log(data);

            setPreview(`${data.user.image}`)
            setUpdateMode(false)
            setLoading(false)
        }
        catch (error) 
        {
            console.log(error);
            setLoading(false)
        }
    }

    const cancel = () => {
        setUpdateMode(false)
        setImage(null)
        setPreview(userImage)
    }

    return(
        <div className="relative group">
            {/* Image Container */}
            <div className="relative">
                {image ? 
                    <Image 
                        src={preview}
                        alt="user profile image"
                        width={150}
                        height={150}
                        className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-xl ring-4 ring-indigo-100"
                        priority
                    />
                    :
                    preview?
                    <Image 
                        src={`${getProfileImage()}`}
                        alt="user profile image"
                        width={150}
                        height={150}
                        className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-xl ring-4 ring-indigo-100"
                        priority
                    />
                    :
                    <div className="w-[150px] h-[150px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                        <User className="text-3xl w-full text-white" />
                    </div>
                }

                {/* Edit Button Overlay */}
                {!updateMode && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                        <input 
                            type="file" 
                            onChange={handleImageChange}
                            accept="image/*" 
                            className="hidden" 
                        />
                        <div className="bg-white rounded-full p-3 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            <Camera className="w-5 h-5 text-indigo-600"/>
                        </div>
                    </label>
                )}
            </div>

            {/* Action Buttons */}
            {updateMode && (
                <div className="flex items-center gap-2 mt-4 justify-center">
                    <button 
                        onClick={save} 
                        disabled={loading}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                <span>Save</span>
                            </>
                        )}
                    </button>
                    <button 
                        onClick={cancel}
                        disabled={loading}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    )
}