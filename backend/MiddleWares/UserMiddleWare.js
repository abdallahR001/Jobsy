export const userMiddleWare = (req,res,next) =>
{
    if(req.user)
    {
        console.log("middleware on");
        
        next()
    }
    res.status(200).json({
        message: "no user",
        status:"fail"
    })
}