import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
export default async function Notification({params})
{
    const {notificationId} = await params

    const cookieStore = cookies()
    
    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/jobseeker")

    const response = await fetch(`http://localhost:4000/api/notifications/${notificationId}`,
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

    console.log(data);
    

    if(response.status === 401 || response.status === 403)
        redirect("/login/jobseeker")

    const getProfileImage = (company) => {
    if (!company?.image) return "/default-avatar.png" // صورة افتراضية لو مفيش صورة
    return company.image.startsWith("http")
      ? company.image // من جوجل أو أي لينك خارجي
      : `http://localhost:4000/${company.image}` // متخزنة في السيرفر بتاعك
  }

    return(
        <div className="w-full h-screen flex items-center justify-center gap-3 flex-col">
            <Link href={`/company/${data.notification.Company.id}`}>
                <div className="flex items-center gap-3">
                    <Image 
                        src={getProfileImage(data.notification.Company)}
                        alt="company image"
                        width={200}
                        height={200}
                        priority
                        className="w-10 h-10 rounded-full"
                    />
                    <h1>{data.notification.Company.name}</h1>
                </div>
            </Link>
            <p>message: {data.notification.message}</p>
        </div>
    )
}