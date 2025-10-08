"use client"
import { useState } from "react";
import AcceptButton from "../AcceptAppliacantButton/AcceptButton";

export default function AcceptApplicationForm({applicationId,token})
{
    const [message,setMessage] = useState("")
    return (
        <div className="w-1/2">
            <textarea onChange={(e) => setMessage(e.target.value)} className="border border-gray-100 w-1/2 p-4 rounded-2xl" placeholder="write start message..."/>
            <AcceptButton id={applicationId} token={token} message={message}/>
        </div>
    )
}