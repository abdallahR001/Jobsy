import AcceptButton from "@/app/components/AcceptAppliacantButton/AcceptButton"
import AcceptApplicationForm from "@/app/components/AcceptApplicantForm/AcceptApplicationForm"
import { cookies } from "next/headers"
export default async function AcceptApplication({params})
{

    const {applicationId} = await params
    const cookieStore = cookies()
    
    const token = (await cookieStore).get("token")?.value
    
    if(!token)
        redirect("/login/employer")

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen gap-3">
            <h1>accept the job application and write a start message!</h1>
            <AcceptApplicationForm applicationId={applicationId} token={token}/>
        </div>
    )
}