"use client"

import { Briefcase, Building2, Eye, Globe, Heart, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function FollowedCompanies({companies})
{

  const getProfileImage = (company) => {
    if (!company?.image) return "/default-avatar.png" // صورة افتراضية لو مفيش صورة
    return company.image.startsWith("http")
      ? company.image // من جوجل أو أي لينك خارجي
      : `http://localhost:4000/${company.image}` // متخزنة في السيرفر بتاعك
  }
    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Followed Companies
              </h1>
              <p className="text-gray-600 mt-1">
                Stay updated with your favorite companies
              </p>
            </div>
          </div>
          
          {companies.length > 0 && (
            <div className="flex items-center gap-2 mt-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {companies.length} {companies.length === 1 ? 'Company' : 'Companies'}
              </span>

            </div>
          )}
        </div>

        {/* Companies Grid */}
        {companies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
              <Building2 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Companies Yet
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              You haven't followed any companies yet. Start following companies to stay updated with their latest job openings!
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium">
              Explore Companies
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company, index) => (
              <div
                key={company.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200"
                style={{
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Card Header with gradient */}
                <div className="h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  {/* Decorative pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
                  </div>
                </div>

                <div className="p-6 -mt-12 relative">
                  {/* Company Logo */}
                  <div className="mb-4 relative inline-block">
                    {company.image ? (
                      <Image
                        src={`${getProfileImage(company)}`}
                        alt={company.name}
                        width={150}
                        height={150}
                        className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 border-4 border-white shadow-lg flex items-center justify-center">
                        <Building2 className="text-indigo-600 w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  {/* Company Info */}
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {company.name}
                    </h2>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {company.field && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">
                          <Globe className="w-3 h-3" />
                          {company.field}
                        </span>
                      )}
                      {company.location && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium">
                          <MapPin className="w-3 h-3" />
                          {company.location}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {company.description || "No description available."}
                    </p>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Employees</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {company.employees_count || 0}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                        <Briefcase
                         className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Open Jobs</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {company._count?.jobs || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href={`/company/${company.id}`} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 group-hover:scale-[1.02]">
                    <span>View Company</span>
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
    )
}