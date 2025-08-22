import { AddSkill, DeleteSkill, GetSkillsByCategory, UpdateSkill } from "../Services/SkillService/SkillService.js"

export const getSkills = async (req,res,next) =>
{
    try {
        const result = await GetSkillsByCategory(req.params.id)

        res.status(200).json(result)
    } 
    catch (error) {
        next(error)    
    }
}

export const addSkill = async (req,res,next) =>
{
    try {
        const result = await AddSkill(req.body)

        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const updateSkill = async (req,res,next) =>
{
    try {
        const result = await UpdateSkill(req.params.id,req.body)

        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const deleteSkill = async (req,res,next) =>
{
    try {
        const result = await DeleteSkill(req.params.id)

        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}