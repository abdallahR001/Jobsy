"use client"

import { Search, MapPin, Briefcase, Filter } from "lucide-react"
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
        <div className="w-full max-w-5xl mx-auto">
            {/* Search Form */}
            <form onSubmit={(e) => handleSearch(e)} className="relative">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-300">
                    <div className="flex flex-col lg:flex-row">
                        {/* Job Title Input */}
                        <div className="flex-1 relative group">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <input 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                placeholder="Job title, keywords, or company..." 
                                type="text" 
                                className="w-full pl-12 pr-4 py-6 text-lg outline-none bg-transparent focus:bg-white/50 transition-all duration-300 placeholder-gray-400 text-gray-700 font-medium"
                            />
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
                        </div>

                        {/* Location Input */}
                        <div className="flex-1 relative group border-l border-gray-200 lg:border-l lg:border-gray-200">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors duration-300">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <input 
                                value={location} 
                                onChange={(e) => setLocation(e.target.value)} 
                                type="text" 
                                className="w-full pl-12 pr-4 py-6 text-lg outline-none bg-transparent focus:bg-white/50 transition-all duration-300 placeholder-gray-400 text-gray-700 font-medium" 
                                placeholder="City, state, or remote"
                            />
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
                        </div>

                        {/* Job Type Select */}
                        <div className="flex-1 relative group border-l border-gray-200 lg:border-l lg:border-gray-200">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300 pointer-events-none z-10">
                                <Filter className="w-5 h-5" />
                            </div>
                            <select 
                                value={type} 
                                onChange={(e) => setType(e.target.value)} 
                                className="w-full pl-12 pr-4 py-6 text-lg outline-none cursor-pointer bg-transparent focus:bg-white/50 transition-all duration-300 text-gray-700 font-medium appearance-none"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: 'right 1rem center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '1.5em 1.5em'
                                }}
                            >
                                <option value={""} className="text-gray-400">Select job type</option>
                                <option value={"fullTime"} className="text-gray-700">Full-Time</option>
                                <option value={"partTime"} className="text-gray-700">Part-Time</option>
                                <option value={"remote"} className="text-gray-700">Remote</option>
                                <option value={"internShip"} className="text-gray-700">Internship</option>
                            </select>
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
                        </div>

                        {/* Search Button */}
                        <button 
                            disabled={!title} 
                            type="submit" 
                            className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 disabled:from-gray-300 disabled:via-gray-400 disabled:to-gray-300 px-8 py-6 text-white font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25 disabled:cursor-not-allowed overflow-hidden"
                        >
                            <div className="flex items-center justify-center gap-3 relative z-10">
                                <Search className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                                <span className="hidden sm:inline">Search Jobs</span>
                            </div>
                            
                            {/* Hover effect */}
                            {title && (
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            )}
                        </button>
                    </div>
                </div>

                {/* Floating suggestions */}
                {/* <div className="absolute -bottom-16 left-0 right-0 flex flex-wrap justify-center gap-3 opacity-70">
                    <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer transition-all duration-300">
                        Software Engineer
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer transition-all duration-300">
                        Remote
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer transition-all duration-300">
                        Cairo
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer transition-all duration-300">
                        Marketing
                    </div>
                </div> */}
            </form>

            {/* Quick Stats */}
            {/* <div className="mt-20 text-center">
                <p className="text-gray-600 text-lg mb-4">
                    Popular searches right now
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                        <span>React Developer - 2,341 jobs</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>UI/UX Designer - 1,876 jobs</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <span>Product Manager - 1,234 jobs</span>
                    </div>
                </div>
            </div> */}
        </div>
    )
}