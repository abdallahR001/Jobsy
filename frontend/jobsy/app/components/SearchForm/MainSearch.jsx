"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function MainSearch(){
    const [title,setTitle] = useState("")
    const [location,setLocation] = useState("")
    const [type,setType] = useState("")

    const router = useRouter()

    const handleSearch = (e) =>
    {
        e.preventDefault()

        const params = new URLSearchParams()

        if(title)
            params.set("title",title)

        if(location)
            params.set("location",location)

        if(type)
            params.set("type",type)

        router.push(`/search?${params.toString()}`)
    }

    return(
        <form onSubmit={(e) => handleSearch(e)} className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-300">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="enter job title..." type="text" className="flex-1 p-4 outline-none"/>
                    <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="flex-1 p-4 outline-none" placeholder="enter job location"/>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="flex-1 p-4 outline-none cursor-pointer">
                        <option value={""}>select job type</option>
                        <option value={"fullTime"}>Full-Time</option>
                        <option value={"partTime"}>Part-Time</option>
                        <option value={"remote"}>Remote</option>
                        <option value={"internShip"}>Internship</option>
                    </select>

                    <button disabled={!title} type="submit" className="flex items-center justify-centerdisabled:bg-indigo-400 px-6 py-4 bg-indigo-600 cursor-pointer hover:bg-indigo-700 transition-all duration-500 text-center"><Search className="text-white w-full"/></button>
                </div>
        </form>
    )
}