import Link from "next/link";

export default function JobSeekerRegisterForm(){
    return (
        <div className="bg-white shadow-md rounded-2xl p-8">
            <form className="space-y-6">
                {/* first name + last name */}
                <div className="flex flex-col md:flex-row border border-gray-300 rounded-lg overflow-hidden">
                    <input type="text" placeholder="first name..." className="flex-1 px-4 py-3 focus:outline-none border-b md:border-b-0 md:border-r border-gray-300"/>
                    <input type="text" placeholder="last name..." className="flex-1 px-4 py-3 focus:outline-none" />
                </div>
                {/* email */}
                <div>
                    <input type="email" placeholder="email..." className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none" />
                </div>
                {/* password */}
                <div>
                    <input type="password" placeholder="password..." className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none" />
                </div>
                {/* submit button */}
                <button type="submit" className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-all duration-500 cursor-pointer">
                    Create Account
                </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?
                <Link href={"/login"} className="text-indigo-500 font-medium hover:underline ml-1">
                    login
                </Link>
            </p>
        </div>
    )
}