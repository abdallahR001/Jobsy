export const validatePassword = (password) =>
{
    if(!password || password.length < 8)
    {
        const error = new Error("password must be at least 8 characters")
        error.status = 400
        throw error  
    }  

    return true
    
}