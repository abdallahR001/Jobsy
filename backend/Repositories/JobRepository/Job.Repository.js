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