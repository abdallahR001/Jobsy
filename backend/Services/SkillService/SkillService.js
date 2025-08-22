import { validateSkillName } from "../../Utils/Validations/nameValidation.js"
import { addSkill, deleteSkill, getSkillsByCategory, updateSkill } from "../../Repositories/SkillsRepository/Skill.Repository.js"

export const GetSkillsByCategory = async (categoryId) =>
{
    try {
        const result = await getSkillsByCategory(categoryId)

        return result
    } 
    catch (error) {
        console.log("error❌",error.message)
        throw error  
    }
}

export const AddSkill = async (data) =>
{
    try {
        validateSkillName(data.name) 
        
        const result = await addSkill(data)

        return result
    } 
    catch (error) {
        console.log("error❌",error.message)
        throw error
    }
}

export const UpdateSkill = async(id,data) =>
{
    try {
        validateSkillName(data.name) 
        
        const result = await updateSkill(id,data)

        return result
    } 
    catch (error) {
        console.log("error❌",error.message)
        throw error
    }
}

export const DeleteSkill = async(id) =>
{
    try {
        const result = await deleteSkill(id)

        return result
    } 
    catch (error) {
        console.log("error❌",error.message)
        throw error
    }
}