import { redirect } from "next/dist/server/api-utils"
import { cookies } from "next/headers"
import Image from "next/image"

export default async function Followers()
{
    const cookieStore = cookies()

    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/employer")

    const response = await fetch("http://localhost:4000/api/companies/followers",{
        headers:{
            token: token
        }
    })

    if(response.status === 401 || response.status === 403)
        redirect("/login/employer")

    const data = await response.json()

    console.log(data);

    const followers = data.followers

    return(
        <div className="w-full h-screen p-6 flex gap-5 items-center justify-center flex-col">
                    <h1 className="text-gray-800 text-left text-2xl">Your Followers</h1>
                    {
                        followers.map((follower) =>
                        (
                            <div key={follower.id} className="w-full p-4 shadow-sm rounded-2xl">
                                <div>
                                        <div className="flex items-center gap-2">
                                        {
                                            follower.image ? 
                                            <Image 
                                                src={`http://localhost:4000/${follower.image}`}
                                                width={300}
                                                height={300}
                                                priority
                                                className="w-10 h-10 rounded-full" 
                                                alt="applicant image"
                                            />
                                            : 
                                            <div className="w-10 h-10 rounded-full bg-gray-500"></div>
                                        }
                                        <h1>{follower.first_name} {follower.last_name}</h1>
                                    </div>
                                    <span className="text-gray-500 mt-3">{follower.email}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
    )
}