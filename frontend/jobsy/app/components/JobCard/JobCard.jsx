import Link from "next/link"
import Image from "next/image"
import SaveJobButton from "../SaveJobButton/SaveJobButton"
import { Building2, MapPin, DollarSign, Clock, Users, Eye, Bookmark } from "lucide-react"

export default async function JobCard({ job }) {
  return (
    <div
      key={job.id || job.title}
      className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col justify-between overflow-hidden"
    >
      {/* Background hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {/* Job Status Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full ${
                  job.job_status === "open"
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  job.job_status === "open" ? "bg-emerald-500" : "bg-red-500"
                }`}></div>
                {job.job_status}
              </span>
              
              {job.type && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full border border-indigo-200">
                  <Clock className="w-3 h-3" />
                  {job.type}
                </span>
              )}
            </div>

            {/* Job Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
              {job.title}
            </h2>
          </div>

          {/* Applications Count */}
          {job._count?.applications && (
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-2 rounded-xl border border-purple-100 ml-4">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">{job._count.applications}</span>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {job.description}
        </p>

        {/* Company Section */}
        <Link
          href={`/company/${job.Company?.id}`}
          className="group/company flex items-center gap-4 p-3 bg-gray-50 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-2xl transition-all duration-300 mb-6 border border-gray-100 hover:border-indigo-200"
        >
          <div className="relative">
            {job.Company?.image ? (
              <Image
                src={`http://localhost:4000/${job.Company.image}`}
                width={48}
                height={48}
                alt="company image"
                className="rounded-2xl object-cover w-12 h-12 shadow-md ring-2 ring-white group-hover/company:ring-indigo-200 transition-all duration-300"
                priority
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-md">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          
          <div className="flex-1">
            <p className="font-semibold text-gray-900 group-hover/company:text-indigo-600 transition-colors duration-300">
              {job.Company?.name || "Unknown Company"}
            </p>
            <p className="text-xs text-gray-500">Verified Company</p>
          </div>
        </Link>

        {/* Job Details Grid */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          {/* Salary */}
          {job.salary && (
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Salary</p>
                <p className="font-semibold text-gray-900">{job.salary}</p>
              </div>
            </div>
          )}

          {/* Location */}
          {job.location && (
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Location</p>
                <p className="font-semibold text-gray-900">{job.location}</p>
              </div>
            </div>
          )}
        </div>

        {/* Skills Tags */}
        {job.skills && job.skills.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 mb-2">Required Skills</p>
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill.id}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium border border-indigo-100 hover:border-indigo-300 transition-colors duration-200"
                >
                  {skill.name}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                  +{job.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 items-center">
          <Link
            href={`/job/${job.id}`}
            className="group/btn flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-3 px-4 rounded-2xl font-semibold text-center hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
            <span>View Details</span>
          </Link>

          <div className="relative">
            <SaveJobButton jobId={job.id} initialIsSaved={job.isSaved} />
          </div>
        </div>

        {/* Posted Time */}
        {job.createdAt && (
          <div className="text-center mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Posted {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
    </div>
  )
}