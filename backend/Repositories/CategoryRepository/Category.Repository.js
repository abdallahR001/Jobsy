import { prisma } from "../../prisma/prismaClient.js"

export const addCategory = async (data) =>
{
    try {

        let newCategory = await prisma.category.findUnique({
            where:{
                name:data.name
            }
        })

        if(newCategory)
        {
            const error = new Error("category aleady exist")
            error.status = 400
            throw error
        }
         
        newCategory = await prisma.category.create({
            data
        })

        return {
            status: 201,
            message: "category created successfully",
            newCategory
        }
    } 
    catch (error) {
        throw error
    }
}

export const updateCategory = async (id,data) =>
{
    try {
        const category = await prisma.category.findUnique({
            where:{
                id,
            }
        })

        if(!category)
        {
            const error = new Error("category not found")
            error.status = 404
            throw error
        }

        const updatedCategory = await prisma.category.update({
            where:{
                id,
            },
            data,
        })

        return {
            status: 200,
            message: "category updated successfully",
            updatedCategory
        }
    } 
    catch (error) {
        throw error
    }
}

export const deleteCategory = async (id) =>
{
    try {
        const deletedCategory = await prisma.category.delete({
            where:{
                id,
            }
        })

        return {
            status: 200,
            message: "category deleted successfully",
            deletedCategory
        }
    } 
    catch (error) {
        throw error
    }
}