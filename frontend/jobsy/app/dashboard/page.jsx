import DashboardCards from "../components/DashBoardCards/DashBoardCards";
import Sidebar from "../components/SideBar/SideBar";

export default function Dashboard(){
    return(
    <div className="flex min-h-screen">
        <Sidebar />
        <DashboardCards />
    </div>
    
)
}