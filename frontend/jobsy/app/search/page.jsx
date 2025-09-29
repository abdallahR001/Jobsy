import MainSearch from "../components/SearchForm/MainSearch";
import JobCard from "../components/JobCard/JobCard";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { JobCardGridSkeleton } from "../components/JobCardGridSkeleton/JobCardGridSkeleton";
export default async function SearchPage({ searchParams }) {
  const params = new URLSearchParams(await searchParams);

  console.log(params);
  

  const cookieStore = cookies()

  const token = (await cookieStore).get("token")?.value
  console.log(token)

  const response = await fetch(
    `http://localhost:4000/api/jobs/search?${params.toString()}`,
    { 
      cache: "no-store",
      headers:{
        token: token
      }
     }
  );

  const data = await response.json();

  console.log(data);
  

  return (
    <div className="min-h-screen bg-gray-50 max-w-full flex flex-col items-center pt-24 px-4">
      {/* Search Bar */}
      <div className="w-full max-w-4xl mb-8">
        <MainSearch />
      </div>

      {/* Results */}
      <Suspense fallback={
        <JobCardGridSkeleton/>
      }>
        <div className="w-full max-w-6xl">
        {data.jobs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.jobs.map((job) => (
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
