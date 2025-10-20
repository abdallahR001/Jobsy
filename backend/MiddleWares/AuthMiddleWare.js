import jwt from "jsonwebtoken"

export const authMiddleWare = (req,res,next) =>
{  
    const token = req.cookies.token || req.headers.token    

    if(!token)
    {
        if(req.route.path === "/me" || req.route.path === "/")
        {
            return res.status(200).json({fail:true})
        }
        return res.status(401).json({message: "you are not logged in"})
    }

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