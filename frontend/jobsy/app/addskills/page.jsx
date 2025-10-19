import UserSkillsForm from "../components/AddUserSkillsForm/AddUserSkillsForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Sparkles } from "lucide-react";

export default async function AddSkills()
{
    const cookieStore = cookies()
    
    const token = (await cookieStore).get("token")?.value
    
    if(!token)
        redirect("/login/jobseeker")

    const response = await fetch("http://localhost:4000/api/users/field",
        {
            headers:{
                token:token
            }
        }
    )

    if(response.status === 401 || response.status === 403)
            redirect("/login/jobseeker")
    
    if(!response.ok)
        redirect("/")

    const data = await response.json()

    console.log(data);
    
    return(
        <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-3xl">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                        <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Add Your Skills</h1>
                            <p className="text-gray-600 mt-1">Showcase your expertise and stand out</p>
                        </div>
                    </div>
                    
                    {/* Form */}
                    <div>
                        <UserSkillsForm field={data.field.field}/>
                    </div>
                </div>
            </div>
        </div>
    )
}