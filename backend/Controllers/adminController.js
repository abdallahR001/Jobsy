import { CreateAdmin } from "../Services/AdminService/AdminService.js"

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