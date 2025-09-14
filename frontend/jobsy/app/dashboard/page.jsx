import DashboardCards from "../components/DashBoardCards/DashBoardCards";
import RecentJobsSection from "../components/RecentJobsSection/RecentJobsSection";
import Sidebar from "../components/SideBar/SideBar";

export default function Dashboard(){
    return(
    <div className="flex min-h-screen ">
        <Sidebar />
        <div className="flex flex-col w-full">
            <DashboardCards />
            <RecentJobsSection />
        </div>
    </div>
    
)
}