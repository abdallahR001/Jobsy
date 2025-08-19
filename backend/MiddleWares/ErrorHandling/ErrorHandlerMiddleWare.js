export const errorHandler = (err,req,res,next)=>
{
    res.status(err.status || 500).json({
        status : err.status || 500,
        message : err.message || "something went wrong, please try again later",
        stack: err.stack
    })
}