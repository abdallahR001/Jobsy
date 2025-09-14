import jwt from "jsonwebtoken"
export const searchMiddleWare = (req,res,next) =>
{
    const token = req.cookies.token

    if(!token)
        return next()

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded) =>
        {
            if(err)
            {
                return res.status(401).json({message:"token is not valid"})
            }
    
            req.user = decoded
    
            next()
        })
}