import { Router } from "express";
import { UpdateProfile, createAccount, DeleteProfile, GetProfile, logIn, FollowCompany, GetFollowedCompanies, SaveJob, GetSavedJobs, me, onBoardingPage, viewCompanyProfile, Logout, UploadPortfolioFile } from "../Controllers/userController.js";
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
        cb(null,Date.now() + "-" + file.originalname)
    }
})

const upload = multer(
    {
        storage,
        limits: {
            fieldSize:50 * 1024 * 1024,
            fileSize: 50 * 1024 * 1024 // 50 MB
        },
        fileFilter: (req, file, cb) => {
            if (file.mimetype === "application/x-msdownload") {
            return cb(new Error("EXE files not allowed"));
            }
            cb(null, true);
        },
    }
)

userRouter.get("/profile",authMiddleWare,authorizeRoles("user","company"),GetProfile)
userRouter.get("/followed-companies",authMiddleWare,authorizeRoles("user"),GetFollowedCompanies)
userRouter.get("/onBoarding",authMiddleWare,authorizeRoles("user","company"),onBoardingPage)
userRouter.get("/me",authMiddleWare,authorizeRoles("user","company"),me)
userRouter.get("/company/:companyId",authMiddleWare,authorizeRoles("user","admin"),viewCompanyProfile)
userRouter.post("/signUp", createAccount)
userRouter.post("/signIn",logIn)
userRouter.put("/update-profile",authMiddleWare,upload.single("image"),authorizeRoles("user"),UpdateProfile)
userRouter.delete("/delete",authMiddleWare,DeleteProfile)
userRouter.post("/follow",authMiddleWare,authorizeRoles("user"),FollowCompany)
userRouter.post("/save",authMiddleWare,authorizeRoles("user"),SaveJob)
userRouter.post("/upload-file",authMiddleWare,authorizeRoles("user"),upload.single("file"),UploadPortfolioFile)
userRouter.get("/savedjobs",authMiddleWare,authorizeRoles("user"),GetSavedJobs)
userRouter.get("/logout",authMiddleWare,authorizeRoles("user"),Logout)

export default userRouter