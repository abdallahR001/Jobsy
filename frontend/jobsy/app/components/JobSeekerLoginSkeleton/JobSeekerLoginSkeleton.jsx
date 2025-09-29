"use client"

import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function JobSeekerLoginFormSkeleton() {
  return (
    <div className="bg-white shadow-md rounded-2xl p-8 animate-pulse">
      {/* Form inputs */}
      <div className="space-y-6 flex flex-col gap-3">
        <Skeleton height={48} className="rounded-2xl" />
        <Skeleton height={48} className="rounded-2xl" />
      </div>

      {/* Bottom link */}
      <div className="mt-6 text-center">
        <Skeleton width="70%" height={16} className="mx-auto" />
      </div>
    </div>
  )
}
