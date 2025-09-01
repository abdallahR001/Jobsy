import Image from "next/image";
import Link from "next/link";
export default function Join(){
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                {/* Job Seeker Card */}
                <Link href={"/register/jobseeker"} className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center border-2 border-transparent hover:border-indigo-500 transition-all duration-500">
                    <Image src={"/file.svg"} width={50} height={50} alt="jobseeker image" className="mb-6"/>
                    <h1 className="text-xl font-semibold text-indigo-500">I'm looking for a job</h1>
                    <p className="text-gray-600 text-sm">Find the best jobs that match your skills and career goals</p>
                </Link>
                {/* Company Card */}
                <Link href={"/register/employer"} className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center border-2 border-transparent hover:border-indigo-500 transition-all duration-500">
                    <Image src={"/file.svg"} width={50} height={50} alt="jobseeker image" className="mb-6"/>
                    <h1 className="text-xl font-semibold text-indigo-500">I want to hire</h1>
                    <p className="text-gray-600 text-sm">Post jobs and find the best candidates for your company</p>
                </Link>
            </div>
        </div>
    )
}