import { createJob } from "../Services/JobService/JobService.js"

export const CreateJob = async (req,res,next) =>
{
    try {
        const result = await createJob(req.user.id,req.body)

        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}