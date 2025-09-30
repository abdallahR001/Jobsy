import DashboardCards from "../components/DashBoardCards/DashBoardCards";
import RecentJobsSection from "../components/RecentJobsSection/RecentJobsSection";

export default function Dashboard(){
    return(
        <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
            <DashboardCards />
            <RecentJobsSection />
        </div>
    )
}