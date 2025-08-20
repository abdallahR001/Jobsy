import { Router } from "express";
import { UpdateProfile, createAccount, DeleteProfile, GetProfile, logIn } from "../Controllers/userController.js";
import { authMiddleWare } from "../MiddleWares/AuthMiddleWare.js";
import multer from "multer";
import { authorizeRoles } from "../MiddleWares/AuthorizationMiddleWare.js";
const userRouter = Router()

const storage = multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"../uploads")
    },
    filename:function(req,file,cb)
    {
        cb(null,file.originalname + Date.now())
    }
})

const upload = multer({storage})

userRouter.get("/profile",authMiddleWare,GetProfile)
userRouter.post("/signUp", createAccount)
userRouter.post("/signIn",logIn)
userRouter.put("/update-profile",authMiddleWare,upload.single("image"),authorizeRoles("user"),UpdateProfile)
userRouter.delete("/delete",authMiddleWare,DeleteProfile)



export default userRouter