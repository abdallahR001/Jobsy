import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Building2, Eye } from "lucide-react";

export default async function FollowedCompanies() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) redirect("/login/jobseeker");

  const response = await fetch(
    "http://localhost:4000/api/users/followed-companies",
    {
      headers: {
        token: token,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (response.status === 401 || response.status === 403)
    redirect("/login/jobseeker");

  const companies = data.followedCompanies || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Followed Companies
      </h1>

      {companies.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          You haven’t followed any companies yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
            >
              {/* Company Header */}
              <div className="flex items-center gap-4 mb-4">
                {company.image ? (
                  <Image
                    src={`http://localhost:4000/${company.image}`}
                    alt={company.name}
                    width={60}
                    height={60}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Building2 className="text-indigo-500 w-6 h-6" />
                  </div>
                )}

                <div>
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {company.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {company.employees_count || 0} Employees
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {company.description || "No description available."}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xs text-gray-400">
                  Jobs: {company._count?.jobs || 0}
                </span>
                <Link
                  href={`/company/${company.id}`}
                  className="px-4 flex items-center gap-1 text-sm py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
                >
                  View <Eye/>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
