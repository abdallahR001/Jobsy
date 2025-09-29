"use client"
// JobCardSkeleton.jsx
export default function JobCardSkeleton() {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 flex flex-col justify-between overflow-hidden animate-pulse">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Status Badges */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
            <div className="h-6 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
          </div>

          {/* Job Title */}
          <div className="space-y-2">
            <div className="h-6 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
            <div className="h-6 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
          </div>
        </div>

        {/* Applications Count */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-2 rounded-xl border border-gray-200 ml-4">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="w-6 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2 mb-6">
        <div className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
        <div className="h-4 w-5/6 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
        <div className="h-4 w-4/5 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
      </div>

      {/* Company Section */}
      <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl transition-all duration-300 mb-6 border border-gray-100">
        <div className="relative">
          {/* Company Image */}
          <div className="w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl shadow-md"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
          <div className="h-3 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
        </div>
      </div>

      {/* Job Details Grid */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* Salary */}
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl border border-gray-200">
          <div className="w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg"></div>
          <div className="space-y-1">
            <div className="h-3 w-12 bg-gray-300 rounded"></div>
            <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl border border-gray-200">
          <div className="w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg"></div>
          <div className="space-y-1">
            <div className="h-3 w-16 bg-gray-300 rounded"></div>
            <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Skills Tags */}
      <div className="mb-6">
        <div className="h-3 w-24 bg-gray-300 rounded mb-2"></div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            ></div>
          ))}
          <div className="h-6 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 items-center">
        {/* Details Button */}
        <div className="flex-1 h-12 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-2xl relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        {/* Save Button */}
        <div className="w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl"></div>
      </div>

      {/* Posted Time */}
      <div className="text-center mt-4 pt-4 border-t border-gray-100">
        <div className="h-3 w-20 bg-gray-300 rounded mx-auto"></div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
