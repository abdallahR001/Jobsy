import { prisma } from "../prisma/prismaClient.js"
import { AddSkill, DeleteSkill, GetSkillsByCategory, UpdateSkill } from "../Services/SkillService/SkillService.js"

export const defaultSkills = async (req,res,next) =>
{
    try {
        const {category} = req.query

        const cat = await prisma.category.findUnique({
            where:{
                name:category
            }
        })

        const skills = await prisma.skill.findMany({
            where:{
                categoryId:cat.id
            }
        })

        res.status(200).json({
            skills
        })
    } 
    catch (error) {
        next(error)
    }
}

export const searchSkills = async (req,res,next) =>
{
    try {
        const {query,category} = req.query

    const cat = await prisma.category.findUnique({
            where:{
                name:category
            }
        })

    const skills = await prisma.skill.findMany({
        where:{
            AND:[
                {
                    categoryId:cat.id
                },
                {
                    name:{
                        contains:query,
                        mode:"insensitive"
                    }
                }
            ]
        },
        select:{
            id:true,
            name:true
        }
    })

    res.status(200).json({
        skills:skills
    })
    } 
    catch (error) {
        next(error)    
    }
}

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

export const addSkillsToUser = async (req,res,next) =>
{
    try {
        const {id} = req.user
        
        const {skillsIds} = req.body
    
        await prisma.user.update({
            where:{
                id
            },
            data:{
                skills:{
                    connect:skillsIds.map((id) => ({id}))
                }
            }
        })

        res.status(200).json(
            {
                message: "added skills successfully"
            }
        )
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

export const getUserSkills = async (req,res,next) =>
{
    const {id} = req.user

    try {
        const skills = await prisma.skill.findMany({
            where:{
                user:{
                    some:{
                        id:id
                    }
                }
            }
        })

        res.status(200).json({
            skills
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const deleteUserSkill = async (req,res,next) =>
{
    const {id} = req.user
    const {skillId} = req.body

    try {
        const deletedSkill = await prisma.skill.update({
            where:{
                id:skillId,
                user:{
                    some:{
                        id:id
                    }
                }
            },
            data:{
                user:{
                    disconnect:{
                        id:id
                    }
                }
            }
        })

        if(!deletedSkill)
            return res.status(404).json(
        {
            message: "skill not found"
        })

        res.status(200).json(
            {
                message: "skill removed successfully from your skill set"
            }
        )
    } 
    catch (error) {
        next(error)    
    }
}