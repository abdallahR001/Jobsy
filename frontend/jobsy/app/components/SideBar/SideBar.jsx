"use client";
import { useState } from "react";
import SidebarLink from "../SideBarLink/SideBarLink";
import {
  Menu,
  X,
  Briefcase,
  Users,
  UserPlus,
  LogOutIcon,
  Building,
  Rocket,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`flex h-screen transition-all z-30 duration-100 ${
        isOpen ? "w-64" : "w-20"
      } bg-white`}
    >
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <span
            className={`text-3xl text-indigo-500 font-bold transition-all duration-300
            ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden hidden"}`}
          >
            Dashboard
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-lg hover:bg-indigo-100 transition-colors duration-300"
          >
            {isOpen ? (
              <X className="hover:text-red-500 transition-colors duration-300 cursor-pointer" />
            ) : (
              <Menu className="hover:text-indigo-500 transition-colors duration-300 cursor-pointer" />
            )}
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col mt-4 space-y-2">
          <SidebarLink href="#" icon={<Building />} text="My Company" isOpen={isOpen} />
          <SidebarLink href="#" icon={<Briefcase />} text="My Jobs" isOpen={isOpen} />
          <SidebarLink href="#" icon={<Rocket />} text="Active Jobs" isOpen={isOpen} />
          <SidebarLink href="#" icon={<Users />} text="Applicants" isOpen={isOpen} />
          <SidebarLink href="#" icon={<UserPlus />} text="Followers" isOpen={isOpen} />
          <SidebarLink href="#" icon={<LogOutIcon />} text="Log Out" isOpen={isOpen} isDanger />
        </nav>
      </div>
    </div>
  );
}
