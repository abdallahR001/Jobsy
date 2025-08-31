import Link from "next/link"
export default function EmployerRegisterForm(){
    return(
        <div className="bg-white shadow-md rounded-2xl p-8">
            <form className="space-y-6">
                <input type="text" placeholder="Your company name..." className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 transition-all duration-500"/>
                <input type="email" placeholder="Email..." className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 transition-all duration-500"/>
                <input type="password" placeholder="Password..." className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 transition-all duration-500"/>
                <button type="submit" className="w-full cursor-pointer bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-all duration-500">Create Account</button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?
                <Link href={"/login/employer"} className="text-indigo-500 font-medium hover:underline ml-1">
                    login
                </Link>
            </p>
        </div>
    )
}