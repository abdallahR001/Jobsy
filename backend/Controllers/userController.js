import { CreateAccount, LogIn, updateProfile, deleteProfile, getProfile } from "../Services/UserService/UserService.js"
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
        const result = await updateProfile(req.user.id,req.body)

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