import Sidebar from "../components/SideBar/SideBar";

export const metadata = {
  title: "dashboard",
  description: "manage your company using your dashboard",
};

export default function RootLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}