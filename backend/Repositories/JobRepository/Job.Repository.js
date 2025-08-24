import { prisma } from "../../prisma/prismaClient.js"

export const CreateJob = async (id,data) =>
{
    try {
        if(data.minimum_years_required < 0)
        {
            const error = new Error("minimum years cannot be less than zero")
            error.status = 400
            throw error
        }

        if(data.salary <= 0)
        {
            const error = new Error("salary cannot be equal to zero or less")
            error.status = 400
            throw error
        }
        const {skills} = data
        const NewJob = await prisma.job.create({
            data:{
                title:data.title,
                description:data.description,
                minimum_years_required:data.minimum_years_required || null,
                salary:data.salary || null,
                job_status:"pending",
                Company:{
                    connect:{
                        id:id
                    }
                },
                skills:{
                    connect:skills.map((id) =>({id}))
                },
                Category:{
                    connect:{
                        id:data.categoryId
                    }
                }
            },
            include:{
                skills:true
            }
        })

        return {
            status:201,
            message: "job created successfully",
            NewJob
        }
    } 
    catch (error) {
        throw error
    }
}

export const GetJobsByCategory = async (categoryId) =>
{
    try {
        const jobs = await prisma.job.findMany({
            where:{
                categoryId
            },
            select:{
                id:true,
                title:true,
                description:true,
                minimum_years_required: true,
                salary:true,
                skills:true,
                Company:{
                    select:{
                        image:true,
                        name:true,
                    }
                }
            }
        })

        return jobs
    } 
    catch (error) {
        throw error
    }
}

export const GetJob = async (id) =>
{
    try {
        const job = await prisma.job.findUnique({
            where:{
                id
            },
            select:{
                id:true,
                title:true,
                description:true,
                minimum_years_required: true,
                salary:true,
                skills:true,
                Company:{
                    select:{
                        image:true,
                        name:true,
                    }
                }
            }
        })     

        return job
    } catch (error) {
        throw error
    }
}

export const DeleteJob = async (id) =>
{
    try {
        const deletedJob = await prisma.job.delete({
            where:{
                id
            }
        })

        return {
            status: 200,
            message: "job deleted successfully",
            deletedJob
        }
    } 
    catch (error) {
        throw error    
    }
}

export const DeleteAllJobs = async (companyId) =>
{
    try {
        const deletedJobs = await prisma.job.deleteMany({
        where:{
            companyId
        }
    })

    return deletedJobs        
    } 
    catch (error) {
        throw error    
    }
}

export const GetCompanyJobs = async (companyId) =>
{
    try {
        const jobs = await prisma.job.findMany({
            where:{
                companyId
            },
            select:{
                id:true,
                title:true,
                description:true,
                minimum_years_required: true,
                salary:true,
                skills:true,
            }
        })    

        return jobs
    } 
    catch (error) {
        throw error
    }
}

export const SearchJobs = async (title, minSalary, maxSalary,minYearsRequired, maxYearsRequired) =>
{
    try {
        const jobs = await prisma.job.findMany({
            where: {
                ...(title && { title: { contains: title, mode: "insensitive" } }),
                ...(minSalary || maxSalary ? { 
                    salary: {
                    ...(minSalary && { gte: minSalary }),
                    ...(maxSalary && { lte: maxSalary })
                    }
                } : {}),
                ...(minYearsRequired || maxYearsRequired ? {
                    minimum_years_required: {
                    ...(minYearsRequired && { gte: minYearsRequired }),
                    ...(maxYearsRequired && { lte: maxYearsRequired })
                    }
                } : {})
                }
        })

        return jobs
    } 
    catch (error) {
        throw error    
    }
}

export const GetSkillsJobs = async (skillIds) =>
{
    try {
        const jobs = await prisma.job.findMany({
            where:{
                skills:{
                    some:{
                        id:{
                            in:skillIds
                        }
                    }
                }
            }
        })
        
        return jobs
    } 
    catch (error) {
        throw error    
    }
}