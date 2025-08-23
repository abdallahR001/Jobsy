
import { prisma } from "../../prisma/prismaClient.js"
import bcrypt, { hash } from "bcryptjs"
import jwt from "jsonwebtoken"
export const createAdmin = async (data) =>
{
    try {
        let newAdmin = await prisma.admin.findUnique({
            where:{
                email:data.email
            }
        })

        if(newAdmin)
        {
            const error = new Error("admin aleady exist")
            error.status = 400
            throw error
        }

        const hashedPassword = await bcrypt.hash(data.password,10)

        newAdmin = await prisma.admin.create({
            data:{
                name:data.name,
                email:data.email,
                password:hashedPassword
            }
        })

        const token = jwt.sign({
            id: newAdmin.id,
            name: newAdmin.name,
            email: newAdmin.email,
            role: "admin"
        },process.env.JWT_SECRET,{expiresIn:"1d"})

        return {
            status: 201,
            message:"created admin successfully",
            token,
        }
    } 
    catch (error) {
        throw error
    }
}

export const loginAsAdmin = async (credentials) =>
{
    try {
        const admin = await prisma.admin.findFirst({
            where:{
                email:credentials.email,
                name:credentials.name
            }
        })
        
        if(!admin)
        {
            const error = new Error("invalid name or email or password")
            error.status = 401
            throw error
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password,admin.password)

        if(!isPasswordCorrect)
        {
            const error = new Error("invalid email or password")
            error.status = 401
            throw error
        }

        const token = jwt.sign({
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: "admin"
        },process.env.JWT_SECRET,{expiresIn:"1d"})

        return {
            status: 200,
            message: "logged in successfully",
            token
        }
    } 
    catch (error) {
        throw error
    }   
}

