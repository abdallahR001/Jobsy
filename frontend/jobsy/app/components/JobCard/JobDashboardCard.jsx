export default function JobDashboardCard({ job }) {
  return (
    <div className="w-full bg-white shadow-md hover:shadow-lg rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-shadow duration-300">
      {/* Left side */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
        <p className="text-sm text-gray-600 w-3xl truncate">{job.description}</p>
        <p className="text-sm text-gray-500 mt-4">📍 {job.location}</p>
      </div>

      {/* Right side */}
      <div className="flex flex-col items-start md:items-end gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            job.status === "Open"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {job.status}
        </span>
        <p className="text-sm text-gray-500">{job.applicants} Applicants</p>
        <button className="cursor-pointer transition-all duration-300 bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg">
          Details
        </button>
      </div>
    </div>
  );
}
