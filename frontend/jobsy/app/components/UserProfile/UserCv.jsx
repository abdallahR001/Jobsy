"use client"
import { useState } from "react"
import { FileText, Upload, Download, Loader2, Sparkles, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UserCV({ initialCV }) {
    const [cv, setCV] = useState(initialCV || null) // null = no CV, object = has CV
    const [uploading, setUploading] = useState(false)
    const router = useRouter()

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setUploading(true)

        const formData = new FormData()

        formData.append("file",file)

        const response = await fetch("http://localhost:4000/api/users/resume",{
            method:"POST",
            body:formData,
            credentials:"include"
        })

        if(response.status === 401 || response.status === 403)
            router.push("/profile?#")

        const result = await response.json()

        console.log(result.uploadedFile);
        
        setCV(result.uploadedFile)
        
        setUploading(false)
    }

    const handleGenerateResume = () => {
        router.push("/generateresume")
    }

    return (
        <div className="mt-6 space-y-3">
            {/* CV Upload/Download Section */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 font-medium">Resume</p>
                        {/* <p className="text-sm font-semibold text-gray-900 truncate">
                            {cv ? cv.fileName : "No resume uploaded"}
                        </p> */}
                    </div>
                </div>

                {cv ? (
                    <div className="flex flex-col gap-3">
                        <a
                            href={`http://localhost:4000/${cv.url}`}
                            target="blank"
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        >
                            <span className="flex items-center gap-2"><Eye className="w-4 h-4"/>View Resume</span>
                        </a>
                        <label className="block">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx,.txt"
                                onChange={handleFileUpload}
                                className="hidden"
                                disabled={uploading}
                            />
                            <div className="w-full bg-white border-2 border-emerald-300 text-emerald-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-50 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
                                {uploading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Uploading...</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4" />
                                        <span>Upload Resume</span>
                                    </>
                                )}
                            </div>
                    </label>                    </div>
                ) : (
                    <label className="block">
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleFileUpload}
                            className="hidden"
                            disabled={uploading}
                        />
                        <div className="w-full bg-white border-2 border-emerald-300 text-emerald-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-50 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
                            {uploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Uploading...</span>
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4" />
                                    <span>Upload Resume</span>
                                </>
                            )}
                        </div>
                    </label>
                )}
            </div>

            {/* Generate Resume with AI */}
            <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 rounded-2xl p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <p className="text-sm font-semibold text-gray-900">AI Resume Builder</p>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                    Create a professional resume with AI assistance
                </p>
                <button
                    onClick={handleGenerateResume}
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Resume with Genius</span>
                </button>
            </div>
        </div>
    )
}