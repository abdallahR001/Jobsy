import Sidebar from "../components/SideBar/SideBar";

export const metadata = {
  title: "dashboard",
  description: "manage your company using your dashboard",
};

export default function RootLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full">
        <Sidebar />
        {children}
    </div>
  );
}
