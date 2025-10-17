"use client"
import Link from "next/link";
import { useState } from "react";
import JobSeekerLoginFormSkeleton from "../JobSeekerLoginSkeleton/JobSeekerLoginSkeleton";
export default function JobSeekerLoginForm(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [emailError,setEmailError] = useState(false)
    const [passwordError,setPasswordError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [result,setResult] = useState(null)

    const handleEmailChange = (e) =>
{
    setEmail(e.target.value)
}

const handlePasswordChange = (e) =>
{
    setPassword(e.target.value)
}

const handleSubmit = async (e) =>
{
    e.preventDefault()
    try {
    setEmailError(false)
    setPasswordError(false)
    if(email.trim().length === 0)
    {
        setEmailError(true)
        setErrorMessage("email cannot be empty")
        return
    }

    if(password.trim().length === 0)
    {
        setPasswordError(true)
        setErrorMessage("password cannot be empty")
        return 
    }

    setResult(null)
    setErrorMessage("")
    setLoading(true)

    const response = await fetch("http://localhost:4000/api/users/signin",{
        body: JSON.stringify({
            email,
            password
        }),
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        credentials:"include"
    })

    const data = await response.json()

    if(!response.ok)
    {
        console.log(data)
        setErrorMessage(data.message)
        setLoading(false)
        return
    }


    setResult(data)

    localStorage.setItem("token",data.token)

    setLoading(false)
    setEmailError(false)
    setPasswordError(false)

    window.location.replace("/home")
    } 
    catch (error) {
        setErrorMessage("something went wrong, please try again later")
        console.log(error)
        setLoading(false)
    }
    }
    return(
        <div className="bg-white shadow-md rounded-2xl p-8">
                    <div className="text-red-500 text-center font-semibold text-lg mb-5">
                        <h1>{errorMessage}</h1>
                    </div>

                    <div className="text-green-500 text-center font-semibold text-lg mb-5">
                        <h1>{result && result.message}</h1>
                    </div>
                    
                    <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                        <input type="email" placeholder="email..." className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all duration-500 ${emailError ? "border-red-500" : "border-gray-300"}`} onChange={(e) => handleEmailChange(e)}/>
                        <input type="password" placeholder="password..." className={`w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all duration-500 ${passwordError ? "border-red-500" : "border-gray-300"}`} onChange={(e) => handlePasswordChange(e)}/>
                        <button disabled={loading} type="submit" className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-all duration-500 cursor-pointer disabled:bg-indigo-400">
                            {
                                loading ? "Wait a minute..." : "Login"
                            }
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                window.location.href = "http://localhost:4000/api/users/google";
                            }}
                            className="w-full flex items-center justify-center gap-2 bg-white-500 text-gray-800 py-3 rounded-lg font-semibold border border-transparent cursor-pointer hover:border-gray-800 transition-all duration-500 mt-4"
                            >
                            <img
                                src="https://www.svgrepo.com/show/355037/google.svg"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            Login with Google
                        </button>

                    </form>
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Are you an employer?
                        <Link href={"/login/employer"} className="text-indigo-500 font-medium hover:underline ml-1">
                            Login here
                        </Link>
                    </p>
                </div> 
    )
}