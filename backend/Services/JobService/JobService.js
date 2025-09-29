import { CreateJob, DeleteAllJobs, DeleteJob, GetCompanyJobs, GetJob, GetJobsByCategory, GetSkillsJobs, SearchJobs } from "../../Repositories/JobRepository/Job.Repository.js"
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

export const getJobsByCategory = async (categoryId) =>
{
    try {
        const result = await GetJobsByCategory(categoryId)

        return result
    } 
    catch (error) {
        console.log("error❌",error.message)    
        
        throw error
    }
}

export const getJob = async (userId,jobId) =>
{
    try {
        const result = await GetJob(userId,jobId)

        return result
    } 
    catch (error) {
        console.log("error❌",error.message)    
        
        throw error
    }
}

export const deleteJob = async (jobId) =>
{
    try {
        const result = await DeleteJob(jobId)

        return result
    } 
    catch (error) {
        console.log("error❌",error.message)    
        
        throw error
    }
}

export const deleteAllJobs = async (companyId) =>
{
    try {
        const result = await DeleteAllJobs(companyId)

        return result
    } 
    catch (error) {
        console.log("error❌",error.message)    
        
        throw error
    }
}

export const getCompanyJobs = async (companyId) =>
{
    try {
        const result = await GetCompanyJobs(companyId)

        return result
    } 
    catch (error) {
        console.log("error❌",error)    
        
        throw error
    }
}

export const searchJobs = async (userId = null,title,type = null,location = null) =>
{
    try {
        if(!title || typeof title !== "string" || title.trim().length <= 0)
        {
            const error = new Error("title cannot be empty")
            error.status = 400
            throw error
        }

        const result = await SearchJobs(userId,title,type,location)

        return result
    } 
    catch (error) {
        console.log("error❌",error)    
        
        throw error
    }
}

export const getSkillsJobs = async (skillsIds) =>
{
    try {
        const result = await GetSkillsJobs(skillsIds)

        return result
    } 
    catch (error) {
        console.log("error❌",error.message)    
        
        throw error 
    }
}