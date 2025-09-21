import { createJob, deleteAllJobs, deleteJob, getCompanyJobs, getJob, getJobsByCategory, getSkillsJobs, searchJobs } from "../Services/JobService/JobService.js"

export const CreateJob = async (req,res,next) =>
{
    try {
        const companyId = req.user.id

        const result = await createJob(companyId,req.body)

        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const SearchJobs = async (req,res,next) =>
{
    try {
        const id = req.user?.id
        const {title,location,type} = req.query
        const result = await searchJobs(id,title,type,location)
        
        res.status(200).json({
            jobs:result
        })
    } 
    catch (error) {
        next(error)
    }
}

export const GetJobsByCategory = async (req,res,next) =>
{
    try {
        const {categoryId} = req.params

        const result = await getJobsByCategory(categoryId)

        res.status(200).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const GetJob = async (req,res,next) =>
{
    try {
        const {jobId} = req.params

        const result = await getJob(jobId)

        res.status(200).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const DeleteJob = async (req,res,next) =>
{
    try {
        const {jobId} = req.params

        const result = await deleteJob(jobId)

        res.status(200).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const DeleteAllJobs = async (req,res,next) =>
{
    try {
        const companyId = req.user.id

        const result = await deleteAllJobs(companyId)

        res.status(200).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const GetCompanyJobs = async (req,res,next) =>
{
    try {
        const {companyId} = req.user

        const result = await getCompanyJobs(companyId)

        res.status(200).json({
            jobs: result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const GetSkillsJobs = async (req,res,next) =>
{
    try {
        const {skillsId} = req.body

        const result = await getSkillsJobs(skillsId)

        res.status(200).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}