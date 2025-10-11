"use client"
import { CheckCircle, X, Bell, Clock } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function Notifications()
{
    const [notifications, setNotifications] = useState([])

    useEffect(() =>
    {
        const fetchNotifications = async () =>
        {
            const response = await fetch("http://localhost:4000/api/notifications",
            {
                credentials:"include"
            }
        )

        const data = await response.json()

        if(!response.ok)
        {
            console.log(data);
            return
        }

        if(response.status === 401 || response.status === 403)
            redirect("/login/jobseeker")

        setNotifications(data.notifications)
    }

    fetchNotifications()
    },[])
    
    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                            <Bell className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">Notifications</h1>
                            <p className="text-lg text-gray-600">{notifications.length} notifications</p>
                        </div>
                    </div>
                </div>

                {/* Notifications List */}
                {notifications.length > 0 ? (
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <Link 
                                href={`/notifications/${notification.id}`}
                                key={notification.id}
                                className="block group"
                                onClick={() => setNotifications((prev) => ({...prev,seen:true}))}
                            >
                                <div className={`relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 p-6 ${
                                    !notification.seen 
                                        ? 'border-indigo-200 bg-gradient-to-r from-indigo-50/50 to-purple-50/50' 
                                        : 'border-white/20'
                                }`}>
                                    {/* Unread Indicator */}
                                    {!notification.seen && (
                                        <div className="absolute top-6 right-6">
                                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                                            notification.type === "accept application"
                                                ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                                : notification.type === "reject application"
                                                    ? 'bg-gradient-to-r from-red-500 to-rose-500'
                                                    : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                                        }`}>
                                            {notification.type === "accept application" ? (
                                                <CheckCircle className="w-6 h-6 text-white" />
                                            ) : notification.type === "reject application" ? (
                                                <X className="w-6 h-6 text-white" />
                                            ) : (
                                                <Bell className="w-6 h-6 text-white" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className={`text-xl font-bold mb-2 ${
                                                notification.type === "accept application"
                                                    ? 'text-green-900'
                                                    : notification.type === "reject application"
                                                        ? 'text-red-900'
                                                        : 'text-gray-900'
                                            }`}>
                                                {notification.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed mb-3">
                                                {notification.message}
                                            </p>
                                            
                                            {/* Timestamp */}
                                            {notification.createdAt && (
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{new Date(notification.createdAt).toLocaleString()}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Arrow */}
                                        <div className="text-gray-400 group-hover:text-indigo-600 transition-colors duration-300">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-16 text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Bell className="w-10 h-10 text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Notifications</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            You're all caught up! Check back later for updates.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}