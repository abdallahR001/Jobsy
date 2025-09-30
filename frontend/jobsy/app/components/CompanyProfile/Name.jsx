"use client"
import { PenBox, Save, X, Loader2, AlertCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function CompanyName({name}){
    const [companyName,setCompanyName] = useState(name)
    const [updateMode,setUpdateMode] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")
    const [loading,setLoading] = useState(false)

    const inputRef = useRef(null)

    useEffect(() =>
    {
        if(updateMode && inputRef.current)
        {
            const el = inputRef.current
            el.focus()
            el.setSelectionRange(el.value.length,el.value.length)
        }
    },[updateMode])

    const save = async () =>
    {
        if(companyName.trim() === name)
        {
            setUpdateMode(false)
            setErrorMessage("")
            return
        }

        if(companyName.trim().length === 0)
        {
            setErrorMessage("Company name cannot be empty")
            return
        }

        setLoading(true)
        setErrorMessage("")

        const response = await fetch("http://localhost:4000/api/companies",{
            credentials:"include",
            body:JSON.stringify({
                name: companyName
            }),
            method:"PUT",
            headers:{
                "content-type" : "application/json"
            }
        })

        const result = await response.json()

        if(!response.ok)
        {
            setErrorMessage(result.message)
            setLoading(false)
            return
        }

        setCompanyName(result.company.name)
        setUpdateMode(false)
        setErrorMessage("")
        setLoading(false)
    }

    const cancel = () => {
        setCompanyName(name)
        setUpdateMode(false)
        setErrorMessage("")
    }
    
    return(
        <div className="flex flex-col gap-3 items-center justify-center w-full">
            <div className="flex items-center gap-3 w-full">
                {!updateMode ? (
                    <>
                        <h1 className="text-3xl font-bold text-gray-900 capitalize flex-1 text-center">
                            {companyName}
                        </h1>
                        <button 
                            onClick={() => setUpdateMode(true)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300"
                        >
                            <PenBox className="w-5 h-5"/>
                        </button>
                    </>
                ) : (
                    <>
                        <input 
                            type="text" 
                            ref={inputRef} 
                            className="flex-1 w-full text-3xl font-bold text-gray-900 capitalize text-center px-4 py-2 bg-gray-50 border-2 border-indigo-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300" 
                            onChange={(e) => setCompanyName(e.target.value)} 
                            value={companyName}
                            disabled={loading}
                        />
                        <div className="flex gap-2">
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