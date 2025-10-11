"use client"
import { Bookmark, Menu, MessageCircleMore, Rocket, X, User, ChevronDown, Bell, Settings, Heart, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Notifications from "../Notifications/Notifications";
import { io } from "socket.io-client";

export default function Header (){
    const [open,setOpen] = useState(false)
    const [user,setUser] = useState(null)
    const [activeLink,setActiveLink] = useState("")
    const [notifications,setNotifications] = useState([])
    const [unseenNotifications,setUnseenNotifications] = useState(notifications?.some((n) => !n.seen))
    const [newNotifications,setNewNotifications] = useState(false)
    const [profileDropdown, setProfileDropdown] = useState(false)

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
    ]

    const getProfileImage = () => {
    if (!user?.image) return "/default-avatar.png" // صورة افتراضية لو مفيش صورة
    return user.image.startsWith("http")
      ? user.image // من جوجل أو أي لينك خارجي
      : `http://localhost:4000/${user.image}` // متخزنة في السيرفر بتاعك
  }

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

            if(!response.ok)
            {
                setUser(null)
                if(me.type === "comapny")
                    router.push("/dashboard")
                return
            }

            setUser(me)

            if(me.type === "company")
                router.push("/dashboard") 

            } 
            catch (error) {
                setUser(null)
            }
        }
        fetchUserData()
    },[])    
    
    useEffect(() =>
    {
        const fetchNotifications = async () =>
        {
            const response = await fetch("http://localhost:4000/api/notifications",
                {
                    credentials:"include"
                }
            )

            if(response.status === 401 || response.status === 403)
            {
                setNotifications(null)
                return
            }

            const data = await response.json()
            
            const notifications = data.notifications
            
            setNotifications(notifications)
        }

        fetchNotifications()
    },[])

    // useEffect(() =>
    // {
    //     const socket = io("http://localhost:4000")

    //     socket.on("connect",() => console.log("connected to server"))

    //     socket.on("new-notification",(notification) =>
    //     {
    //         console.log(notification);
    //         setNewNotifications(true)
    //     })

    //     socket.on("check-seen-notifications",() =>
    //     {
    //         const seenNotifications = notifications.every((n) => n.seen === true)

    //         if(seenNotifications)
    //         {
    //             setUnseenNotifications(false)
    //             setNewNotifications(false)
    //             setNotifications((prev) => prev?.map((n) => ({...n ,seen:true})))
    //         }
    //     })

    //     return () => socket.disconnect()
    // },[])

    useEffect(() => {
  if (!user?.id) return;

  const socket = io("http://localhost:4000", {
    auth: { userId: user.id }
  });

  socket.on("connect", () => {
    console.log("Connected:", socket.id);

    socket.emit("register-user", user.id);
  });

  socket.on("new-notification", (notification) => {

    if (notification.userId === user.id) {
      setNotifications(prev => [notification, ...prev]);
      setNewNotifications(true);
      setUnseenNotifications(true);
    }
  });

  socket.on("notification-seen", ({ notificationId }) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, seen: true } : n
      )
    );
    
    const allSeen = notifications.every(n => n.seen);
    if (allSeen) {
      setUnseenNotifications(false);
      setNewNotifications(false);
    }
  });

  return () => socket.disconnect();
}, [user?.id]); 

    if(hideHeaderIn.includes(pathName) || pathName.startsWith("/dashboard") || pathName.startsWith("/acceptapplication"))
        return null

    const navLinks = [
        {
            href:"/home",
            title:"home",
            icon: <Home/>,
            color:"text-gray-800"
        },
        {
            href:"/savedjobs",
            title:"Saved Jobs",
            icon: <Bookmark className="w-5 h-5"/>,
            color: "text-purple-600"
        },
        {
            href:"/applications",
            title:"Applications",
            icon: <Rocket className="w-5 h-5"/>,
            color: "text-indigo-600"
        },
        {
            href:"/followedcompanies",
            title:"followed companies",
            icon: <Heart/>,
            color: "text-blue-600"
        },
        
    ]

    const handleLogout = async () =>
    {
        try {
            const response = await fetch("http://localhost:4000/api/users/logout",{
                credentials:"include"
            })

            if(!response.ok)
                return

            window.location.reload()
        } 
        catch (error) {
            return    
        }
    }

    return(
        <>
            <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
                    {/* Logo */}
                    <Link href={"/"} onClick={() => {setActiveLink(""),setOpen(false)}} className="group">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                            Jobs<span className="text-indigo-700">y</span>
                        </h1>
                    </Link>
                
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex gap-8 items-center">
                        {user ? (
                            <div className="flex gap-6 items-center">
                                {/* Navigation Links */}
                                <div className="flex gap-3">
                                    {navLinks.map((link) => (
                                        <Link 
                                            className={`group relative flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all duration-300 hover:bg-gray-50 ${
                                                activeLink === link.title 
                                                ? `${link.color} bg-gray-50` 
                                                : "text-gray-700 hover:text-gray-900"
                                            }`} 
                                            onClick={() => setActiveLink(link.title)} 
                                            key={link.title} 
                                            href={link.href}
                                        >
                                            <span className={`transition-colors duration-300 ${activeLink === link.title ? link.color : "text-gray-400 group-hover:text-gray-600"}`}>
                                                {link.icon}
                                            </span>
                                            <span>{link.title}</span>
                                            {activeLink === link.title && (
                                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                                            )}
                                        </Link>
                                    ))}
                                </div>

                                {/* Notifications */}
                                <Notifications notifications={notifications} unseenNotifications={unseenNotifications} newNotifications={newNotifications}/>
                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <button 
                                        onClick={() => setProfileDropdown(!profileDropdown)}
                                        className="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50 transition-all duration-300 group"
                                    >
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-gray-900">
                                                {user.type === "user" ? `${user.first_name} ${user.last_name}` : user.name || "User"}
                                            </p>
                                            <p className="text-xs text-gray-500 capitalize">{user.type}</p>
                                        </div>
                                        {user.image ? (
                                            <Image 
                                                src={getProfileImage()}
                                                width={40}
                                                height={40}
                                                alt="profile"
                                                className="rounded-full ring-2 ring-white shadow-md"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${profileDropdown ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {profileDropdown && (
                                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                                            <Link 
                                                href="/profile" 
                                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                                onClick={() => setProfileDropdown(false)}
                                            >
                                                <User className="w-4 h-4" />
                                                <span>View Profile</span>
                                            </Link>
                                            <Link 
                                                href="/settings" 
                                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                                onClick={() => setProfileDropdown(false)}
                                            >
                                                <Settings className="w-4 h-4" />
                                                <span>Settings</span>
                                            </Link>
                                            <hr className="my-2 border-gray-100" />
                                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 text-left">
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link 
                                    href="/login/jobseeker" 
                                    className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300"
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/join" 
                                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={()=>setOpen(!open)} 
                        className="lg:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-300"
                    >
                        {open ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Overlay */}
            {open && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Mobile Navigation Menu */}
            <nav className={`fixed top-0 right-0 w-80 h-full flex flex-col bg-white lg:hidden transition-transform duration-300 ease-out z-50 shadow-2xl ${open ? "translate-x-0" : "translate-x-full"}`}>
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                    <button 
                        onClick={() => setOpen(false)} 
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-300"
                    >
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                {/* Mobile Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {user ? (
                        <div className="space-y-6">
                            {/* Mobile Profile */}
                            <Link 
                                href="/profile" 
                                onClick={() => setOpen(false)} 
                                className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100"
                            >
                                {user.image ? (
                                    <Image 
                                        src={getProfileImage()}
                                        width={50}
                                        height={50}
                                        alt="profile"
                                        className="rounded-full ring-2 ring-white shadow-md"
                                    />
                                ) : (
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {user.type === "user" ? `${user.first_name} ${user.last_name}` : user.name || "User"}
                                    </h3>
                                    <p className="text-sm text-gray-600 capitalize">{user.type}</p>
                                </div>
                            </Link>

                            {/* Mobile Navigation Links */}
                            <div className="space-y-2">
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.title}
                                        href={link.href}
                                        className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                            activeLink === link.title 
                                            ? `${link.color} bg-gray-50` 
                                            : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                        onClick={() => {setActiveLink(link.title), setOpen(false)}}
                                    >
                                        <span className={activeLink === link.title ? link.color : "text-gray-400"}>
                                            {link.icon}
                                        </span>
                                        <span>{link.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Link 
                                href="/login/jobseeker" 
                                className="block w-full text-center py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors duration-300" 
                                onClick={() => setOpen(false)}
                            >
                                Login
                            </Link>
                            <Link 
                                href="/join" 
                                className="block w-full text-center py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300" 
                                onClick={() => setOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}