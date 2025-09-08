import { prisma } from "../prisma/prismaClient.js"
import { GetCompanyProfile , CreateNewCompany , LogInAsCompany, UpdateCompanyProfile , DeleteCompanyProfile, GetCompanyFollowers } from "../Services/CompanyService/CompanyService.js"
export const getCompany = async (req,res,next) =>
{
    try {
        const result = await GetCompanyProfile(req.user.id)

        res.status(result.status).json(result)
    } 
    catch (error) {
        next(error)    
    }
}

export const me = async(req,res,next) =>
{
    try {
        const company = await prisma.company.findUnique({
            where:{
                id:req.user.id
            },
            select:{
                id:true,
                name:true,
                image:true,
            }
        })    

        res.status(200).json({
            id:company.id,
            companyName:company.name,
            image:company.image,
        })

        return company
    } 
    catch (error) {
        next(error)
    }
}

export const onBoardingPage = async (req,res,next) =>
{
    try {
        const companyId = req.user.id
        const company = await prisma.company.findUnique({
            where:{
                id:companyId
            },
            select:{
                name:true,
                hasSeenOnboarding:true
            }
        })

        res.status(200).json({
            id:companyId,
            name: company.name,
            hasSeenOnboarding: company.hasSeenOnboarding
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const createCompany = async (req,res,next) =>
{
    try {
        const result = await CreateNewCompany(req.body)

        res.status(result.status).cookie("token",result.token).json({
            message:result.message,
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const logIn = async (req,res,next) =>
{
    try {
        const result = await LogInAsCompany(req.body)

        res.status(result.status).cookie("token",result.token,{
            httpOnly: true,
            secure:false
        }).json({
            message:result.message
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const updateCompany = async (req,res,next) =>
{
    try {
        const data = req.body

        const companyId = req.user.id

        const result = await UpdateCompanyProfile(companyId,data)

        if(req.file)
            data.image = `uploads/${req.file.filename}`

        res.status(result.status).json(result)
    } 
    catch (error) {
        next(error)    
    }
}


export const deleteCompany = async (req,res,next) =>
{
    try {
        const result = await DeleteCompanyProfile(req.user.id)

        res.status(result.status).json(result)
    } 
    catch (error) {
        next(error)    
    }
}

export const getCompanyFollowers = async (req,res,next) =>
{
    try {
        const companyId = req.user.id

        const result = await GetCompanyFollowers(companyId)

        res.status(200).json.json(result)
    } 
    catch (error) {
        next(error)    
    }
}