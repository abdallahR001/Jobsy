export const validateDescription = (description) =>
{
    if(!description || description.trim().length < 10)
    {
        const error = new Error("description is too short, should be at least 10 characters long")
        error.status = 400
        throw error
    }

    if(description.length > 350)
    {
        const error = new Error("description is too long, should be maximum 350 characters long")
        error.status = 400
        throw error
    }
}