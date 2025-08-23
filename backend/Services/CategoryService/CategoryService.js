import { addCategory , deleteCategory, getCategories, updateCategory, getCategory} from "../../Repositories/CategoryRepository/Category.Repository.js"
import { validateCategoryName } from "../../Utils/Validations/nameValidation.js"

export const GetCategories = async () =>
{
    try {
        const result = await getCategories()

        return result
    } 
    catch (error) {
        console.log("error❌",error.message)
        throw error            
    }
} 

export const GetCategory = async (id) =>
{
    try {
        const result = await getCategory(id)

        return result
    } 
    catch (error) {
        console.log("error❌",error.message)
        throw error            
    }
}

export const createCategory = async (data) =>
{
    try {
        validateCategoryName(data.name)    

        const result = await addCategory(data)

        return result
    } 
    catch (error) {
        console.log("error❌",error)
        throw error
    }
}

export const UpdateCategory = async (id,data) =>
{
    try {
        validateCategoryName(data.name)
        
        const result = await updateCategory(id,data)

        return result
    } 
    catch (error) {
        console.log("error❌",error)
        throw error
    }
}

export const DeleteCategory = async (id) =>
{
    try {
        const result = await deleteCategory(id)

        return result
    } 
    catch (error) {
        console.log("error❌",error)
        throw error
    }
}