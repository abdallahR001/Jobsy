import { Router } from "express";
import { createCompany, dashBoard, deleteCompany, getAllApplicants, getCompany, getCompanyFollowers, googleCallBack, logIn, logout, onBoardingPage, updateCompany } from "../Controllers/companyController.js";
import { authMiddleWare } from "../MiddleWares/AuthMiddleWare.js";
import { authorizeRoles } from "../MiddleWares/AuthorizationMiddleWare.js";
import multer from "multer";
import path from "path"
import fs from "fs";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../prisma/prismaClient.js";

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

// google auth
passport.use(
    "google-company",
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:4000/api/companies/google/callback",
        },
        async (accessToken, refreshToken,profile,done) =>
        {
            try {
                const email = profile.emails[0].value
                const name = profile.name.givenName;
                const image = profile.photos[0].value;    

                let company = await prisma.company.findUnique({
                    where:{email}
                })

                if(!company)
                {
                    company = await prisma.company.create({
                        data:{
                            email:email,
                            name,
                            image,
                            hasSeenOnboarding:false,
                        }
                    })
                }

                if(company)
                    return done(null,company)
            } 
            catch (error) {
                return done(error,null)
            }
        }
    )
)

const upload = multer({storage})

companyRouter.get("/google",passport.authenticate("google-company",{scope:["profile","email"]}))
companyRouter.get("/google/callback",passport.authenticate("google-company",{failureRedirect:"http://localhost:3000/login/employer",session:false}),googleCallBack)
companyRouter.get("/",authMiddleWare,authorizeRoles("company","user"),getCompany)
companyRouter.get("/applicants",authMiddleWare,authorizeRoles("company"),getAllApplicants)
companyRouter.get("/dashboard",authMiddleWare,authorizeRoles("company"),dashBoard)
companyRouter.get("/onBoarding",authMiddleWare,authorizeRoles("company"),onBoardingPage)
companyRouter.post("/",createCompany)
companyRouter.post("/login",logIn)
companyRouter.put("/",authMiddleWare,authorizeRoles("company"),upload.single("image"),updateCompany)
companyRouter.delete("/",authMiddleWare,authorizeRoles("company"),deleteCompany)
companyRouter.get("/followers",authMiddleWare,authorizeRoles("company"),getCompanyFollowers)
companyRouter.get("/logout",authMiddleWare,authorizeRoles("company"),logout)

export default companyRouter