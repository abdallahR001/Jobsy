import { prisma } from "../../prisma/prismaClient.js"

export const CreateJob = async (companyId,data) =>
{
    try {
        if(data.minimum_years_required && data.minimum_years_required < 0)
        {
            const error = new Error("minimum years cannot be less than zero")
            error.status = 400
            throw error
        }

        if(data.salary && data.salary <= 0)
        {
            const error = new Error("salary cannot be equal to zero or less")
            error.status = 400
            throw error
        }
        const {skills,category} = data

        const cat = await prisma.category.findUnique({
            where:{
                name:category
            },
            select:{
                id:true
            }
        })

        if(!cat)
        {
            const error = new Error("category not found")
            error.status = 404
            throw error
        }

        let NewJob = await prisma.job.create({
            data:{
                title:data.title,
                description:data.description,
                minimum_years_required:data.experience || null,
                salary:data.salary || null,
                job_status:"open",
                type:data.type,
                location: data.city || "remote",
                Company:{
                    connect:{
                        id:companyId
                    }
                },
                Category:{
                    connect:{
                        id:cat.id
                    }
                }
            },
        })

        if(skills)
        {
            await prisma.job.update({
                where:{
                    id:NewJob.id
                },
                data:{
                    skills:{
                    connect:skills.map((id) =>({id}))
                },
                }
            })
        }

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
                type:true,
                location:true,
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

export const GetJob = async (userId,id) =>
{
    try {
        console.log(id);
        
        const job = await prisma.job.findUnique({
            where:{
                id:id
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
                Company:{
                    select:{
                        id:true,
                        image:true,
                        name:true,
                    }
                },
                
            }
        })

        let isApplied;

        const alreadyApplied = await prisma.job.findFirst({
            where:{
                id:job.id,
                applications:{
                    some:{
                        user:{
                            id:userId
                        }
                    }
                }
            }
        })

        if(!alreadyApplied)
        {
            isApplied = false
        }
        else if(alreadyApplied)
        {
            isApplied = true
        }

        return {
            job,
            isApplied
        }
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
        const company = await prisma.company.findUnique({
            where:{
                id:companyId
            }
        })

        if(!company)
        {
            const error = new Error("company not found")
            error.status = 404
            throw error
        }

        const deletedJobs = await prisma.job.deleteMany({
        where:{
            companyId
        }
    })

    return {
        status: 200,
        message: "deleted all jobs successfully",
        deletedJobs
    }       
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
                companyId: companyId
            },
            orderBy:{
                created_at:"desc"
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
                companyId:true,
                _count:{
                    select:{
                        applications:true
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

export const SearchJobs = async (userId = null,title,type = null,location = null) =>
{
    try {
        const jobs = await prisma.job.findMany({
            where:{
                title:{
                    contains:title,
                    mode:"insensitive"
                },
                ...(type && {type}),
                ...(location &&{
                    location:{
                        contains:location,
                        mode:"insensitive"
                    }
                })
            },
            select:{
                id:true,
                title:true,
                description:true,
                location:true,
                salary:true,
                job_status:true,
                type:true,
                Company:{
                    select:{
                        id:true,
                        name:true,
                        image:true,
                        followers:{
                            where:{
                                ...(userId && {id:userId})
                            },
                            select:{
                                id:true
                            }
                        }
                    }
                },
                savedBy: {
                    where:{
                        ...(userId && {id:userId})
                    },
                    select:{
                        id:true
                    }
                }
            }
        })

        const result = jobs.map((job) =>({
            ...job,
            isCompanyFollowed: userId ? job.Company.followers.length > 0 : false ,
            isSaved: userId ? job.savedBy.length > 0 : false
        }))

        return result
    } 
    catch (error) {
        throw error    
    }
}

export const GetSkillsJobs = async (skillsIds) =>
{
    try {
        const jobs = await prisma.job.findMany({
            where:{
                skills:{
                    some:{
                        id:{
                            in:skillsIds
                        }
                    }
                }
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
