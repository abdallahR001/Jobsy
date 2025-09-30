"use client"
import { PenBox, Save, X, Loader2, AlertCircle } from "lucide-react"
import { useState,useEffect, useRef } from "react"

export default function UserBio({bio}){
    const [userBio,setBio] = useState(bio)
    const [updateMode,setUpdateMode] = useState(false)
    const [loading,setLoading] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")

    const inputRef = useRef(null)

    const save = async () =>
    {
        if(userBio.trim() === bio)
        {
            setUpdateMode(false)
            setErrorMessage("")
            return
        }

        if(userBio.trim().length === 0)
        {
            setErrorMessage("bio cannot be empty")
            return
        }

        setLoading(true)
        setErrorMessage("")

        const response = await fetch("http://localhost:4000/api/users/update-profile",{
            credentials:"include",
            body:JSON.stringify({
                bio: userBio
            }),
            method:"PUT",
            headers:{
                "content-type" : "application/json"
            }
        })

        const result = await response.json()

        console.log(result.user);
        

        if(!response.ok)
        {
            setErrorMessage(result.message)
            setLoading(false)
            return
        }

        setBio(result.user.bio)
        setUpdateMode(false)
        setLoading(false)
    }

    const cancel = () => {
        setBio(bio)
        setUpdateMode(false)
        setErrorMessage("")
    }

    useEffect(() =>
    {
        if(updateMode && inputRef.current)
        {
            const el = inputRef.current
            el.focus()
            el.setSelectionRange(el.value.length,el.value.length)
        }
    },[updateMode])

    return(
        <div className="flex flex-col gap-3 w-full">
            <div className="flex items-start gap-3 w-full">
                {!updateMode ? (
                    <>
                        <p className="flex-1 text-gray-700 leading-relaxed text-center max-w-3xl break-words">
                            {userBio}
                        </p>
                        <button 
                            onClick={() => setUpdateMode(true)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300 flex-shrink-0"
                        >
                            <PenBox className="w-5 h-5"/>
                        </button>
                    </>
                ) : (
                    <>
                        <textarea 
                            ref={inputRef} 
                            className="flex-1 min-h-[120px] max-h-[300px] text-gray-700 leading-relaxed px-4 py-3 bg-gray-50 border-2 border-indigo-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 resize-y" 
                            onChange={(e) => setBio(e.target.value)} 
                            value={userBio}
                            disabled={loading}
                        />
                        <div className="flex flex-col gap-2">
                            <button 
                                onClick={save}
                                disabled={loading}
                                className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin"/>
                                ) : (
                                    <Save className="w-5 h-5"/>
                                )}
                            </button>
                            <button 
                                onClick={cancel}
                                disabled={loading}
                                className="p-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <X className="w-5 h-5"/>
                            </button>
                        </div>
                    </>
                )}
            </div>

            {errorMessage && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-xl animate-shake">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <p className="text-sm font-medium">{errorMessage}</p>
                </div>
            )}
        </div>
    )
}