"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function JobSeekerRegisterForm(){
    const [first_name,setFirstName] = useState("")
    const [last_name,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [emailError,setEmailError] = useState(false)
    const [passwordError,setPasswordError] = useState(false)
    const [loading,setLoading] = useState(false)

    const router = useRouter()

    const handleFirstNameChange = (e) =>
    {
        setFirstName(e.target.value)
    }

    const handleLastNameChange = (e) =>
    {
        setLastName(e.target.value)
    }

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

            if(first_name.trim().length === 0)
            {
                setErrorMessage("name cannot be empty")
                return 
            }

            if(last_name.trim().length === 0)
            {
                setErrorMessage("name cannot be empty")
                return 
            }

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

            setErrorMessage("")
            setLoading(true)

            const response = await fetch("http://localhost:4000/api/users/signUp",
                {
                    body:JSON.stringify({
                        first_name,
                        last_name,
                        email,
                        password
                    }),
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    credentials:"include"
                }
            )

            const data = await response.json()

            if(!response.ok)
            {
                setErrorMessage(data.message)
                setLoading(false)
                return
            }

            setLoading(false)
            setEmailError(false)
            setPasswordError(false)

            localStorage.setItem("userName",first_name)

            window.location.replace("/onboarding/step1")
        } 
        catch (error) {
            setErrorMessage("something wrong happened, please try again later")
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div className="bg-white shadow-md rounded-2xl p-8">
            
            <div className="text-red-500 text-center font-semibold text-lg mb-5">
                <h1>{errorMessage}</h1>
            </div>

            <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                {/* first name + last name */}
                <div className="flex flex-col md:flex-row border border-gray-300 rounded-lg overflow-hidden">
                    <input type="text" onChange={(e) => handleFirstNameChange(e)} placeholder="first name..." className="flex-1 px-4 py-3 focus:outline-none border-b md:border-b-0 md:border-r border-gray-300"/>
                    <input type="text" onChange={(e) => handleLastNameChange(e)} placeholder="last name..." className="flex-1 px-4 py-3 focus:outline-none" />
                </div>
                {/* email */}
                <div>
                    <input type="email" onChange={(e) => handleEmailChange(e)} placeholder="email..." className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all duration-500 ${emailError ? "border-red-500" : "border-gray-300"}`} />
                </div>
                {/* password */}
                <div>
                    <input type="password" onChange={(e) => handlePasswordChange(e)} placeholder="password..." className={`w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all duration-500 ${passwordError ? "border-red-500" : "border-gray-300"}`} />
                </div>
                {/* submit button */}
                <button type="submit" disabled={loading} className="disabled:bg-indigo-400 w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-all duration-500 cursor-pointer">
                    {
                        loading ? "wait a minute..." : "Create Account"
                    }
                </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?
                <Link href={"/login/jobseeker"} className="text-indigo-500 font-medium hover:underline ml-1">
                    login
                </Link>
            </p>
        </div>
    )
}