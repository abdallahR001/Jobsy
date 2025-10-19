
"use client"
import { useState } from "react"
import { Plus, X, Upload, File, FileText, Image as ImageIcon, Download, Trash2, Loader2 } from "lucide-react"
import Image from "next/image"

export default function PortfolioFiles({initialFiles}) {
    const [files, setFiles] = useState(initialFiles || [])
    const [showUploadPopup, setShowUploadPopup] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

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

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if(file) {
            setSelectedFile(file)
            setError("")
        }
    }

    const handleUpload = async () => {
        if(!title.trim() || !selectedFile) {
            setError("Title and file are required")
            return
        }

        setLoading(true)
        setError("")

        try {
            const formData = new FormData()
            formData.append("file", selectedFile)
            formData.append("title", title)
            formData.append("description", description)

            const response = await fetch("http://localhost:4000/api/users/upload-file", {
                method: "POST",
                credentials: "include",
                body: formData
            })

            const result = await response.json()

            if(!response.ok) {
                setError(result.message)
                setLoading(false)
                return
            }

            setFiles([...files, result.file])
            setShowUploadPopup(false)
            setTitle("")
            setDescription("")
            setSelectedFile(null)
            setLoading(false)
        } catch (error) {
            setError("Upload failed. Please try again.")
            setLoading(false)
        }
    }

    const handleDelete = async (fileId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/users/delete-file/${fileId}`,
            {
                method:"DELETE",
                credentials:"include"
            }
        )
        if(response.status === 401 || response.status === 403)
            window.location.replace("/login/jobseeker")

        const result = await response.json()
        console.log(result);

        setFiles(prev => prev.filter(file => file.id !== fileId))
        
        } 
        catch (error) {
            setFiles(prev => prev)    
        }
    }

    return(
        <div className="bg-white/90 backdrop-blur-sm w-full rounded-3xl shadow-2xl p-6 sm:p-8 transition-all duration-300">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <File className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Portfolio</h3>
                        <p className="text-sm text-gray-500">{files.length} files uploaded</p>
                    </div>
                </div>
                
                <button
                    onClick={() => setShowUploadPopup(true)}
                    className="bg-gradient-to-r cursor-pointer from-indigo-600 via-purple-600 to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                    <Plus className="w-5 h-5" />
                    <span>Upload File</span>
                </button>
            </div>

            {/* Files List */}
            {files.length > 0 ? (
                <div className="space-y-4">
                    {files.map((file) => (
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
                                            <Download className="w-4 h-4" />
                                            <span>Download</span>
                                        </a>
                                        <button
                                            onClick={() => handleDelete(file.id)}
                                            className="px-5 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>Delete</span>
                                        </button>
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
                    <p className="text-gray-600">Upload your portfolio files to showcase your work</p>
                </div>
            )}

            {/* Upload Popup */}
            {showUploadPopup && (
                <div>
                    {/* Overlay */}
                    <div 
                        className="fixed rounded-2xl inset-0 transition-all duration-500 bg-black/40 backdrop-blur-sm z-50"
                        onClick={() => setShowUploadPopup(false)}
                    />
                    
                    {/* Popup */}
                    <div className="fixed inset-0 w-full h-full z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
                            <button
                                onClick={() => setShowUploadPopup(false)}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Portfolio File</h2>

                            <div className="space-y-4">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                                        placeholder="Enter file title"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 resize-none"
                                        rows={3}
                                        placeholder="Enter file description (optional)"
                                    />
                                </div>

                                {/* File Upload */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">File *</label>
                                    <label className="block">
                                        <input
                                            type="file"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />
                                        <div className="w-full px-4 py-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer text-center">
                                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">
                                                {selectedFile ? selectedFile.name : "Click to upload file"}
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Error */}
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                        {error}
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    onClick={handleUpload}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Uploading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-5 h-5" />
                                            <span>Upload File</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}