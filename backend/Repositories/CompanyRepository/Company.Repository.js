import { validateCompanyName } from "../../Utils/Validations/nameValidation.js"
import { validateEmail } from "../../Utils/Validations/emailValidation.js"
import { validatePassword } from "../../Utils/Validations/passwordValidation.js"
import { prisma } from "../../prisma/prismaClient.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const GetCompany = async (id) =>
{
    try {
        const company = await prisma.company.findUnique({
            where:{
                id:id
            },
            select:{
                id:true,
                name:true,
                email:true,
                image:true,
                description:true,
                employees_count:true,
                created_at:true,
                website:true,
                jobs:{
                    select:{
                        id:true,
                        title:true,
                        description:true,
                        minimum_years_required: true,
                        salary:true,
                        skills:true,
                    },
                    take:5,
                    orderBy:{
                        created_at:"desc"
                    }
                }
            }
        })   
        
        if(!company)
        {
            const error = new Error("company not found")
            error.status = 404
            throw error
        }

        return{
            status:200,
            company
        }
    } 
    catch (error) {
        throw error
    }
}

export const CreateCompany = async (data) =>
{
    try {
        let company = await prisma.company.findFirst({
            where:{
                OR:[
                    {
                        email:data.email
                    }
                    ,
                    {
                        name:data.name
                    }
                ]
            }
        })
        if(company)
        {
            const error = new Error("company already exist")
            error.status = 400
            throw error
        }
        validateCompanyName(data.name)
        validateEmail(data.email)
        validatePassword(data.password)

        const hashedPassword = await bcrypt.hash(data.password,10)

        company = await prisma.company.create({
            data:{
                name: data.name,
                email: data.email,
                password: hashedPassword,
                hasSeenOnboarding:false,
            }
        })

        const token = jwt.sign({
            id:company.id,
            role: "company"
        },process.env.JWT_SECRET,{expiresIn:"1d"})

        return{
            status: 201,
            token:token,
            message: "company created successfully"
        }
    } 
    catch (error) {
        throw error
    }
}

export const LogIn = async (email,password) =>
{
    try {
        validateEmail(email)
        validatePassword(password)
        
        const company = await prisma.company.findUnique({
            where:{
                email
            }
        })

        if(!company)
        {
            const error = new Error("invalid email or password")
            error.status = 401
            throw error
        }

        const isPasswordCorrect = await bcrypt.compare(password,company.password)

        if(!isPasswordCorrect)
        {
            const error = new Error("invalid email or password")
            error.status = 401
            throw error
        }

        const token = jwt.sign({
            id:company.id,
            role: "company"
        },process.env.JWT_SECRET,{
            expiresIn:"1d"
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

export const UpdateCompany = async (id,data) =>
{
    try {
        const company = await prisma.company.findUnique({
            where:{
                id:id
            },
        })

        if(!company)
        {
            const error = new Error("company not found")
            error.status = 404
            throw error
        }

        const dataToUpdate = {}

        if(data.name)
        {
            const isCompanyExist = await prisma.company.findUnique({
                where:{
                    name: data.name
                }
            })
            
            if(isCompanyExist)
            {
                const error = new Error("there is already a company with that name")
                error.status = 400
                throw error
            }
            else
                dataToUpdate.name = data.name
        }

        if(data.description)
            dataToUpdate.description = data.description

        if(data.website)
            dataToUpdate.website = data.website
        
        if(data.employees_count)
            dataToUpdate.employees_count = data.employees_count

        if(data.image)
            dataToUpdate.image = data.image

        if(!company.hasSeenOnboarding)
            dataToUpdate.hasSeenOnboarding = true

        const updatedCompany = await prisma.company.update({
            where:{
                id:id,
            },
            select:{
                id:true,
                name:true,
                email:true,
                image:true,
                description:true,
                employees_count:true,
                created_at:true,
                website:true,
            },
            data:dataToUpdate
        })

        return {
            status:200,
            message: "updated company successfully",
            updatedCompany
        }
    }
    catch (error) {
        throw error
    }
}

export const DeleteCompany = async (id) =>
{
    try {
        const company = await prisma.company.findUnique({
            where:{
                id:id
            }
        })


        if(!company)
        {
            const error = new Error("company not found")
            error.status = 404
            throw error
        }

        const deletedCompany = await prisma.company.delete({
            where:{
                id:id
            }
        })

        return{
            status:200,
            message: `company ${company.name} was deleted successfully`,
            id:deletedCompany.id
        }
    } 
    catch (error) {
        throw error
    }
}

export const getCompanyFollowers = async (companyId) =>
{
    try {
        const followers = await prisma.user.findMany({
            where:{
                followings:{
                    some:{
                        id:companyId
                    }
                }
            },
            select:{
                id:true,
                first_name:true,
                last_name:true,
                title:true,
                image:true,
                email:true
            }
        })    

        return followers
    }
    catch (error) {
        throw error
    }
}