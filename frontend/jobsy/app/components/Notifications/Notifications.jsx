"use client"

import { Bell } from "lucide-react"
import Link from "next/link"

export default function Notifications({notifications = null}){
    const unSeenNotifications = notifications?.some((notification) => !notification.seen)
    return(
        <div className="relative">
            <Link href={"/notifications"} className="p-2 text-gray-400 ">
                <Bell className="w-full h-full" />
                {
                    unSeenNotifications ? 
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                    :
                    ""
                }
            </Link>
        </div>
    )
}