import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import HomePageContent from "../components/HomeContent/HomeContent"

export default async function Home() {
    //  Dummy data للوظائف
    // const recentJobs = [
    //     {
    //         id: 1,
    //         title: "Senior Frontend Developer",
    //         company: "Tech Solutions Inc",
    //         location: "Cairo, Egypt",
    //         type: "Full-Time",
    //         salary: "$50,000 - $70,000",
    //         logo: null,
    //         postedAt: "2 days ago"
    //     },
    //     {
    //         id: 2,
    //         title: "UI/UX Designer",
    //         company: "Creative Studio",
    //         location: "Remote",
    //         type: "Remote",
    //         salary: "$40,000 - $60,000",
    //         logo: null,
    //         postedAt: "3 days ago"
    //     },
    //     {
    //         id: 3,
    //         title: "Backend Engineer",
    //         company: "Data Corp",
    //         location: "Alexandria, Egypt",
    //         type: "Full-Time",
    //         salary: "$45,000 - $65,000",
    //         logo: null,
    //         postedAt: "5 days ago"
    //     },
    //     {
    //         id: 4,
    //         title: "Product Manager",
    //         company: "Innovation Labs",
    //         location: "Cairo, Egypt",
    //         type: "Full-Time",
    //         salary: "$60,000 - $80,000",
    //         logo: null,
    //         postedAt: "1 week ago"
    //     },
    //     {
    //         id: 5,
    //         title: "Mobile Developer",
    //         company: "App Factory",
    //         location: "Remote",
    //         type: "Part-Time",
    //         salary: "$35,000 - $50,000",
    //         logo: null,
    //         postedAt: "1 week ago"
    //     },
    //     {
    //         id: 6,
    //         title: "DevOps Engineer",
    //         company: "Cloud Systems",
    //         location: "Cairo, Egypt",
    //         type: "Full-Time",
    //         salary: "$55,000 - $75,000",
    //         logo: null,
    //         postedAt: "2 weeks ago"
    //     }
    // ]

    // // Dummy data للشركات
    // const featuredCompanies = [
    //     { id: 1, name: "Tech Solutions Inc", employees: 250, openJobs: 12, logo: null },
    //     { id: 2, name: "Creative Studio", employees: 80, openJobs: 5, logo: null },
    //     { id: 3, name: "Data Corp", employees: 500, openJobs: 20, logo: null },
    //     { id: 4, name: "Innovation Labs", employees: 150, openJobs: 8, logo: null },
    //     { id: 5, name: "App Factory", employees: 100, openJobs: 6, logo: null },
    //     { id: 6, name: "Cloud Systems", employees: 300, openJobs: 15, logo: null },
    //     { id: 7, name: "Digital Agency", employees: 60, openJobs: 4, logo: null },
    //     { id: 8, name: "Marketing Pro", employees: 120, openJobs: 7, logo: null }
    // ]

    const cookieStore = cookies()

    const token = (await cookieStore).get("token")?.value

    if(!token)
        redirect("/login/jobseeker")

    const response = await fetch("http://localhost:4000/api/users/home",{
        headers:{
            token:token
        }
    })

    const data = await response.json()

    if(response.status === 401 || response.status === 403)
        redirect("/login/jobseeker")

    console.log(data);

    const feed = data?.feed
    
    const {activeJobsCount,jobSeekersCount,companiesCount,jobsFeed,companiesFeed} = feed

    
    
    return (
        <div>
            <HomePageContent activeJobsCount={activeJobsCount} jobSeekersCount={jobSeekersCount} companiesCount={companiesCount} jobsFeed={jobsFeed} companiesFeed={companiesFeed}/>
        </div>
    )
}