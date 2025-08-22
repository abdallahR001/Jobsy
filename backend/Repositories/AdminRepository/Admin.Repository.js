import { validateAdminName, ValidateName } from "../../Utils/Validations/nameValidation.js"
import { validateEmail} from "../../Utils/Validations/emailValidation.js"
import { validatePassword } from "../../Utils/Validations/passwordValidation.js"
import { prisma } from "../../prisma/prismaClient.js"
import bcrypt from "bcryptjs"
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

        newAdmin = await prisma.admin.create({
            data
        })

        return {
            status: 201,
            message:"created admin successfully",
            newAdmin
        }
    } 
    catch (error) {
        throw error
    }
}

export const loginAsAdmin = async (credentials) =>
{
    try {
        validateAdminName(credentials.name)
        validateEmail(credentials.email)
        validatePassword(credentials.password)

        const admin = await prisma.admin.findFirst({
            where:{
                email:credentials.email,
                name:credentials.name
            }
        })
        
        if(!admin)
        {
            const error = new Error("invalid email or password")
            error.status = 400
            throw error
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password,admin.password)

        if(!isPasswordCorrect)
        {
            const error = new Error("invalid email or password")
            error.status = 400
            throw error
        }

        const token = jwt.sign({
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: "admin"
        })

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

