import Link from "next/link"
export default function JobCard({job}){
    return(
        <div
  key={job.id || job.title}
  className="p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
>
  {/* Title */}
  <div>
    <h2 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h2>
    <p className="text-sm text-gray-600 line-clamp-3 mb-3">{job.description}</p>
  </div>

  {/* Company Info */}
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      {job.Company?.image ? (
        <Image
          src={job.Company.Image}
          width={30}
          height={30}
          alt="company image"
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-t from-indigo-500 to-white"></div>
      )}
      <p className="text-sm font-medium text-gray-700">
        {job.Company?.name || "Unknown Company"}
      </p>
    </div>
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        job.job_status === "open" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {job.job_status}
    </span>
  </div>

  {/* Job Details */}
  <div className="text-sm text-gray-600 space-y-1 mb-4">
    <p>💰 {job.salary || "N/A"}</p>
    <p>🌍 {job.location}</p>
  </div>

  {/* Button */}
  <Link
    href={`/jobs/${job.id}`}
    className="mt-auto block w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
  >
    Details
  </Link>
</div>

    )
}