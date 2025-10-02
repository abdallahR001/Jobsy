"use client"
import { Eye } from "lucide-react"
import Link from "next/link"

export default function ViewProfileButton({userId}) {
    return(
        <Link 
            href={`/`}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 flex items-center justify-center gap-2"
        >
            <Eye/>
            <span>View Profile</span>
        </Link>
    )
}