import dotenv from "dotenv"
import {GoogleGenerativeAI} from "@google/generative-ai"
import { prisma } from "../prisma/prismaClient"
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
          role: "system",
          parts: [
            {
              text: `You are Genius, an intelligent assistant that creates professional resumes in plain text format.
                Your goal is to generate a clear, well-structured, and human-sounding resume based on the user's profile information and any extra instructions they provide.
                Avoid complex formatting, bullet points, or Markdown — keep it simple, readable, and ATS-friendly.`,
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: `User profile data:
                ${JSON.stringify(userData, null, 2)}

                User's additional instructions:
                ${userPrompt}

                Now, generate a complete and natural-sounding resume for this user.`,
            },
          ],
        },
      ],
    });

    const response = await result.response

    const resume = response.text()

    return resume
    }
    catch (error) {
        throw error    
    }
}