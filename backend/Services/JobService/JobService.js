import { CreateJob } from "../../Repositories/JobRepository/Job.Repository.js"
import { validateJobName } from "../../Utils/Validations/nameValidation.js"
import { validateDescription } from "../../Utils/Validations/jobDescriptionValidation.js"
export const createJob = async (id,data) =>
{
    try {
        validateJobName(data.title)
        validateDescription(data.description)
        const result = await CreateJob(id,data)

        return result
    } 
    catch (error) {
        console.log("error❌",error.message)    
        throw error
    }
}