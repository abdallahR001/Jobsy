import { Router } from "express";
import { createCompany, deleteCompany, getCompany, getCompanyFollowers, logIn, onBoardingPage, updateCompany } from "../Controllers/companyController.js";
import { authMiddleWare } from "../MiddleWares/AuthMiddleWare.js";
import { authorizeRoles } from "../MiddleWares/AuthorizationMiddleWare.js";
import multer from "multer";
import path from "path"
import fs from "fs";

const companyRouter = Router()

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,uploadDir)
    },
    filename:(req,file,cb) =>
    {
        cb(null, Date.now() + "-"+ file.originalname)
    },
})

const upload = multer({storage})

companyRouter.get("/",authMiddleWare,authorizeRoles("company"),getCompany)
companyRouter.get("/onBoarding",authMiddleWare,authorizeRoles("company"),onBoardingPage)
companyRouter.post("/",createCompany)
companyRouter.post("/login",logIn)
companyRouter.put("/",authMiddleWare,authorizeRoles("company"),upload.single("image"),updateCompany)
companyRouter.delete("/",authMiddleWare,authorizeRoles("company"),deleteCompany)
companyRouter.get("/followers",authMiddleWare,authorizeRoles("company"),getCompanyFollowers)

export default companyRouter