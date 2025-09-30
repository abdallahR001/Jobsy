"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLink({ href, icon, text, isOpen, isDanger, logout}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      onClick={isDanger ? logout : undefined}
      href={href}
      className={`group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
          : isDanger 
            ? 'text-red-500 hover:bg-red-50' 
            : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600'
      }`}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 transition-transform duration-300 ${
        isActive ? 'scale-110' : 'group-hover:scale-110'
      }`}>
        {icon}
      </div>

      {/* Text */}
      {isOpen && (
        <span className="font-medium whitespace-nowrap transition-all duration-300">
          {text}
        </span>
      )}

      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
      )}

      {/* Hover effect */}
      {!isActive && !isDanger && (
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
      )}
    </Link>
  );
}