import { redirect } from "next/navigation"
import AcceptApplicationForm from "@/app/components/AcceptApplicantForm/AcceptApplicationForm"
import { cookies } from "next/headers"
import { CheckCircle, MessageSquare } from "lucide-react"

export default async function AcceptApplication({params})
{
    const {applicationId} = await params
    const cookieStore = cookies()
    
    const token = (await cookieStore).get("token")?.value
    
    if(!token)
        redirect("/login/employer")

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-3xl">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Accept Application</h1>
                            <p className="text-gray-600">Send a welcome message to start the collaboration</p>
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8 border border-emerald-100">
                        <div className="flex items-start gap-3">
                            <MessageSquare className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Write a Welcome Message</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Send a personalized message to the candidate. This will be their first communication with you, so make it warm and professional!
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Form */}
                    <AcceptApplicationForm applicationId={applicationId} token={token}/>
                </div>
            </div>
        </div>
    )
}