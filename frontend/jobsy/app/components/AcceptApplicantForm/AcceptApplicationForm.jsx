"use client"
import { useState } from "react";
import AcceptButton from "../AcceptAppliacantButton/AcceptButton";
import { Mail, Sparkles } from "lucide-react";

export default function AcceptApplicationForm({applicationId, token})
{
    const [message, setMessage] = useState("")
    const [charCount, setCharCount] = useState(0)
    const maxChars = 500

    const handleMessageChange = (e) => {
        const text = e.target.value
        if (text.length <= maxChars) {
            setMessage(text)
            setCharCount(text.length)
        }
    }

    const suggestedMessages = [
        "Congratulations! We're excited to have you join our team. Looking forward to working with you!",
        "Welcome aboard! Your skills and experience are exactly what we're looking for. Let's create something amazing together!",
        "We're thrilled to offer you this position. Your application stood out, and we can't wait to get started!"
    ]

    const useSuggestion = (suggestion) => {
        setMessage(suggestion)
        setCharCount(suggestion.length)
    }

    return (
        <div className="w-full space-y-6">
            {/* Message Textarea */}
            <div>
                <label className="block mb-3 font-semibold text-gray-700 text-base flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-600" />
                    Welcome Message
                </label>
                <div className="relative">
                    <textarea 
                        value={message}
                        onChange={handleMessageChange}
                        className="w-full border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none p-4 rounded-2xl resize-none transition-all duration-300 bg-gray-50 focus:bg-white text-base min-h-[180px]" 
                        placeholder="Write a personalized welcome message to the candidate..."
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400 font-medium">
                        {charCount} / {maxChars}
                    </div>
                </div>
            </div>

            {/* Suggested Messages */}
            <div>
                <label className="block mb-3 font-semibold text-gray-700 text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    Quick Templates
                </label>
                <div className="space-y-2">
                    {suggestedMessages.map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => useSuggestion(suggestion)}
                            type="button"
                            className="w-full text-left bg-gradient-to-r from-gray-50 to-gray-100 hover:from-emerald-50 hover:to-teal-50 border border-gray-200 hover:border-emerald-300 p-4 rounded-xl transition-all duration-300 text-sm text-gray-700 hover:text-gray-900 group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse"></div>
                                <p className="leading-relaxed">{suggestion}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
                <AcceptButton id={applicationId} token={token} message={message}/>
            </div>
        </div>
    )
}