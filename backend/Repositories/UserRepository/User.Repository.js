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
                    password:hashedPassword
                }
            })
            const token = jwt.sign({
            id: user.id,
            name: user.first_name
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

        //finish this later
        const dataToUpdate = {}
    
        if(!user)
        {
            const error = new Error("user not found")
            error.status = 404
            throw error
        }

        if(data.title)
            dataToUpdate.title = data.title

        if(data.bio)
        {
            dataToUpdate.bio =  data.bio
        }

        if(data.years_of_experience)
        {
            dataToUpdate.years_of_experience = data.years_of_experience
        }

        const updatedUser = await prisma.user.update({
            where:{
                id:id
            },
            select:{
                first_name:true,
                last_name:true,
                email:true,
                image:true,
                bio:true,
                years_of_experience:true,
                title:true
            },
            data: dataToUpdate
        })

        return {
            status:200,
            message:"updated user profile successfully",
            data: updatedUser
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