import { cookies } from "next/headers";
import DashBoardCard from "./DashboardCard";
import { Briefcase, Rocket, UserPlus, Users } from "lucide-react";
export default async function DashboardCards() {

  const cookieStore = cookies()
  
  const token = (await cookieStore).get("token")?.value

  const response = await fetch("http://localhost:4000/api/companies/dashboard",{
              headers:{
                token: token
              }
            })

          if(!response.ok)
          {
            router.push("/login/employer")
            return
          }

          const data = await response.json()

  return (
      <div className="p-6 w-full bg-white ">
        <div className="grid p-4 grid-cols-1 shadow-sm rounded-xl sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <DashBoardCard title={"All Jobs"} icon={<Briefcase />} value={data.jobs} color={"blue"}/>
          <DashBoardCard title={"Active Jobs"} icon={<Rocket />} value={data.activeJobs} color={"green"}/>
          <DashBoardCard title={"Applicants"} icon={<Users />} value={data.applicants} color={"indigo"}/>
          <DashBoardCard title={"Followers"} icon={<UserPlus />} value={data.followers} color={"yellow"}/>
        </div>
      </div>
  );
}
