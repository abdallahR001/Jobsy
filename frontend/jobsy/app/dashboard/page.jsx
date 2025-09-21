import DashboardCards from "../components/DashBoardCards/DashBoardCards";
import RecentJobsSection from "../components/RecentJobsSection/RecentJobsSection";

export default function Dashboard(){
    return(
        <div className="flex flex-col w-full">
            <DashboardCards />
            <RecentJobsSection />
        </div>
    
)
}