import { CreateAdmin, LoginAsAdmin } from "../Services/AdminService/AdminService.js"

export const createAdmin = async (req,res,next) =>
{
    try {
        const result = await CreateAdmin(req.body)

        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const loginAsAdmin = async (req,res,next) =>
{
    try {
        const result = await LoginAsAdmin(req.body)

        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)
    }
}