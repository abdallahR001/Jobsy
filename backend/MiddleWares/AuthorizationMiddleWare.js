export const authorizeRoles = (...allowedRoles) =>
{
    return (req,res,next) =>
    {
        const {role} = req.user
        
        if(!req.user || !allowedRoles.includes(role))
        {   
            return res.status(403).json({
                message:"access denied"
            })
        }
        next()
    }
}