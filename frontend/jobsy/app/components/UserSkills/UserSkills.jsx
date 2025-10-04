"use client"
import { Plus, Star, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserSkills({userSkills})
{
    const router = useRouter()

    const handleDeleteSkill = async (skillId) =>
    {
        console.log(skillId);
        
        const response = await fetch("http://localhost:4000/api/skills/delete-user-skill",
            {
                method:"PUT",
                body:JSON.stringify({
                    skillId:skillId
                }),
                credentials:"include",
                headers:{
                    "content-type":"application/json"
                }
            }
        )
        if(response.status === 401 || response.status === 403)
            router.push("/login/jobseeker")

        const result = await response.json()

        if(!response.ok)
        {
            console.log(result.message)
            return
        }

        router.push("/profile?#")
    }
    return (
        <div className="mt-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl text-gray-800 flex items-center gap-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white">
                        <Star className="w-6 h-6"/>
                    </div>
                    skills
                </h1>
                <Link className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-2" href={"/addskills"}>
                    <Plus/> Add Skills 
                </Link>
            </div>
            <div className="mt-4 flex items-center justify-start gap-3">
                {
                    userSkills.map((skill) => (
                        <span
                            key={skill.id}
                            className="bg-indigo-100 flex items-center gap-2 relative text-indigo-800 px-3 py-2 rounded-full hover:bg-indigo-200 transition text-base"
                        >
                            {skill.name}
                            <button onClick={() => handleDeleteSkill(skill.id)} className="text-sm cursor-pointer"><X/></button>
                        </span>
                    ))
                }
            </div>
        </div>
    )
}