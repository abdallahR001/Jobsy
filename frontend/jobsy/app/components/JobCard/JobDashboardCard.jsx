import { Lock, Navigation, Unlock, User } from "lucide-react";

export default function JobDashboardCard({ job }) {
  
  return (
    <div className="w-full bg-white shadow-md hover:shadow-lg rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-shadow duration-300">
      {/* Left side */}
      <div className="flex-1">
        <div className="mb-5 flex items-center gap-4">
          <h3 className="text-lg capitalize font-semibold text-gray-900">{job.title}</h3>
          <span className="text-sm text-gray-400">{job.type}</span>
        </div>
        <p className="text-sm text-gray-600 w-[30%] md:w-2xl truncate">{job.description}</p>
        <div className="flex mt-4 items-center gap-3">
          <p className="text-sm text-gray-500 capitalize">📍 {job.location}</p>
          {job.minimum_years_required ? 
          <span className="px-4 py-2 text-sm bg-indigo-100 rounded-full text-indigo-800">Years Required: {job.minimum_years_required} 🏢</span>
          : ""
        }
        {job.salary ? <span className="px-4 py-2 text-sm bg-indigo-100 rounded-full text-indigo-800">Salary: {job.salary} 💰</span> : ""}
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col items-start md:items-end gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
            job.job_status === "open"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {job.job_status} {job.job_status === "open" ? <Unlock/> : <Lock/>}
        </span>
        <p className="text-sm text-gray-500 flex gap-1 items-center my-3">{job._count.applications} Applicants <User/></p>
        <button className="cursor-pointer flex items-center gap-1 transition-all duration-300 bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 rounded-full">
          Details
          <Navigation />
        </button>
      </div>
    </div>
  );
}
