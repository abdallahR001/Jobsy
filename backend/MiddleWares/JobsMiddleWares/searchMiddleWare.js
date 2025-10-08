import jwt from "jsonwebtoken"
export const searchMiddleWare = (req,res,next) =>
{
    const token = req.cookies.token || req.headers.token

    if(!token)
        return next()

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded) =>
        {
            if(err)
            {
                next()
                return
            }
    
            req.user = decoded
    
            next()
        })
}