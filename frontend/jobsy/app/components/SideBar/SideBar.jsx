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
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import LogoutButton from "../LogoutButton/LogoutButton";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button - Fixed at top */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 p-3 rounded-xl bg-white shadow-lg border border-gray-200"
      >
        <Menu className="w-6 h-6 text-indigo-600" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`flex h-screen transition-all duration-300 bg-white/95 backdrop-blur-md border-r border-gray-200/50 shadow-lg
        ${isOpen ? "w-72" : "w-20"}
        lg:sticky lg:top-0 fixed z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
      <div className="flex flex-col w-full relative">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={"/dashboard"}
              className={`transition-all duration-300 ${
                isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
              }`}
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">Manage your company</p>
            </Link>
            
            {/* Close button for mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-xl bg-red-50 hover:bg-red-100 transition-all duration-300 border border-red-100"
            >
              <X className="w-5 h-5 text-red-600" />
            </button>

            {/* Toggle button for desktop */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden lg:flex p-2 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 group border border-indigo-100"
            >
              {isOpen ? (
                <ChevronLeft className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <ChevronRight className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col p-4 space-y-2 overflow-y-auto">
          <SidebarLink 
            href="/dashboard" 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            text="Dashboard" 
            isOpen={isOpen} 
          />
          <SidebarLink 
            href="/dashboard/mycompany" 
            icon={<Building className="w-5 h-5" />} 
            text="My Company" 
            isOpen={isOpen} 
          />
          <SidebarLink 
            href="/dashboard/myjobs" 
            icon={<Briefcase className="w-5 h-5" />} 
            text="My Jobs" 
            isOpen={isOpen} 
          />
          <SidebarLink 
            href="/dashboard/activejobs" 
            icon={<Rocket className="w-5 h-5" />} 
            text="Active Jobs" 
            isOpen={isOpen} 
          />
          <SidebarLink 
            href="/dashboard/applicants" 
            icon={<Users className="w-5 h-5" />} 
            text="Applicants" 
            isOpen={isOpen} 
          />
          <SidebarLink 
            href="/dashboard/followers" 
            icon={<UserPlus className="w-5 h-5" />} 
            text="Followers" 
            isOpen={isOpen} 
          />
        </nav>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t border-gray-100">
          <LogoutButton 
            icon={<LogOutIcon className="w-5 h-5" />} 
            text="Logout" 
            isOpen={isOpen}
          />
        </div>

        {/* Decorative gradient bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
      </div>
    </div>
    </>
  );
}