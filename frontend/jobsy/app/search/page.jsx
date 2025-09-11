import MainSearch from "../components/SearchForm/MainSearch";
import JobCard from "../components/JobCard/JobCard";
import { Suspense } from "react";
export default async function SearchPage({ searchParams }) {
  const params = new URLSearchParams(await searchParams);

  const response = await fetch(
    `http://localhost:4000/api/jobs/search?${params.toString()}`,
    { cache: "no-store" }
  );

  const { jobs } = await response.json();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-24 px-4">
      {/* Search Bar */}
      <div className="w-full max-w-4xl mb-8">
        <MainSearch />
      </div>

      {/* Results */}
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-indigo-500 font-bold">Loading</h1>
        </div>
      }>
        <div className="w-full max-w-6xl">
        {jobs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
                <JobCard key={job.id} job={job}/>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            no jobs found🔍
          </p>
        )}
      </div>
      </Suspense>
    </div>
  );
}
