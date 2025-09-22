"use client"
import { PenBox, Save } from "lucide-react"
import { useState } from "react"

export default function CompanyName({name}){
    const [companyName,setCompanyName] = useState(name)
    const [updateMode,setUpdateMode] = useState(false)
    const save = async () =>
    {
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

        const company = await response.json()

        setCompanyName(company.company.name)
        
        setUpdateMode(false)
    }
    
    return(
        <div className="flex gap-2 flex-row-reverse">
            <h1 className={`${updateMode ? "hidden" : "block"} text-gray-800 text-2xl font-semibold capitalize`}>{companyName}</h1>
            
            <input type="text" className={`${updateMode ? "block" : "hidden"} outline rounded-xl text-center text-gray-800 text-2xl font-semibold capitalize`} onChange={(e) => setCompanyName(e.target.value)} value={companyName}/>
            
            <button onClick={() => updateMode ? save(companyName) : setUpdateMode(true)} className="text-2xl text-indigo-500 cursor-pointer">{updateMode ? <Save/> : <PenBox/>}</button>
        </div>
    )
}