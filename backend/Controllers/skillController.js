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

        console.log(cat)

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