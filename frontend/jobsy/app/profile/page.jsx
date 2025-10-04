import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserImage from "../components/UserProfile/Image";
import UserName from "../components/UserProfile/UserName";
import UserTitle from "../components/UserProfile/UserTitle";
import { Mail, User as UserIcon, FileText, Star } from "lucide-react";
import UserBio from "../components/UserProfile/UserBio";
import UserLocation from "../components/UserProfile/Location";
import PortfolioFiles from "../components/UserProfile/PortfolioFiles";
import UserSkills from "../components/UserSkills/UserSkills";

export default async function Profile()
{
    const cookieStore = cookies()

    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/jobseeker")

    const response = await fetch("http://localhost:4000/api/users/profile",{
        headers:{
            token:token
        }
    })

    if(response.status === 401 || response.status === 403)
        redirect("/login/jobseeker")

    if(!response.ok)
        redirect("/")

    const data = await response.json()
    
    const profile = data.profile

    console.log(data);
    
    
    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-purple-100 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
                    <p className="text-lg text-gray-600">Manage your personal information</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Image & Basic Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 sticky top-6">
                            {/* User Image */}
                            <div className="flex justify-center mb-6">
                                <UserImage userImage={profile.image}/>
                            </div>

                            {/* User Name */}
                            <div className="mb-4">
                                <UserName FirstName={profile.first_name} LastName={profile.last_name} />
                            </div>

                            {/* User Title */}
                            <div className="mb-6">
                                <UserTitle title={profile.title}/>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100 my-6"></div>

                            {/* Email */}
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-gray-500 font-medium mb-1">Email</p>
                                        <p className="text-sm font-semibold text-gray-900 truncate">{profile.email}</p>
                                    </div>
                                </div>
                                
                            </div>
                            <UserLocation location={profile.location}/>
                        </div>
                    </div>

                    {/* Right Column - Bio */}
                    <div className="lg:col-span-2 flex flex-col gap-3">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">About Me</h3>
                                    <p className="text-sm text-gray-500">Tell recruiters about yourself</p>
                                </div>
                            </div>
                            
                            <UserBio bio={profile.bio}/>
                            <div className="bg-gray-100 w-full h-[1px] rounded-full my-4"/>
                            <div>
                                <h1 className="text-3xl text-gray-800 flex items-center gap-2">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white">
                                        <Star  className="w-6 h-6"/>
                                    </div>
                                    skills
                                </h1>
                                <UserSkills userSkills={profile.skills}/>
                            </div>
                        </div>
                        <div>
                            <PortfolioFiles initialFiles={profile.PortfolioFiles}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}