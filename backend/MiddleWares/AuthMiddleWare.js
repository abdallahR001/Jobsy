import jwt from "jsonwebtoken"

export const authMiddleWare = (req,res,next) =>
{
    console.log(req.cookies)
    
    const token = req.cookies.token

    if(!token)
    {
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