import { createCategory, DeleteCategory, UpdateCategory } from "../Services/CategoryService/CategoryService.js"

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