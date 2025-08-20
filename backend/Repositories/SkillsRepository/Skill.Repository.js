import { validateSkillName } from "../../Utils/Validations/nameValidation.js"
import { prisma } from "../../prisma/prismaClient.js"
export const addSkill = async (data) =>
{
    try {
        validateSkillName(data.name)

        let newSkill = await prisma.skill.findUnique({
            where:{
                name:data.name
            }
        })

        if(newSkill)
        {
            const error = new Error("skill aleady exist")
            error.status = 400
            throw error
        }
         
        newSkill = await prisma.skill.create({
            data:{
                name:data.name,
                category:{
                    connect:{
                        id:data.id
                    }
                }
            }
        })

        return {
            status: 201,
            message: "skill created successfully",
            newSkill
        }
    } 
    catch (error) {
        throw error
    }
}

export const updateSkill = async (id,data) =>
{
    try {
        validateSkillName(data.name)
        
        const skill = await prisma.skill.findUnique({
            where:
            {
                id,
            }
        })

        if(!skill)
        {
            const error = new Error("skill not found")
            error.status = 404
            throw error
        }
    }
    catch (error) {
        throw error    
    }
}

export const deleteSkill = async (id) =>
{
    try {
        const deletedSkill = await prisma.skill.delete({
            where:{
                id,
            }
        })

        return {
            status: 200,
            message: "skill deleted successfully",
            deletedSkill
        }
    } 
    catch (error) {
        throw error    
    }
}