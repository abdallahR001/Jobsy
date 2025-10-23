import { generateResume } from "../Utils/gemini.js"

export const GenerateResume = async (req,res,next) =>
{
    try {
        const {id} = req.user

        const {userPrompt} = req.body

        const result = await generateResume(userPrompt,id)

        res.status(200).json({
            result:result
        })
    } 
    catch (error) {
        next(error)
    }
}