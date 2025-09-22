import CompanyDescription from "@/app/components/CompanyProfile/Description"
import CompanyEmployeesCount from "@/app/components/CompanyProfile/EmployeesCount"
import CompanyImage from "@/app/components/CompanyProfile/Image"
import CompanyName from "@/app/components/CompanyProfile/Name"
import RecentJobsSection from "@/app/components/RecentJobsSection/RecentJobsSection"
import { redirect } from "next/dist/server/api-utils"
import { cookies } from "next/headers"

export default async function MyCompany() {
    const cookieStore = cookies()
    
    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/employer")

    const response = await fetch("http://localhost:4000/api/companies",{
        headers:{
            token:token
        }
    })

    const data = await response.json()

    const company = data.company

    return(
        <div className="p-4 flex items-center justify-center flex-col gap-5 w-full">
            <CompanyImage companyImage={company.image}/>
            <CompanyName name={company.name}/>
            <span className="text-sm text-gray-500">{company.email}</span>
            <CompanyDescription description={company.description}/>
            <CompanyEmployeesCount employeesCount={company.employees_count}/>
            <span className="text-sm text-gray-500">{!company.website === "null" ? `${company.website}` : "no website provided"}</span>
            <RecentJobsSection />
        </div>
    )
}