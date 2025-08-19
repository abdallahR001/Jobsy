export const ValidateName = (firstName,lastName) =>
{
    if(!firstName || firstName.trim().length < 3 || !lastName || lastName.trim().length < 3)
    {
        const error = new Error("name must be at least 3 characters")
        error.status = 400
        throw error
    }
    return true
}

export const validateCompanyName = (name) =>
{
    if(!name || name.trim().length < 3)
    {
        const error = new Error("name must be at least 3 characters")
        error.status = 400
        throw error
    }
}

export const validateJobName = (name) =>
{
    if(!name || name.trim().length < 4)
    {
        const error = new Error("job name must be at least 4 characters")
        error.status = 400
        throw error
    }
}