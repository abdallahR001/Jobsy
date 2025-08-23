import { prisma } from "../../prisma/prismaClient"

export const createApplication = async (id,jobId,data) =>
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

        const newApplication = await prisma.application.create({
            data:{
                cover_letter:data.cover_letter,
                salary:data.salary,
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