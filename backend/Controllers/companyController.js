import { GetCompanyProfile , CreateNewCompany , LogInAsCompany, UpdateCompanyProfile , DeleteCompanyProfile } from "../Services/CompanyService/CompanyService.js"
export const getCompany = async (req,res,next) =>
{
    try {
        const result = await GetCompanyProfile(req.user.id)

        res.status(result.status).json({
            result
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

        res.status(result.status).json({
            result
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

        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const updateCompany = async (req,res,next) =>
{
    try {
        const result = await UpdateCompanyProfile(req.user.id,req.body)

        res.status(result.status).json({
            result
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

        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}