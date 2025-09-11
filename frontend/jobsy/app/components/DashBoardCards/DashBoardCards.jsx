"use client"
import { redirect, useRouter } from "next/navigation";
import DashBoardCard from "./DashboardCard";
import { Briefcase, Rocket, UserPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardCards() {
    const [data,setData] = useState({})

    const router = useRouter()

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const response = await fetch("http://localhost:4000/api/companies/dashboard",{
                credentials:"include"
            })

            if(!response.ok)
            {
                router.push("/login/employer")
                return
            }

            const data = await response.json()

            setData(data)
        }

        fetchData()
    },[])

    console.log(data)
  return (
      <div className="flex-1 p-6 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <DashBoardCard title={"All Jobs"} icon={<Briefcase />} value={data.jobs} color={"text-blue-500"}/>
          <DashBoardCard title={"Active Jobs"} icon={<Rocket />} value={data.activeJobs} color={"text-green-500"}/>
          <DashBoardCard title={"Applicants"} icon={<Users />} value={data.applicants} color={"text-indigo-500"}/>
          <DashBoardCard title={"Followers"} icon={<UserPlus />} value={data.followers} color={"text-yellow-500"}/>
        </div>
      </div>
  );
}
