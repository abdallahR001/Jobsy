import Link from "next/link";
export default function SidebarLink({ href, icon, text, isOpen, isDanger }) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 ${
        isDanger ? 'text-red-500' : 'text-gray-700 hover:text-indigo-500'
      }`}
    >
      {icon}
      {isOpen && <span>{text}</span>}
    </Link>
  );
}
