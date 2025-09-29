import { prisma } from "../prisma/prismaClient.js"
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
        const jobId = req.params.jobId

        console.log(jobId);
        

        const {id} = req.user

        const result = await getJob(id,jobId)

        res.status(200).json({
            job:result.job,
            isApplied: result.isApplied
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const GetJobForDashboard = async (req,res,next) =>
{
    try {
        const {jobId} = req.params

        const job = await prisma.job.findUnique({
            where:{
                id: jobId,
            },
            select:{
                id:true,
                title:true,
                description:true,
                minimum_years_required: true,
                salary:true,
                skills:true,
                type:true,
                location:true,
                job_status:true,
                _count:{
                    select:{
                        applications:true
                    }
                },
                applications:{
                    select:{
                        id:true,
                        user:{
                            select:{
                                id:true,
                                first_name:true,
                                last_name:true,
                                email:true,
                                image:true,
                                title:true
                            }
                        },
                        cover_letter:true,
                        salary:true
                    }
                }
            }
        })

        res.status(200).json({
            job:job
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
        const {id} = req.user

        const result = await getCompanyJobs(id)

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

export const GetOpenJobs = async (req,res,next) =>
{
    try {
        const companyId = req.user.id
        const jobs = await prisma.job.findMany({
            where:{
                AND:[
                    {
                        companyId:companyId
                    },
                    {
                        job_status:"open"
                    }
                ]
            },
            select:{
                id:true,
                title:true,
                description:true,
                minimum_years_required: true,
                salary:true,
                skills:true,
                type:true,
                location:true,
                job_status:true,
                _count:{
                    select:{
                        applications:true
                    }
                }
            }
        })

        res.status(200).json({
            jobs: jobs
        })
    } 
    catch (error) {
        next(error)    
    }
}