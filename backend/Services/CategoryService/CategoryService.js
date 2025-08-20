import { addCategory , deleteCategory, updateCategory} from "../../Repositories/CategoryRepository/Category.Repository.js"
import { validateCategoryName } from "../../Utils/Validations/nameValidation.js"

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