import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserImage from "../components/UserProfile/Image";
import UserName from "../components/UserProfile/UserName";
import { Mail } from "lucide-react";
import UserBio from "../components/UserProfile/UserBio";

export default async function Profile()
{
    const cookieStore = cookies()

    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/jobseeker")

    const response = await fetch("http://localhost:4000/api/users/profile",{
        headers:{
            token:token
        }
    })

    if(response.status === 401 || response.status === 403)
        redirect("/login/jobseeker")

    if(!response.ok)
        redirect("/")

    const data = await response.json()

    console.log(data);
    
    const profile = data.profile
    return(
        <div className="flex justify-center items-center w-full h-screen flex-col gap-3">
            <UserImage userImage={profile.image}/>
            <UserName FirstName={profile.first_name} LastName={profile.last_name} />
            <span className="text-gray-400 text-sm flex items-center justify-center gap-2"><Mail/>{profile.email}</span>
            <UserBio bio={profile.bio}/>
        </div>
    )
}