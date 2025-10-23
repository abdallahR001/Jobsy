import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import GenerateResumeForm from "../components/GenerateResume/GenerateReusmeForm"

export default async function GenerateResume() {
    const cookieStore = cookies()
    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/jobseeker")

    const response = await fetch("http://localhost:4000/api/users/profile", {
        headers: {
            token: token
        }
    })

    if(response.status === 401 || response.status === 403)
        redirect("/login/jobseeker")

    if(!response.ok)
        redirect("/")

    const data = await response.json()

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <GenerateResumeForm userData={data.profile} />
            </div>
        </div>
    )
}