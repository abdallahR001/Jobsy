import dotenv from "dotenv"
import {GoogleGenerativeAI} from "@google/generative-ai"
import { prisma } from "../prisma/prismaClient.js"
dotenv.config()

const genAi = new GoogleGenerativeAI(process.env.API_KEY)
const model = genAi.getGenerativeModel({
    model:"gemini-2.5-flash"
})

export const generateResume = async (userPrompt,userId) =>
{
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                first_name:true,
                last_name:true,
                bio:true,
                field:true,
                location:true,
                title:true,
                years_of_experience:true,
                email:true,
                skills:{
                    select:{
                        name:true,
                    }
                },
                PortfolioFiles:{
                    select:{
                        title:true,
                        description:true
                    }
                }
            }
        })

        if(!user)
        {
            const error = new Error("user not found")
            error.status = 404
            throw error
        }

        const skills = user.skills?.map((s) => s.name) || [];

        const portfolioItems = user.PortfolioFiles?.map(
            (p) => `${p.title}: ${p.description}`
        ) || [];

        const userData = {
            full_name: `${user.first_name} ${user.last_name}`,
            title: user.title,
            field: user.field,
            location: user.location,
            years_of_experience: user.years_of_experience,
            email: user.email,
            bio: user.bio,
            skills,
            portfolio: portfolioItems,
        };

        const result = await model.generateContent({
  contents: [
    {
      role: "user",
      parts: [
        {
          text: `You are "Genius", an AI resume writer that writes resumes **from the user's perspective** (first person, "I am...").
Write in a professional, confident tone suitable for job applications.
Do not refer to the user as "he" or "she" — always use "I".
Use clear sections like "Summary", "Experience", "Projects", "Skills", and "Education" if possible.
Write naturally — not robotic — and keep it plain text (no bullet points, no markdown).

User profile data:
${JSON.stringify(userData, null, 2)}

Extra user instructions:
${userPrompt}

Now write a complete resume using this data, making sure to include their projects and skills in context.`
        }
      ]
    }
  ]
});

    const response = await result.response

    const resume = response.text()

    return resume
    }
    catch (error) {
        throw error    
    }
}