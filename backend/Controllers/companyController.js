import { GetCompanyProfile , CreateNewCompany , LogInAsCompany, UpdateCompanyProfile , DeleteCompanyProfile, GetCompanyFollowers } from "../Services/CompanyService/CompanyService.js"
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

export const getCompanyFollowers = async (req,res,next) =>
{
    try {
        const companyId = req.user.id

        const result = await GetCompanyFollowers(companyId)

        res.status(200).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}