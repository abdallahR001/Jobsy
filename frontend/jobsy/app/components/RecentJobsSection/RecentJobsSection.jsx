import JobDashboardCard from "../JobCard/JobDashboardCard";

const jobsData = [
  {
    id: 1,
    title: "Frontend Developer",
    description:
      "We are looking for a talented frontend developer to join our growing team and help us build amazing user experiences.",
    location: "Cairo, Egypt",
    applicants: 23,
    status: "Open",
  },
  {
    id: 2,
    title: "Backend Engineer",
    description:
      "Seeking a backend engineer experienced in Node.js and databases to design scalable APIs for our platform.",
    location: "Alexandria, Egypt",
    applicants: 15,
    status: "Closed",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    description:
      "We want a creative designer to create elegant, user-friendly interfaces and design systems.",
    location: "Remote",
    applicants: 8,
    status: "Open",
  },
  {
    id: 4,
    title: "DevOps Specialist",
    description:
      "Join us as a DevOps specialist to improve deployment workflows and infrastructure scalability.",
    location: "Giza, Egypt",
    applicants: 12,
    status: "Open",
  },
  {
    id: 5,
    title: "Project Manager",
    description:
      "Looking for a project manager with strong leadership and agile methodology experience.",
    location: "Remote",
    applicants: 10,
    status: "Closed",
  },
];

export default function RecentJobsSection() {
  return (
    <div className="flex flex-col gap-6 mt-8 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Recent Jobs</h2>
        <button className="cursor-pointer duration-300 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition">
          Post a New Job
        </button>
      </div>

      {/* Jobs List */}
      <div className="flex flex-col gap-4 bg-white p-4 rounded-xl shadow-sm">
        {jobsData.map((job) => (
          <JobDashboardCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
