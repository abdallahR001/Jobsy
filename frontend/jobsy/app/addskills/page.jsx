import UserSkillsForm from "../components/AddUserSkillsForm/AddUserSkillsForm";
import { cookies } from "next/headers";
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
        <div className="w-full h-screen flex items-center justify-center flex-col">
            <h1>here you can add your skills</h1>
            <div>
                <UserSkillsForm field={data.field.field}/>
            </div>
        </div>
    )
}