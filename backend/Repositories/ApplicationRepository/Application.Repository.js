import { prisma } from "../../prisma/prismaClient.js"

export const CreateApplication = async (id,jobId,data) =>
{
    try {
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })

        if(!user)
        {
            const error = new Error("user not found")
            error.status = 401
            throw error
        }

        const job = await prisma.job.findUnique({
            where:{
                id:jobId
            }
        })

        if(!job)
        {
            const error = new Error("job not found")
            error.status = 404
            throw error
        }

        if(job.job_status === "closed")
        {
            const error = new Error("this job is closed because someone is already hired")
            error.status = 400
            throw error
        }

        const newApplication = await prisma.application.create({
            data:{
                cover_letter:data.cover_letter,
                salary:data.salaryNumber || null,
                status: "pending",
                user:{
                    connect:{
                        id
                    }
                },
                job:{
                    connect:{
                        id:jobId
                    }
                }
            }
        })
        
        return {
            status: 201,
            message: "application created successfully",
            newApplication
        }
    } 
    catch (error) {
        throw error        
    }
}

export const GetApplicationsByJob = async (jobId) =>
{
    try {
        const applications = await prisma.application.findMany({
            where:{
                jobId
            },
            select:{
                id:true,
                cover_letter:true,
                salary:true,
                user:{
                    select:{
                        id:true,
                        first_name:true,
                        last_name:true,
                        title:true,
                        email:true,
                        years_of_experience:true,
                        image:true,
                        bio:true,
                        created_at:true,
                        skills:{
                            select:{
                                id:true,
                                name:true
                            }
                        }
                    }
                }
            }
        })

        return applications
    } 
    catch (error) {
        throw error    
    }
}

export const GetUserApplications = async (id) =>
{
    try {
        const applications = await prisma.application.findMany({
            where:{
                userId:id,
            },
            select:{
                id:true,
                salary:true,
                cover_letter:true,
                status:true,
                job:{
                    select:{
                        id:true,
                        title:true,
                        description:true,
                        salary:true,
                        location:true,
                        Company:{
                            select:{
                                id:true,
                                name:true,
                                image:true
                            }
                        }
                    }
                }
            }
        })

        return applications
    } 
    catch (error) {
        throw error
    }
}

export const GetApplication = async (id) =>
{
    try {
        const application = await prisma.application.findUnique({
            where:{
                id
            },
            select:{
                id:true,
                cover_letter:true,
                salary:true,
                user:{
                    select:{
                        id:true,
                        first_name:true,
                        last_name:true,
                        image:true,
                        title:true,
                    }
                }
            }
        }) 

        if(!application)
        {
            const error = new Error("no application found")
            error.status = 404
            throw error
        }

        return application
    } 
    catch (error) {
        throw error
    }
}

export const ToggleApplicationSeen = async (id) =>
{
    try {
        const application = await prisma.application.findUnique({
            where:{
                id
            }
        })

        if(!application)
        {
            const error = new Error("application not found")
            error.status = 404
            throw error
        }

        if(application.status === "seen")
            return application

        const updatedApplication = await prisma.application.update({
            where:{
                id,
            },
            data:{
                status:"seen"
            }
        })

        return updatedApplication
    } 
    catch (error) {
        throw error    
    }
}

export const AcceptApplication = async (id) =>
{
    try {
        const application = await prisma.application.findUnique({
            where:{
                id
            }
        })

        if(!application)
        {
            const error = new Error("application not found")
            error.status = 404
            throw error
        }

        const job = await prisma.job.findUnique({
            where:{
                id:application.jobId
            }
        })

        if(!job)
        {
            const error = new Error("job not found")
            error.status = 404
            throw error
        }

        if(application.status === "accepted")
            return {
                status: 400,
                message: "already accepted",
                application,
                job
            }

        const updatedApplication = await prisma.application.update({
            where:{
                id,
            },
            data:{
                status:"accepted"
            }
        })

        const updatedJob = await prisma.application.update({
            where:{
                id:jobId
            },
            data:{
                status:"hired"
            }
        })

        return {
            status: 200,
            message: "accepted successfully",
            updatedApplication,
            updatedJob
        }
    } 
    catch (error) {
        throw error    
    }
}

export const RejectApplication = async (id) =>
{
    try {
        const application = await prisma.application.findUnique({
            where:{
                id
            }
        })

        if(!application)
        {
            const error = new Error("application not found")
            error.status = 404
            throw error
        }

        if(application.status === "rejected")
            return application

        const updatedApplication = await prisma.application.update({
            where:{
                id,
            },
            data:{
                status:"rejected"
            }
        })

        return updatedApplication
    } 
    catch (error) {
        throw error    
    }
}