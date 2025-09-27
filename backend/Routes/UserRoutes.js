import { Router } from "express";
import { UpdateProfile, createAccount, DeleteProfile, GetProfile, logIn, FollowCompany, GetFollowedCompanies, SaveJob, GetSavedJobs, me, onBoardingPage } from "../Controllers/userController.js";
import { authMiddleWare } from "../MiddleWares/AuthMiddleWare.js";
import multer from "multer";
import { authorizeRoles } from "../MiddleWares/AuthorizationMiddleWare.js";
import path from "path"
import fs from "fs"
const userRouter = Router()


const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,uploadDir)
    },
    filename:function(req,file,cb)
    {
        cb(null,file.originalname + "-" + Date.now())
    }
})

const upload = multer({storage})

userRouter.get("/profile",authMiddleWare,authorizeRoles("user","company"),GetProfile)
userRouter.get("/followed-companies",authMiddleWare,authorizeRoles("user"),GetFollowedCompanies)
userRouter.get("/onBoarding",authMiddleWare,authorizeRoles("user","company"),onBoardingPage)
userRouter.get("/me",authMiddleWare,authorizeRoles("user","company"),me)
userRouter.post("/signUp", createAccount)
userRouter.post("/signIn",logIn)
userRouter.put("/update-profile",authMiddleWare,upload.single("image"),authorizeRoles("user"),UpdateProfile)
userRouter.delete("/delete",authMiddleWare,DeleteProfile)
userRouter.post("/follow",authMiddleWare,authorizeRoles("user"),FollowCompany)
userRouter.post("/save",authMiddleWare,authorizeRoles("user"),SaveJob)
userRouter.get("/savedjobs",authMiddleWare,authorizeRoles("user"),GetSavedJobs)

export default userRouter