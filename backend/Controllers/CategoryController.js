import { createCategory, DeleteCategory, GetCategories, UpdateCategory, GetCategory} from "../Services/CategoryService/CategoryService.js"
import { GetCompanyFollowers } from "../Services/CompanyService/CompanyService.js"

export const getCategories = async (req,res,next) =>
{
    try {
        const result = await GetCategories()

        res.status(200).json({
            categories:result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const getCategory = async (req,res,next) =>
{
    try {
        const result = await GetCategory(req.params.id)

        res.status(200).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const CreateCategory = async (req,res,next) =>
{
    try {
        const result = await createCategory(req.body)

        res.status(result.status).json({
            message: result.message,
            category: result.newCategory
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const updateCategory = async (req,res,next) =>
{
    try {
        const {id} = req.params

        const result = await UpdateCategory(id,req.body)

        res.status(result.status).json({
            message: result.message,
            category: result.updatedCategory
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const deleteCategory = async (req,res,next) =>
{
    try {
        const {id} = req.params
        
        const result = await DeleteCategory(id)

        res.status(result.status).json({
            message: result.message,
            category: result.deletedCategory
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

