"use client"
import { useState } from "react"
import { Sparkles, Loader2, Download, ArrowLeft, FileText, Briefcase, GraduationCap, Award, Mail, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

export default function GenerateResumeForm({ userData }) {
    const [generating, setGenerating] = useState(false)
    const [generated, setGenerated] = useState(false)
    const [additionalInfo, setAdditionalInfo] = useState("")
    const router = useRouter()

    const templates = [
        { id: "modern", name: "Modern", color: "from-indigo-500 to-purple-500" },
        { id: "professional", name: "Professional", color: "from-blue-500 to-cyan-500" },
        { id: "creative", name: "Creative", color: "from-pink-500 to-rose-500" },
        { id: "minimal", name: "Minimal", color: "from-gray-600 to-gray-800" }
    ]

    const handleGenerate = async () => {
        setGenerating(true)
        
        // Simulate AI generation - Replace with actual Gemini API call
        setTimeout(() => {
            setGenerating(false)
            setGenerated(true)
        }, 3000)
    }

    const handleDownload = () => {
        // Implement download logic here
        alert("Resume downloaded!")
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-300"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Profile</span>
                </button>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Generate Your Resume</h1>
                <p className="text-lg text-gray-600">Let AI create a professional resume based on your profile</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
                        {!generated ? (
                            <>
                                {/* User Info Summary */}
                                <div className="mb-8 pb-8 border-b border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FileText className="w-6 h-6 text-indigo-600" />
                                        Your Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-xs text-gray-500 mb-1">Name</p>
                                            <p className="font-semibold text-gray-900">{userData.first_name} {userData.last_name}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-xs text-gray-500 mb-1">Title</p>
                                            <p className="font-semibold text-gray-900">{userData.title || "Not specified"}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-xs text-gray-500 mb-1">Email</p>
                                            <p className="font-semibold text-gray-900 truncate">{userData.email}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-xs text-gray-500 mb-1">Location</p>
                                            <p className="font-semibold text-gray-900">{userData.location || "Not specified"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Template Selection */}
                                {/* <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Template</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {templates.map((template) => (
                                            <button
                                                key={template.id}
                                                onClick={() => setSelectedTemplate(template.id)}
                                                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                                                    selectedTemplate === template.id
                                                        ? "border-indigo-500 shadow-lg scale-105"
                                                        : "border-gray-200 hover:border-gray-300"
                                                }`}
                                            >
                                                <div className={`w-full h-20 bg-gradient-to-r ${template.color} rounded-lg mb-3`}></div>
                                                <p className="font-semibold text-gray-900 text-sm">{template.name}</p>
                                                {selectedTemplate === template.id && (
                                                    <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div> */}

                                {/* Additional Instructions */}
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Instructions (Optional)</h2>
                                    <textarea
                                        value={additionalInfo}
                                        onChange={(e) => setAdditionalInfo(e.target.value)}
                                        placeholder="Add any specific requirements or preferences for your resume..."
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 resize-none"
                                        rows={4}
                                    />
                                </div>

                                {/* Generate Button */}
                                <button
                                    onClick={handleGenerate}
                                    disabled={generating}
                                    className="w-full cursor-pointer bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl"
                                >
                                    {generating ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            <span>Generating Your Resume...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-6 h-6" />
                                            <span>Generate Resume with AI</span>
                                        </>
                                    )}
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Generated Resume Preview */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">Resume Generated!</h2>
                                            <p className="text-gray-600">Your professional resume is ready</p>
                                        </div>
                                    </div>

                                    {/* Preview Box */}
                                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-6 border-2 border-gray-200">
                                        <div className="bg-white rounded-xl p-8 shadow-lg">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{userData.first_name} {userData.last_name}</h3>
                                            <p className="text-indigo-600 font-semibold mb-4">{userData.title}</p>
                                            <div className="space-y-4 text-sm text-gray-600">
                                                <p className="flex items-center gap-3"><Mail/> {userData.email}</p>
                                                <p className="flex items-center gap-3"><MapPin/> {userData.location}</p>
                                                <div className="pt-4 border-t border-gray-200">
                                                    <p className="italic">Professional resume generated with AI based on your profile information...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            onClick={handleDownload}
                                            className="flex-1 cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 rounded-xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                        >
                                            <Download className="w-5 h-5" />
                                            <span>Download Resume</span>
                                        </button>
                                        <button
                                            onClick={() => setGenerated(false)}
                                            className="flex-1 cursor-pointer bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <Sparkles className="w-5 h-5" />
                                            <span>Generate Again</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Right Column - Tips */}
                <div className="lg:col-span-1">
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sticky top-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-purple-600" />
                            AI Resume Tips
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Briefcase className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm mb-1">Complete Profile</p>
                                    <p className="text-xs text-gray-600">Make sure your profile has all necessary information for best results</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Award className="w-5 h-5 text-pink-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm mb-1">Highlight Skills</p>
                                    <p className="text-xs text-gray-600">Add relevant skills to make your resume stand out</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <GraduationCap className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm mb-1">Customize</p>
                                    <p className="text-xs text-gray-600">Use additional instructions to personalize your resume</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                            <p className="text-xs text-gray-700 leading-relaxed">
                                <strong>💡 Pro Tip:</strong> Our AI analyzes your profile and creates a tailored resume that highlights your strengths and matches industry standards.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}