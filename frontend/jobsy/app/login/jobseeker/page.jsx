import JobSeekerLoginForm from "@/app/components/jobSeekerLoginForm/JobSeekerLoginForm";

export default function Login()
{
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-500">Login to Your Account</h1>
                    <p className="text-gray-600 mt-2">Enter your credintials to access your jobsy account</p>
                </div>
                <JobSeekerLoginForm />
            </div>
        </div>
    )
}