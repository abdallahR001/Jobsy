import { Eye, File, FileText, ImageIcon, Mail, MapPin, Star, User } from "lucide-react"
import { cookies } from "next/headers"
import Image from "next/image"
export default async function Profile({params})
{
    const {userId} = await params
    const cookieStore = cookies()
                
    const token = (await cookieStore).get("token")?.value
            
    if(!token)
        redirect("/login/employer")

    const response = await fetch(`http://localhost:4000/api/users/viewprofile/${userId}`,{
        headers:{
            token:token
        }
    })

    if(response.status === 401 || response.status === 403)
        redirect("/login/employer")

    const data = await response.json()

    const user = data.user

    const getProfileImage = () => {
    if (!user?.image) return "/default-avatar.png" 
    return user.image.startsWith("http")
      ? user.image 
      : `http://localhost:4000/${user.image}` 
  }

  const getFileIcon = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase()
        if(['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
            return <ImageIcon className="w-6 h-6" />
        }
        if(['doc', 'docx'].includes(ext)) {
            return <FileText className="w-6 h-6" />
        }
        return <File className="w-6 h-6" />
    }

    const isImage = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase()
        return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-purple-100 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 capitalize">{user.first_name}'s profile</h1>
                    <p className="text-lg text-gray-600">Here you can look at the applicant profile</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Image & Basic Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 sticky top-6">
                            {/* User Image */}
                            <div className="flex justify-center mb-6">
                                {
                                user.image?
                                <Image 
                                    src={`${getProfileImage()}`}
                                    alt="user profile image"
                                    width={150}
                                    height={150}
                                    className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-xl ring-4 ring-indigo-100"
                                    priority
                                />
                                :
                                <div className="w-[150px] h-[150px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                                    <User className="text-3xl w-full text-white" />
                                </div>
                                }
                            </div>

                            {/* User Name */}
                            <div className="mb-4">
                                <h1 className="text-3xl font-bold text-gray-900 capitalize flex-1 text-center">
                                    {user.first_name} {user.last_name}
                                </h1>
                            </div>

                            {/* User Title */}
                            <div className="mb-6">
                                
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100 my-6"></div>

                            {/* Email */}
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-white"/>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-gray-500 font-medium mb-1">Email</p>
                                        <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
                                    </div>
                                </div>
                                
                            </div>
                            {/* location */}
                            <div className="mt-4">
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                                    <div className="flex items-start gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs text-gray-500 font-medium mb-1">Location</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-semibold text-gray-900 break-words">
                                                        {user.location || "Not specified"}
                                                    </p>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Resume Section */}
                                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 mt-8">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-500 font-medium">Resume</p>
                                    </div>
                                </div>

                                {user.resume ? (
                                    <div className="flex flex-col gap-3">
                                    <a
                                        href={`http://localhost:4000/${user.resume.url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                                    >
                                        <Eye className="w-4 h-4" />
                                        <span>View Resume</span>
                                    </a>
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                        <FileText className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-800">No resume uploaded</p>
                                    <p className="text-xs text-gray-500 mt-1">This user hasn’t added a resume yet.</p>
                                    </div>
                                )}
                                </div>
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
                            {/* bio */}
                                <div className="flex-1 w-full text-gray-700 leading-relaxed text-center max-w-3xl break-words">
                                    <p className="flex-1 w-full text-gray-700 leading-relaxed text-center max-w-3xl break-words">
                                        {user.bio}
                                    </p>
                                </div>
                            <div className="bg-gray-100 w-full h-[1px] rounded-full my-4"/>
                            <div>
                                {/* skills */}
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-3xl text-gray-800 flex items-center gap-2">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white">
                                                <Star className="w-6 h-6"/>
                                            </div>
                                            skills
                                        </h1>
                                    </div>
                                    <div className="mt-4 flex items-center justify-start gap-3">
                                        {
                                            user.skills.map((skill) => (
                                                <span
                                                    key={skill.id}
                                                    className="bg-indigo-100 flex items-center gap-2 relative text-indigo-800 px-3 py-2 rounded-full hover:bg-indigo-200 transition text-base"
                                                >
                                                    {skill.name}
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* portfolio */}
                            <div className="bg-white/90 backdrop-blur-sm w-full rounded-3xl shadow-2xl p-6 sm:p-8 transition-all duration-300">
                                {/* Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <File className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Portfolio</h3>
                                            <p className="text-sm text-gray-500">{user.PortfolioFiles.length} files uploaded</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Files List */}
                                {user.PortfolioFiles.length > 0 ? (
                                    <div className="space-y-4">
                                        {user.PortfolioFiles.map((file) => (
                                            <div key={file.id} className="group bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl border border-gray-200 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 overflow-hidden">
                                                <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
                                                    {/* File Preview */}
                                                    <div className="flex-shrink-0 w-full md:w-48 h-48 rounded-xl overflow-hidden bg-gray-100">
                                                        {isImage(file.fileName) ? (
                                                            <Image
                                                                src={`http://localhost:4000/${file.url}`}
                                                                width={200}
                                                                height={200}
                                                                className="object-cover w-full h-full"
                                                                alt={file.title}
                                                                priority
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                                                                <div className="text-indigo-600">
                                                                    {getFileIcon(file.fileName)}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* File Info */}
                                                    <div className="flex-1 flex flex-col justify-between min-w-0">
                                                        <div>
                                                            <h4 className="font-bold text-xl text-gray-900 mb-2">{file.title}</h4>
                                                            {file.description && (
                                                                <p className="text-sm w-full text-gray-600 leading-relaxed break-words mb-3">{file.description}</p>
                                                            )}
                                                            <p className="text-xs text-gray-400 font-medium break-words">{file.fileName}</p>
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="flex flex-col sm:flex-row gap-2 mt-4">
                                                            <a
                                                                href={`http://localhost:4000/${file.url}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                                <span>View</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                        <File className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No files uploaded yet</h3>
                                    <p className="text-gray-600">This user hasn’t added any portfolio files yet.</p>
                                </div>
                            )}
</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}