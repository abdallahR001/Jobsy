import { prisma } from "../../prisma/prismaClient.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const SignUp = async (newUser)=>
{
    try {
        let user = await prisma.user.findUnique(
            {
                where:{
                    email:newUser.email
                }
            }
        )

        if(!user)
        {
            const hashedPassword = await bcrypt.hash(newUser.password,10)
            user = await prisma.user.create({
                data:{
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    email: newUser.email,
                    password:hashedPassword,
                    hasSeenOnboarding:false
                }
            })
            const token = jwt.sign({
            id: user.id,
            name: user.first_name,
            role: "user"
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            })

            return {
                status: 201,
                message: "account created successfully",
                token: token
            }
        }
        const error = new Error("user already exist")
        error.status = 400
        throw error
    } 

    catch (error) {
        throw error
    }
}

export const SignIn = async(credintials)=>
{
    try {
        let user = await prisma.user.findUnique(
        {
            where:{
                email:credintials.email
            }
        }
        )
        if(!user)
        {
            const error = new Error("invalid email or password")
            error.status = 400
            throw error
        }    

        const isPasswordCorrect = await bcrypt.compare(credintials.password,user.password)

        if(!isPasswordCorrect)
        {
            const error = new Error("invalid email or password")
            error.status = 400
            throw error
        }

        const token = jwt.sign(
            {
                id:user.id,
                name: user.first_name,
                role: "user"
            }
        ,process.env.JWT_SECRET,
        {
            expiresIn:"1h"
        })

        return {
            status: 200,
            message: "logged in successfully",
            token: token,
        }
    }
    catch (error) {
        throw error
    }
}

export const GetProfile = async(id)=>
{
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:id
            },
            select:{
                id:true,
                first_name:true,
                last_name:true,
                title:true,
                email:true,
                bio:true,
                image:true,
                years_of_experience:true,
                created_at:true,
                savedJobs:true,
                _count:{
                    select:{
                        applications:true,
                        followings:true,
                        savedJobs:true
                    }
                }
            }
        })

        if(!user)
        {
            const error = new Error("user not found")
            error.status = 404
            throw error
        }

        return {
            status: 200,
            user:user
        }
    } 
    catch (error) {
        throw error       
    }
}

export const UpdateProfile = async (id,data)=>
{
    try {
        const user = await prisma.user.findUnique({
        where:{
            id:id
        }
        })

        const dataToUpdate = {}
    
        if(!user)
        {
            const error = new Error("user not found")
            error.status = 404
            throw error
        }

        if(data.first_name)
            dataToUpdate.first_name = data.first_name

        if(data.last_name)
            dataToUpdate.last_name = data.last_name

        if(data.title)
            dataToUpdate.title = data.title

        if(data.location)
            dataToUpdate.location = data.location

        if(data.bio)
            dataToUpdate.bio = data.bio

        if(data.years_of_experience)
            dataToUpdate.years_of_experience = data.years_of_experience

        if(data.image)
            dataToUpdate.image = data.image

        if(!user.hasSeenOnboarding)
            dataToUpdate.hasSeenOnboarding = true

        const updatedUser = await prisma.user.update({
            where:{
                id:id
            },
            select:{
                id:true,
                first_name:true,
                last_name:true,
                title:true,
                email:true,
                bio:true,
                image:true,
                years_of_experience:true,
                created_at:true,
                savedJobs:true,
            },
            data: dataToUpdate,
        })

        return {
            status:200,
            message:"updated user profile successfully",
            user: updatedUser
        }
    }
    catch (error) {
        throw error
    }
    
}

export const DeleteProfile = async (id) =>
{
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:id
            }
        })

        if(!user)
        {
            const error = new Error("user is not found")
            error.status = 404
            throw error
        }

        const deletedUser = await prisma.user.delete({
            where:{
                id: id
            }
        })

        return {
            status: 200,
            message: `user ${deletedUser.first_name + " " + deletedUser.last_name} deleted successfully`,
            deletedUser
        }
    } 
    catch (error) {
        throw error
    }
}

export const FollowCompany = async (userId,companyId) =>
{
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!user)
        {
            const error = new Error("user not found")
            error.status = 404
            throw error
        }

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

        const alreadyFollowed = await prisma.user.findFirst({
            where:{
                id:user.id,
                followings:{
                    some:{
                        id:company.id
                    }
                }
            }
        })

        let isFollowed;

        if(!alreadyFollowed)
        {
            await prisma.user.update({
                where:{
                    id:user.id,
                },
                data:{
                    followings:{
                        connect:{
                            id:company.id
                        }
                    }
                }
            })

            console.log("follow")

            isFollowed = true
        }
        else if(alreadyFollowed)
        {
            await prisma.user.update({
                where:{
                    id:user.id
                },
                data:{
                    followings:{
                        disconnect:{
                            id:company.id
                        }
                    }
                }
            })

            console.log("unfollow")
            
            isFollowed = false
        }

        return isFollowed
    } 
    catch (error) {
        throw error        
    }
}

export const GetFollowedCompanies = async (userId) =>
{
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!user)
        {
            const error = new Error("user not found")
            error.status = 404
            throw error
        }

        const followedCompanies = await prisma.company.findMany({
            where:{
                followers:{
                    some:{
                        id:userId
                    }
                }
            },
            select:{
                id:true,
                name:true,
                image:true,
                email:true,
                description:true,
                employees_count:true,
                created_at:true,
                _count:{
                    select:{
                        jobs:true
                    }
                }
            }
        })

        return followedCompanies
    } 
    catch (error) {
        throw error
    }
}


export const SaveJob = async(userId,jobId) =>
{
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!user)
        {
            const error = new Error("user not found")
            error.status= 404
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
            error.status= 404
            throw error
        }

        const alreadySaved = await prisma.user.findFirst({
            where:{
                id:user.id,
                savedJobs:{
                    some:{
                        id:job.id
                    }
                }
            }
        })

        let isSaved;

        if(!alreadySaved)
        {
            await prisma.user.update({
                where:{
                    id:user.id,
                },
                data:{
                    savedJobs:{
                        connect:{
                            id:job.id
                        }
                    }
                }
            })

            isSaved = true
        }

        else if(alreadySaved)
        {
            await prisma.user.update({
                where:{
                    id:user.id
                },
                data:{
                    savedJobs:{
                        disconnect:{
                            id:job.id
                        }
                    }
                }
            })

            isSaved = false
        }

        return isSaved
    } 
    catch (error) {
        throw error    
    }
}

export const GetSavedJobs = async (userId) =>
{
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!user)
        {
            const error = new Error("user not found")
            error.status= 404
            throw error
        }

        let savedJobs = await prisma.job.findMany({
            where:{
                savedBy:{
                    some:{
                        id:userId
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
                    job_status:true,
                    location:true,
                    Company:{
                        select:{
                            name:true,
                            id:true
                        }
                    },
                    savedBy:{
                        where:{
                            id:userId
                        }
                    }
                },
                take:5,
                orderBy:{
                    created_at:"desc"
                }
        })

        savedJobs = savedJobs.map((job) => ({...job, isSaved: job.savedBy.length > 0}))

        return savedJobs
    } 
    catch (error) {
        throw error
    }
}