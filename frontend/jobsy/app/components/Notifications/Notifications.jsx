"use client"

import { Bell } from "lucide-react"
import Link from "next/link"

export default function Notifications({unseenNotifications,newNotifications, notifications}){

    const UnseenNotifications = notifications?.some((n) => !n.seen)
    return(
        <div className="relative">
            <Link href={"/notifications"} className="p-2 text-gray-400 ">
                <Bell className="w-full h-full" />
                {
                    unseenNotifications || newNotifications || UnseenNotifications ? 
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                    :
                    ""
                }
            </Link>
        </div>
    )
}