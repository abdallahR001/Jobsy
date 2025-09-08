"use client"
import Link from "next/link"
import { useState } from "react"
export default function EmployerRegisterForm(){
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [loading,setLoading] = useState(false)
    const [emailError,setEmailError] = useState(false)
    const [nameError,setNameError] = useState(false)
    const [passwordError,setPasswordError] = useState(false)

    const handleNameChange = (e) =>
    {
        setName(e.target.value)
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
            setLoading(true)
            setNameError(false)
            setEmailError(false)
            setPasswordError(false)
            const response = await fetch("http://localhost:4000/api/companies",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            credentials: "include",
            body:JSON.stringify({
                name,
                email,
                password
            })
        })   

        const data = await response.json()

        if(!response.ok)
        {
            setErrorMessage(data.message)
            setLoading(false)
            return
        }

        

        console.log(data)

        localStorage.setItem("companyName",name)
        
        window.location.replace("/onboarding/employers/step1")
        setLoading(false)
        } 
        catch (error) {
            setErrorMessage("something went wrong, please try again")
            console.log(error)
            setLoading(false)
        }
    }
    return(
        <div className="bg-white shadow-md rounded-2xl p-8">
           <div className="text-red-500 text-center font-semibold text-lg mb-5">
                {   
                    errorMessage &&
                    <h1>{errorMessage}</h1>
                }
            </div>
            <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" value={name} onChange={(e) => handleNameChange(e)} placeholder="Your company name..." className={`w-full border ${nameError ? "border-red-500" : "border-gray-300"} border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 transition-all duration-500`}/>
                <input type="email" value={email} onChange={(e) => handleEmailChange(e)} placeholder="Email..." className={`w-full border ${emailError ? "border-red-500" : "border-gray-300"} border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 transition-all duration-500`}/>
                <input type="password" value={password} onChange={(e) => handlePasswordChange(e)} placeholder="Password..." className={`w-full border ${passwordError ? "border-red-500" : "border-gray-300"} border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 transition-all duration-500`}/>
                <button type="submit" disabled={!name || !email || !password} className="w-full cursor-pointer disabled:bg-indigo-400 disabled:cursor-not-allowed bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-all duration-500">{loading ? "wait a moment..." : "Create Account"}</button>
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