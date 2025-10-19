import { cookies } from "next/headers";
import DashBoardCard from "./DashboardCard";
import { Briefcase, Rocket, UserPlus, Users } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardCards() {

  const cookieStore = cookies()
  
  const token = (await cookieStore).get("token")?.value

  const response = await fetch("http://localhost:4000/api/companies/dashboard",{
              headers:{
                token: token
              }
            })

          if(response.status === 401 || response.status === 403)
          {
            redirect("/login/employer")
          }

          const data = await response.json()

  return (
      <div className="p-6 w-full">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Back! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Here's what's happening with your company today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashBoardCard 
            title={"All Jobs"} 
            icon={<Briefcase />} 
            value={data.jobs} 
            color={"blue"}
            trend="+12% from last month"
          />
          <DashBoardCard 
            title={"Active Jobs"} 
            icon={<Rocket />} 
            value={data.activeJobs} 
            color={"green"}
            trend="+8% from last month"
          />
          <DashBoardCard 
            title={"Applicants"} 
            icon={<Users />} 
            value={data.applicants} 
            color={"indigo"}
            trend="+23% from last month"
          />
          <DashBoardCard 
            title={"Followers"} 
            icon={<UserPlus />} 
            value={data.followers} 
            color={"yellow"}
            trend="+15% from last month"
          />
        </div>
      </div>
  );
}