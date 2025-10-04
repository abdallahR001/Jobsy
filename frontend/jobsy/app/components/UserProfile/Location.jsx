"use client"
import { MapPin, Save, X, Loader2, AlertCircle } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function UserLocation({location}) {
    const [initialLocation, setInitialLocation] = useState(location)
    const [userLocation, setUserLocation] = useState(location)
    const [updateMode, setUpdateMode] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const inputRef = useRef(null)

    useEffect(() => {
        if(updateMode && inputRef.current) {
            const el = inputRef.current
            el.focus()
            el.setSelectionRange(el.value.length, el.value.length)
        }
    }, [updateMode])

    const save = async () => {
        if(userLocation.trim() === initialLocation) {
            setUpdateMode(false)
            setErrorMessage("")
            return
        }

        if(userLocation.trim().length === 0) {
            setErrorMessage("Location cannot be empty")
            return
        }

        setLoading(true)
        setErrorMessage("")

        const response = await fetch("http://localhost:4000/api/users/update-profile", {
            credentials: "include",
            body: JSON.stringify({
                location: userLocation
            }),
            method: "PUT",
            headers: {
                "content-type": "application/json"
            }
        })

        const result = await response.json()

        if(!response.ok) {
            setErrorMessage(result.message)
            setLoading(false)
            return
        }

        setUserLocation(result.user.location)
        setInitialLocation(result.user.location)
        setUpdateMode(false)
        setErrorMessage("")
        setLoading(false)

        console.log(result);
        
    }

    const cancel = () => {
        setUserLocation(initialLocation)
        setUpdateMode(false)
        setErrorMessage("")
    }

    return(
        <div className="mt-4">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 font-medium mb-1">Location</p>
                        {!updateMode ? (
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-gray-900 break-words">
                                    {userLocation || "Not specified"}
                                </p>
                                <button 
                                    onClick={() => setUpdateMode(true)}
                                    className="p-1 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-300 flex-shrink-0"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <input 
                                    type="text"
                                    ref={inputRef}
                                    className="w-full text-sm font-semibold text-gray-900 px-3 py-2 bg-white border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300" 
                                    onChange={(e) => setUserLocation(e.target.value)} 
                                    value={userLocation}
                                    disabled={loading}
                                    placeholder="e.g. Cairo, Egypt"
                                />
                                <div className="flex gap-2">
                                    <button 
                                        onClick={save}
                                        disabled={loading}
                                        className="flex-1 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-xs font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-3 h-3 animate-spin"/>
                                                <span>Saving...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-3 h-3"/>
                                                <span>Save</span>
                                            </>
                                        )}
                                    </button>
                                    <button 
                                        onClick={cancel}
                                        disabled={loading}
                                        className="flex-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                                    >
                                        <X className="w-3 h-3"/>
                                        <span>Cancel</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {errorMessage && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl mt-2 text-xs">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <p className="font-medium">{errorMessage}</p>
                </div>
            )}
        </div>
    )
}