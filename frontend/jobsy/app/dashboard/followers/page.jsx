import { redirect } from "next/dist/server/api-utils"
import { cookies } from "next/headers"
import Image from "next/image"
import { UserPlus, Mail, User, Heart } from "lucide-react"

export default async function Followers()
{
    const cookieStore = cookies()

    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/employer")

    const response = await fetch("http://localhost:4000/api/companies/followers",{
        headers:{
            token: token
        }
    })

    if(response.status === 401 || response.status === 403)
        redirect("/login/employer")

    const data = await response.json()

    const followers = data.followers

    const getProfileImage = (user) => {
    if (!user?.image) return 
    return user.image.startsWith("http")
      ? user.image // من جوجل أو أي لينك خارجي
      : `http://localhost:4000/${user.image}` // متخزنة في السيرفر بتاعك
  }

    return(
        <div className="w-full min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">Your Followers</h1>
                            <p className="text-lg text-gray-600">{followers.length} people following your company</p>
                        </div>
                    </div>
                </div>

                {/* Followers Grid */}
                {followers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {followers.map((follower) => (
                            <div 
                                key={follower.id} 
                                className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6 overflow-hidden"
                            >
                                {/* Background gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-rose-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Profile Image */}
                                    <div className="mb-4">
                                        {follower.image ? (
                                            <Image 
                                                src={getProfileImage(follower)}
                                                width={80}
                                                height={80}
                                                priority
                                                className="w-20 h-20 rounded-2xl object-cover shadow-lg ring-4 ring-white group-hover:ring-pink-200 transition-all duration-300" 
                                                alt="follower image"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                                                <User className="w-10 h-10 text-white" />
                                            </div>
                                        )}
                                        
                                        {/* Following Badge */}
                                        <div className="mt-2 inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold border border-pink-200">
                                            <Heart className="w-3 h-3 fill-current" />
                                            <span>Following</span>
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <h2 className="text-xl font-bold text-gray-900 capitalize mb-2 group-hover:text-pink-600 transition-colors duration-300">
                                        {follower.first_name} {follower.last_name}
                                    </h2>

                                    {/* Title */}

                                    <h3 className="text-sm font-bold text-gray-900 capitalize mb-2 group-hover:text-pink-600 transition-colors duration-300">
                                        a {follower.title}
                                    </h3>

                                    {/* Email */}
                                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                                        <Mail className="w-4 h-4" />
                                        <span className="text-sm break-all">{follower.email}</span>
                                    </div>

                                    {/* Action Button */}
                                    <button className="w-full cursor-pointer bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105">
                                        View Profile
                                    </button>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-rose-400 to-red-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-16 text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <UserPlus className="w-10 h-10 text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Followers Yet</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            When job seekers follow your company, they will appear here. Keep posting great jobs to attract more followers!
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}