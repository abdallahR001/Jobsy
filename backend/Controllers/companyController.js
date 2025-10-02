import { prisma } from "../prisma/prismaClient.js"
import { GetCompanyProfile , CreateNewCompany , LogInAsCompany, UpdateCompanyProfile , DeleteCompanyProfile, GetCompanyFollowers } from "../Services/CompanyService/CompanyService.js"
export const getCompany = async (req,res,next) =>
{
    try {
        const {id} = req.user
        const result = await GetCompanyProfile(id)

        res.status(result.status).json(
            {
                company: result.company
            }
        )
    } 
    catch (error) {
        next(error)    
    }
}

export const getAllApplicants = async (req,res,next) =>
{
    try {
        const companyId = req.user.id

        const applicants = await prisma.user.findMany({
            where:{
                applications:{
                    some:{
                        job:{
                            companyId:companyId
                        }
                    }
                },
            },
            select:{
                id:true,
                first_name:true,
                last_name:true,
                title:true,
                email:true,
                location:true,
                image:true,
                applications:{
                    where:{
                        job:{
                            companyId:companyId
                        }
                    },
                    select:{
                        id:true,
                        userId:true,
                        status:true,
                        job:{
                            select:{
                                title:true
                            }
                        },
                        cover_letter:true,
                        salary:true
                    },
                    orderBy:{
                        created_at:"desc"
                    }
                }
            },
            orderBy:{
                created_at:"asc"
            }
        })

        res.status(200).json({
            applicants: applicants
        })
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

        res.status(result.status).cookie("token",result.token,{
            httpOnly:true,
            secure:false
        }).json({
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
        const {email,password} = req.body
        const result = await LogInAsCompany(email,password)

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

        if(req.file)
            data.image = `uploads/${req.file.filename}`

        const result = await UpdateCompanyProfile(companyId,data)

        res.status(result.status).json({
            company: result.updatedCompany
        })
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

        res.status(200).json({
            followers: result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const dashBoard = async (req,res,next) =>
{
    try {
        const companyId = req.user.id
        const jobs = await prisma.job.count({
            where:{
                companyId:companyId
            }
        })

        const activeJobs = await prisma.job.count({
            where:{
                AND:[
                    {
                        companyId
                    },
                    {
                        job_status:"open"
                    }
                ]
            }
        })

        const applicants = await prisma.application.count({
            where:{
                job:{
                    companyId
                }
            }
        })

        const followers = await prisma.user.count({
            where:{
                followings:{
                    some:{
                        id:companyId
                    }
                }
            }
        })

        const recentJobs = await prisma.job.findMany({
            where:{
                companyId: companyId,
            },
            take:5,
            select:{
                id:true,
                title:true,
                description:true,
                location:true,
                salary:true || null,
                minimum_years_required:true || null,
                type:true,
                job_status:true,
                created_at:true,
                _count:{
                    select:{
                        applications:true
                    }
                }
            }
        })

        res.status(200).json({
            jobs,
            activeJobs,
            applicants,
            followers,
            recentJobs
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const logout = (req,res,next) =>
{
    try {
        res.status(200).clearCookie("token",{
            httpOnly:true,
            secure:false
        }).json({
            message:"logged out"
        })
    } 
    catch (error) {
        next(error)    
    }
}