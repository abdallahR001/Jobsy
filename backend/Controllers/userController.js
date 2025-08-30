import { CreateAccount, LogIn, updateProfile, deleteProfile, getProfile, followCompany, unFollowCompany, getFollowedCompanies } from "../Services/UserService/UserService.js"
export const createAccount = async(req,res,next) =>
{
    try {
        const result = await CreateAccount(req.body)    

        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)
    }
}

export const logIn = async(req,res,next) =>
{
    try {
        const result = await LogIn(req.body)
        
        res.status(result.status).json({
            result
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
            result
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

