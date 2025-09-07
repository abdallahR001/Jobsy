import { prisma } from "../prisma/prismaClient.js"
import { CreateAccount, LogIn, updateProfile, deleteProfile, getProfile, followCompany, unFollowCompany, getFollowedCompanies, saveJob, unSaveJob, getSavedJobs } from "../Services/UserService/UserService.js"
export const createAccount = async(req,res,next) =>
{
    try {
        const result = await CreateAccount(req.body)    

        res.status(201).cookie("token",result.token,{
            httpOnly:true,
            secure:false
        }).json({
            message:result.message
        })
    } 
    catch (error) {
        next(error)
    }
}

export const onBoardingPage = async (req,res,next) =>
{
    try {
        const userId = req.user.id
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                first_name:true,
                hasSeenOnboarding:true
            }
        })

        res.status(200).json({
            id:userId,
            name: user.first_name
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const me = async(req,res,next) =>
{
    try {
        console.log(req.cookies)
        const user = await prisma.user.findUnique({
            where:{
                id:req.user.id
            },
            select:{
                id:true,
                first_name:true,
                last_name:true,
                image:true,
            }
        })    

        res.status(200).json({
            id:user.id,
            first_name:user.first_name,
            last_name:user.last_name,
            image:user.image,
        })

        return user
    } 
    catch (error) {
        next(error)
    }
}

export const logIn = async(req,res,next) =>
{
    try {
        const result = await LogIn(req.body)
        res.cookie("token",result.token,{
            httpOnly:true,
            secure:false
        }).json({
            message:"logged in successfully",
        })
    } 
    catch (error) {
        next(error)
    }
}

export const GetProfile = async (req,res,next) =>
{
    try {
        const result = await getProfile(req.user.id)

        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)
    }
}

export const UpdateProfile = async (req,res,next) =>
{
    try {

        const data = req.body

        if (req.file) {
            data.image = `uploads/${req.file.filename}`
        }
        const result = await updateProfile(req.user.id,data)

        res.status(result.status).json({
            message:result.message,
        })
    } 
    catch (error) {
        next(error)
    }
}

export const DeleteProfile = async (req,res,next) =>
{
    try {
        const result = await deleteProfile(req.user.id)
        
        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)
    }
}

export const FollowCompany = async (req,res,next) =>
{
    try {
        const userId = req.user.id
        const {companyId} = req.params

        const result = await followCompany(userId,companyId)
        
        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const UnFollowCompany = async (req,res,next) =>
{
    try {
        const userId = req.user.id
        const {companyId} = req.params

        const result = await unFollowCompany(userId,companyId)
    
        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const GetFollowedCompanies = async (req,res,next) =>
{
    try {
        const userId = req.user.id

        const result = await getFollowedCompanies(userId)
        
        res.status(200).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const SaveJob = async (req,res,next) =>
{
    try {
        const userId = req.user.id
        
        const {jobId} = req.params

        const result = await saveJob(userId,jobId)

        res.status(200).json({
            message:"saved job successfully",
            user: result
        })
    } 
    catch (error) {
        next(error)
    }
}

export const UnSaveJob = async (req,res,next) =>
{
    try {
        const userId = req.user.id
        
        const {jobId} = req.params

        const result = await unSaveJob(userId,jobId)

        res.status(200).json({
            message:"unsaved job successfully",
            user: result
        })
    } 
    catch (error) {
        next(error)
    }
}

export const GetSavedJobs = async (req,res,next) =>
{
    try {
        const userId = req.user.id

        const result = await getSavedJobs(userId)

        res.status(200).json({
            savedJobs:result
        })
    } 
    catch (error) {
        next(error)    
    }
}