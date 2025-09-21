export const authorizeRoles = (...allowedRoles) =>
{
    return (req,res,next) =>
    {
        const {role} = req.user
        console.log(role);
        
        console.log(allowedRoles);
        
        if(!req.user || !allowedRoles.includes(role))
        {
            console.log(req?.user)
            console.log(role);
            
            console.log(allowedRoles);
            
            return res.status(403).json({
                message:"access denied"
            })
        }
        next()
    }
}