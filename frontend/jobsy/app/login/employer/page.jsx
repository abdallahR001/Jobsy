"use client"
import Link from "next/link";
import { useState } from "react";
export default function Login()
{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [loading,setLoading] = useState(false)

    const handleSubmit = async (e) =>
    {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await fetch("http://localhost:4000/api/companies/login",{
                method:"POST",
                body: JSON.stringify(
                    {
                        email,
                        password
                    }
                ),
                headers:{
                    "content-type":"application/json"
                },
                credentials:"include"
            })

            const result = await response.json()

            if(!response.ok)
            {
                setErrorMessage(result.message)
                setLoading(false)
                return
            }

            setLoading(false)
            setEmail("")
            setPassword("")
            window.location.replace("/dashboard")
        } 
        catch (error) {
            setErrorMessage("something went wrong, please try again")
            setLoading(false)
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-500">Login to Your Employer Account</h1>
                    <p className="text-gray-600 mt-2">Enter your credintials to access your jobsy account</p>
                </div>
                <div className="text-red-500 text-center font-semibold text-lg mb-5">
                    {   
                        errorMessage &&
                        <h1>{errorMessage}</h1>
                    }
                </div>
                <div className="bg-white shadow-md rounded-2xl p-8">
                    <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email..." className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all duration-500" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password..." className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all duration-500" />
                        <button disabled={!email || !password} type="submit" className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-all duration-500 cursor-pointer disabled:bg-indigo-400">
                            {loading ? "Wait a moment..." : "Login"}
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Are you an job seeker?
                        <Link href={"/login/jobseeker"} className="text-indigo-500 font-medium hover:underline ml-1">
                            Login here
                        </Link>
                    </p>
                </div> 
            </div>
        </div>
    )
}