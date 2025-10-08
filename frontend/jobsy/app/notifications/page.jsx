import { CheckCircle, X } from "lucide-react"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Notifications()
{
    const cookieStore = cookies()

    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/jobseeker")

    const response = await fetch("http://localhost:4000/api/notifications",
        {
            headers:{
                token:token
            }
        }
    )

    const data = await response.json()

    if(!response.ok)
    {
        console.log(data);
        return
    }

    if(response.status === 401 || response.status === 403)
        redirect("/login/jobseeker")

    const notifications = data.notifications

    console.log(notifications);
    
    return(
        <div className="flex items-center justify-center p-4 w-full h-screen flex-col gap-3">
            <h1 className="text-gray-800 text-3xl font-bold mb-5">Notifications</h1>
            {
                notifications.map((notification) => (
                    <Link href={`/notifications/${notification.id}`} className="w-full p-4 shadow-sm rounded-2xl relative" key={notification.id}>
                        <h1 className={`text-2xl font-semibold ${notification.type === "accept application" ? "text-green-500" : notification.type === "reject application" ? "text-red-500" : "text-gray-800"}`}>
                            {notification.type === "accept application" ? <CheckCircle /> : <X/>} {notification.type === "accept application" ? notification.title : notification.title}
                        </h1>
                        <p>{notification.message}</p>
                        {
                            !notification.seen ? 
                            <div className="bg-red-500 w-5 h-5 absolute top-5 right-5 rounded-full"></div>
                            :
                            ""
                        }
                    </Link>
                ))
            }
        </div>    
    )
}