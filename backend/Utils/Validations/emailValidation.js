export const validateEmail = (email) =>
{
    if(!email || !email.endsWith("@gmail.com"))
    {
        const error = new Error("email is not valid")
        error.status = 400
        throw error
    }
    else{
        return true
    }
}