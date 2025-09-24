"use client"
import { PenBox, Save } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function CompanyName({name}){
    const [companyName,setCompanyName] = useState(name)
    const [updateMode,setUpdateMode] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")

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
            if(companyName === name)
            {
                setUpdateMode(false)
                setErrorMessage("")
                return
            }
            const response = await fetch("http://localhost:4000/api/companies",{
            credentials:"include",
            body:JSON.stringify( {
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
            return
        }

        setCompanyName(result.company.name)
        
        setUpdateMode(false)
        
        setErrorMessage("")
    }
    
    return(
        <div className="flex flex-col gap-2 items-center justify-center">
            <div className="flex gap-2 ">
                <h1 className={`${updateMode ? "hidden" : "block"} text-gray-800 text-2xl font-semibold capitalize`}>{companyName}</h1>
            
                <input type="text" ref={inputRef} className={`${updateMode ? "block" : "hidden"} outline rounded-xl text-center text-gray-800 text-2xl font-semibold capitalize`} onChange={(e) => setCompanyName(e.target.value)} value={companyName}/>
            
                <div onClick={() => updateMode ? save(companyName) : setUpdateMode(true)} className="text-2xl flex items-center text-indigo-500 cursor-pointer">{updateMode ? <Save/> : <PenBox/>}</div>
            </div>
            <p className="text-center text-red-500">{errorMessage}</p>
        </div>
    )
}