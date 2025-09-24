"use client"
import { PenBox, Save } from "lucide-react"
import { useState,useEffect, useRef } from "react"
export default function CompanyDescription({description}){
    const [companyDescription,setCompanyDescription] = useState(description)
    const [updateMode,setUpdateMode] = useState(false)

    const inputRef = useRef(null)

    const save = async () =>
    {
            if(companyDescription === description)
            {
                setUpdateMode(false)
                return
            }
            const response = await fetch("http://localhost:4000/api/companies",{
            credentials:"include",
            body:JSON.stringify( {
                description: companyDescription
            }),
            method:"PUT",
            headers:{
                "content-type" : "application/json"
            }
        })

        const result = await response.json()

        if(!response.ok)
        {
            console.log(result.message)
            return
        }

        setCompanyDescription(result.company.description)
        
        setUpdateMode(false)
        
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
        <div className="flex flex-col gap-2 items-center justify-center">
            <div className="flex gap-2 ">
                <h1 className={`${updateMode ? "hidden" : "block"} text-gray-800 text-2xl font-semibold capitalize`}>{companyDescription}</h1>
            
                <textarea type="text" ref={inputRef} className={`${updateMode ? "block" : "hidden"} outline rounded-xl w-full text-center text-gray-800 text-2xl font-semibold capitalize`} onChange={(e) => setCompanyDescription(e.target.value)} value={companyDescription}/>
            
                <div onClick={() => updateMode ? save() : setUpdateMode(true)} className="text-2xl flex items-center text-indigo-500 cursor-pointer">{updateMode ? <Save/> : <PenBox/>}</div>
            </div>
        </div>
    )
}