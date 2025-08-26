import { AcceptApplication, CreateApplication, GetApplication, GetApplicationsByJob, GetUserApplications, RejectApplication, ToggleApplicationSeen } from "../../Repositories/ApplicationRepository/Application.Repository.js"

export const createApplication = async (id,jobId,data) =>
{
    try {
        const {cover_letter, salary} = data

        if(!cover_letter || cover_letter.trim().length < 30)
        {
            const error = new Error("cover letter should be at least 30 characters long")
            error.status = 400
            throw error
        }

        if(salary <= 0 )
        {
            const error = new Error("salary cannot be 0")
            error.status = 400
            throw error
        }

        const result = await CreateApplication(id,jobId,data)

        return result
    } 
    catch (error) {
        console.log("error❌", error)    
    }
}

export const getApplicationsByJob = async (jobId) =>
{
    try {
        const result = await GetApplicationsByJob(jobId)

        return result
    } 
    catch (error) {
        console.log("error❌", error)    
    }
}

export const getUserApplications = async (id) =>
{
    try {
        const result = await GetUserApplications(id)

        return result
    } 
    catch (error) {
        console.log("error❌", error)    
    }
}

export const getApplication = async (id) =>
{
    try {
        const result = await GetApplication(id)

        return result
    } 
    catch (error) {
        console.log("error❌", error)    
    }
}

export const toggleApplicationSeen = async (id) =>
{
    try {
        const result = await ToggleApplicationSeen(id)

        return result
    } 
    catch (error) {
        console.log("error❌", error)    
    }
}

export const acceptApplication = async (id) =>
{
    try {
        const result = await AcceptApplication(id)

        return result
    } 
    catch (error) {
        console.log("error❌", error)    
    }
}

export const rejectApplication = async (id) =>
{
    try {
        const result = await RejectApplication(id)

        return result
    } 
    catch (error) {
        console.log("error❌", error)    
    }
}