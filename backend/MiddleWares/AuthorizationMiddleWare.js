export const authorizeRoles = (...allowedRoles) =>
{
    return (req,res,next) =>
    {
        if(!req.user || !allowedRoles.includes(req.user.role))
        {
            console.log(req.user)
            return res.status(403).json({
                message:"access denied"
            })
        }
        next()
    }
}