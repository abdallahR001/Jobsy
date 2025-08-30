"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function Header (){
    const [open,setOpen] = useState(false)

    const pathName = usePathname()

    const hideHeaderIn = [
        "/register/jobseeker",
        "register/employer"
    ]

    const navLinks = [
        // we will add nav links later on
    ]

    if(hideHeaderIn.includes(pathName))
        return null

    return(
        <header className="fixed w-full bg-white shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
                <Link href={"/"}>
                    <h1 className="text-2xl font-bold text-indigo-600">Jobs<span className="text-indigo-700">y</span></h1>
                </Link>
            
                <nav className="hidden md:flex gap-6 items-center">
                    <Link href={"/login"} className="text-gray-700 hover:text-indigo-600 transition-colors duration-300" >Login</Link>
                    <Link href={"/join"} className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition-all duration-300">Join</Link>
                </nav>
                <button onClick={()=>setOpen(!open)} className="md:hidden text-gray-700 font-medium">{open ? "close" : "menu"}</button>
                {/* mobile nav */}
                    <nav className={`fixed top-0 right-0 w-[70%] h-full flex flex-col gap-6 px-4 pb-4 md:hidden bg-gray-50 transition-transform duration-500 ease-in-out ${open ? "translate-x-0 ": "translate-x-full"}`}>
                        <button onClick={() => setOpen(false)} className="text-gray-70 text-left mt-7">close</button>
                        <Link href={"/login"} className="text-gray-700 hover:text-indigo-600 transition-colors duration-300" onClick={()=>setOpen(false)}>Login</Link>
                        <Link href={"/join"} className="text-gray-700 hover:text-indigo-600 transition-colors duration-300" onClick={()=>setOpen(false)}>Join</Link>
                    </nav>
                
            </div>
        </header>
    )
}