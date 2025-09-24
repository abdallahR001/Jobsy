"use client"
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Header (){
    const [open,setOpen] = useState(false)
    const [user,setUser] = useState(null)

    const pathName = usePathname()

    const router = useRouter()

    const hideHeaderIn = [
        "/join",
        "/dashboard",
        "/register/jobseeker",
        "/register/employer",
        "/login/jobseeker",
        "/login/employer",
        "/onboarding/users/step1",
        "/onboarding/users/step2",
        "/onboarding/users/step3",
        "/onboarding/users/step4",
        "/onboarding/users/step5",
        "/onboarding/users/step6",
        "/onboarding/employers/step1",
        "/onboarding/employers/step2",
        "/onboarding/employers/step3",
        "/onboarding/employers/step4",
        "/onboarding/employers/step5",
        "/onboarding/employers/step6",
        "/dashboard/newjob",
        "/dashboard/myjobs",
        "/dashboard/activejobs",
        "/dashboard/mycompany",
    ]
    useEffect(() =>
    {
        if(hideHeaderIn.includes(pathName))
            return
        const fetchUserData = async () =>
        {
            
            try {
                const response = await fetch("http://localhost:4000/api/users/me",{
                credentials:"include"
            })

            const me = await response.json()

            console.log(me)

            if(!response.ok)
            {
                setUser(null)
                return
            }

            setUser(me)

            if(me.type === "company")
                router.push("/dashboard") 

            } 
            catch (error) {
                setUser(null)
                console.log(error)
            }
        }
        fetchUserData()
    },[])       

    if(hideHeaderIn.includes(pathName))
        return null

    return(
        <header className="fixed w-full bg-white shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
                <Link href={"/"}>
                    <h1 className="text-2xl font-bold text-indigo-600">Jobs<span className="text-indigo-700">y</span></h1>
                </Link>
            
                <nav className="hidden md:flex gap-6 items-center">
                    <div className="hidden md:flex gap-6 items-center">
                        {
                            user ? <Link className="flex items-center gap-5" href={"/profile"}>
                                <h1>{user.type === "user" ? `${user.first_name} ${user.last_name}` : user.name ? `${user.name}` : "" }</h1>
                                {
                                    user.image ? <Image 
                                    src={`http://localhost:4000/${user.image}`}
                                    width={40}
                                    height={40}
                                    alt="profile"
                                    className="rounded-full"
                                    />: <div className="rounded-full w-[40px] h-[40px] bg-gradient-to-t from-indigo-500 to-white"></div>
                                }
                            </Link>:<>
                                <Link href={"/login/jobseeker"} className="text-gray-700 hover:text-indigo-600 transition-colors duration-300" >Login</Link>
                                <Link href={"/join"} className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition-all duration-300">Join</Link>
                            </>
                        }
                    </div>
                </nav>
                <button onClick={()=>setOpen(!open)} className="md:hidden text-gray-700 font-medium">{open ? <X/> : <Menu/>}</button>
                {/* mobile nav */}
                    <nav className={`fixed top-0 right-0 w-[70%] h-full flex flex-col gap-6 px-4 pb-4 md:hidden bg-gray-50 transition-transform duration-500 ease-in-out ${open ? "translate-x-0 ": "translate-x-full"}`}>
                        {
                            user ? 
                            <Link href={"/profile"} className="flex items-center gap-8 py-2">
                                <h1>{user.type === "user" ? `${user.first_name} ${user.last_name}` : user.name ? `${user.name}` : "" }</h1>
                                {
                                    user.image ? <Image 
                                    src={`http://localhost:4000/${user.image}`}
                                    width={40}
                                    height={40}
                                    alt="profile"
                                    className="rounded-full"
                                    />: <div className="rounded-full w-[40px] h-[40px] bg-gray-300"></div> 
                                }
                            </Link>
                            :
                            <>
                                <Link href={"/login/jobseeker"} className="text-gray-700 hover:text-indigo-600 transition-colors duration-300" onClick={()=>setOpen(false)}>Login</Link>
                                <Link href={"/join"} className="text-gray-700 hover:text-indigo-600 transition-colors duration-300" onClick={()=>setOpen(false)}>Join</Link>
                            </>
                        }
                        
                        <button onClick={() => setOpen(false)} className="text-gray-70 text-left mt-7"><X/></button>
                    </nav>
                
            </div>
        </header>
    )
}