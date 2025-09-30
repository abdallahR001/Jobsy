import { Lock, Eye, Unlock, Users, MapPin, DollarSign, Briefcase, Calendar, Trash2 } from "lucide-react";
import DeleteJobButton from "../DeleteJobButton/DeleteJobButton";
import Link from "next/link";

export default function JobDashboardCard({ job }) {
  
  return (
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6 overflow-hidden">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        {/* Left Section - Job Info */}
        <div className="flex-1 w-full space-y-4">
          {/* Title and Type */}
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-bold text-gray-900 capitalize group-hover:text-indigo-600 transition-colors duration-300">
              {job.title}
            </h3>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full border border-indigo-200">
              <Briefcase className="w-3 h-3" />
              {job.type}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed line-clamp-2 max-w-xl">
            {job.description}
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-medium capitalize">{job.location}</span>
          </div>

          {/* Details Grid */}
          <div className="flex flex-wrap gap-3">
            {job.minimum_years_required && (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">
                  {job.minimum_years_required} years
                </span>
              </div>
            )}
            
            {job.salary && (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">
                  {job.salary}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Status & Actions */}
        <div className="flex flex-col items-start lg:items-end gap-4 w-full lg:w-auto">
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold ${
                job.job_status === "open"
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${
                job.job_status === "open" ? "bg-emerald-500" : "bg-red-500"
              } animate-pulse`}></div>
              <span className="capitalize">{job.job_status}</span>
              {job.job_status === "open" ? 
                <Unlock className="w-4 h-4" /> : 
                <Lock className="w-4 h-4" />
              }
            </span>
          </div>

          {/* Applicants Count */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-3 rounded-2xl border border-purple-100 w-full lg:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Applicants</p>
                <p className="text-xl font-bold text-gray-900">{job._count.applications}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full lg:w-auto">
            <Link 
              href={`/dashboard/job/${job.id}`} 
              className="group/btn flex-1 lg:flex-none bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105"
            >
              <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
              <span>View Details</span>
            </Link>
            
            <DeleteJobButton jobId={job.id} />
          </div>

          {/* Posted Date */}
          {job.createdAt && (
            <p className="text-xs text-gray-400">
              Posted {new Date(job.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
    </div>
  );
}