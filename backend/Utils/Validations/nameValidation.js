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

export const validateAdminName = (name) =>
{
    if(!name || name.trim().length < 3)
    {
        const error = new Error("admin name must be at least 3 characters")
        error.status = 400
        throw error
    }
}

export const validateCategoryName = (name) =>
{
    if(!name || name.trim().length < 2)
    {
        const error = new Error("category name must be at least 2 characters")
        error.status = 400
        throw error
    }
}

export const validateSkillName = (name) =>
{
    if(!name || name.trim().length < 2)
    {
        const error = new Error("skill name must be at least 2 characters")
        error.status = 400
        throw error
    }
}