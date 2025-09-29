// JobDetailsSkeleton.jsx
export default function JobDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card Skeleton */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 mb-8 border border-white/20">
          {/* Company Header Skeleton */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-5">
              {/* Company Image Skeleton */}
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse ring-4 ring-white shadow-lg"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gray-300 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
              </div>
              <div className="space-y-3">
                {/* Company Name Skeleton */}
                <div className="h-7 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                {/* Status Badge Skeleton */}
                <div className="h-8 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Applications Count Skeleton */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-2xl border border-gray-200 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
                <div>
                  <div className="h-8 w-12 bg-gray-300 rounded animate-pulse mb-1"></div>
                  <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Title & Type Skeleton */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="h-12 w-80 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
              <div className="h-10 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description Skeleton */}
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full animate-pulse"></div>
                <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
              </div>
              <div className="space-y-4">
                <div className="h-6 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                <div className="h-6 w-5/6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                <div className="h-6 w-4/5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                <div className="h-6 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Skills Skeleton */}
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full animate-pulse"></div>
                <div className="h-8 w-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
              </div>
              <div className="flex flex-wrap gap-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-12 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl animate-pulse"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-8">
            {/* Job Details Skeleton */}
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-white/20">
              <div className="h-6 w-28 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse mb-6"></div>
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl animate-pulse shadow-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 w-20 bg-gray-300 rounded animate-pulse mb-2"></div>
                      <div className="h-5 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Button Skeleton */}
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-white/20">
              <div className="w-full h-16 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-2xl animate-pulse shadow-xl mb-4">
                {/* Shimmer effect */}
                <div className="relative overflow-hidden h-full rounded-2xl">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </div>
              </div>
              <div className="h-4 w-48 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </div>
          </div>
        </div>
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