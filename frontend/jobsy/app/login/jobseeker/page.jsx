import Link from "next/link";
export default function Login()
{
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-500">Login to Your Account</h1>
                    <p className="text-gray-600 mt-2">Enter your credintials to access your jobsy account</p>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-8">
                    <form className="space-y-6">
                        <input type="email" placeholder="email..." className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all duration-500" />
                        <input type="password" placeholder="password..." className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all duration-500" />
                        <button type="submit" className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-all duration-500 cursor-pointer">
                            Login
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Are you an employer?
                        <Link href={"/login/employer"} className="text-indigo-500 font-medium hover:underline ml-1">
                            Login here
                        </Link>
                    </p>
                </div> 
            </div>
        </div>
    )
}