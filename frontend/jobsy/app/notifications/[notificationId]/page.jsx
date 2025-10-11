import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Building2, ArrowLeft, CheckCircle, X, Bell } from "lucide-react"

export default async function Notification({params})
{
    const {notificationId} = await params

    const cookieStore = cookies()
    
    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/jobseeker")

    const response = await fetch(`http://localhost:4000/api/notifications/${notificationId}`,
        {
            headers:{
                token:token
            }
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

    const notification = data.notification

    const getProfileImage = (company) => {
        if (!company?.image) return "/default-avatar.png"
        return company.image.startsWith("http")
          ? company.image
          : `http://localhost:4000/${company.image}`
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Back Button */}
                <Link 
                    href="/notifications"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-8 transition-colors duration-300"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back to Notifications</span>
                </Link>

                {/* Notification Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
                    {/* Icon Header */}
                    <div className="flex items-center justify-center mb-6">
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl ${
                            notification.type === "accept application"
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                : notification.type === "reject application"
                                    ? 'bg-gradient-to-r from-red-500 to-rose-500'
                                    : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                        }`}>
                            {notification.type === "accept application" ? (
                                <CheckCircle className="w-10 h-10 text-white" />
                            ) : notification.type === "reject application" ? (
                                <X className="w-10 h-10 text-white" />
                            ) : (
                                <Bell className="w-10 h-10 text-white" />
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className={`text-3xl font-bold text-center mb-4 ${
                        notification.type === "accept application"
                            ? 'text-green-900'
                            : notification.type === "reject application"
                                ? 'text-red-900'
                                : 'text-gray-900'
                    }`}>
                        {notification.title}
                    </h1>

                    {/* Message */}
                    <p className="text-lg text-gray-700 text-center leading-relaxed mb-8">
                        {notification.message}
                    </p>

                    {/* Timestamp */}
                    {notification.createdAt && (
                        <p className="text-center text-sm text-gray-500 mb-8">
                            {new Date(notification.createdAt).toLocaleString()}
                        </p>
                    )}

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-8"></div>

                    {/* Company Info */}
                    {notification.Company && (
                        <Link 
                            href={`/company/${notification.Company.id}`}
                            className="group block"
                        >
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 hover:shadow-lg transition-all duration-300">
                                <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
                                    From Company
                                </p>
                                <div className="flex items-center gap-4">
                                    {notification.Company.image ? (
                                        <Image 
                                            src={getProfileImage(notification.Company)}
                                            alt="company image"
                                            width={64}
                                            height={64}
                                            priority
                                            className="w-16 h-16 rounded-2xl object-cover shadow-lg ring-4 ring-white"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                                            <Building2 className="w-8 h-8 text-white" />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                                            {notification.Company.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">View company profile</p>
                                    </div>
                                    <div className="ml-auto text-gray-400 group-hover:text-indigo-600 transition-colors duration-300">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}