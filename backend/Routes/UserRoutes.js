import { Router } from "express";
import { UpdateProfile, createAccount, DeleteProfile, GetProfile, logIn, FollowCompany, GetFollowedCompanies, SaveJob, GetSavedJobs, me, onBoardingPage, viewCompanyProfile, Logout, UploadPortfolioFile, DeletePortfolioFile, googleCallBack, AddSkill, GetUserField, ViewUserProfile } from "../Controllers/userController.js";
import { authMiddleWare } from "../MiddleWares/AuthMiddleWare.js";
import multer from "multer";
import { authorizeRoles } from "../MiddleWares/AuthorizationMiddleWare.js";
import path from "path"
import fs from "fs"
import { prisma } from "../prisma/prismaClient.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

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

// google auth
passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:4000/api/users/google/callback",
        },
        async (accessToken, refreshToken,profile,done) =>
        {
            try {
                const email = profile.emails[0].value
                const firstName = profile.name.givenName;
                const lastName = profile.name.familyName;
                const image = profile.photos[0].value;    

                let user = await prisma.user.findUnique({
                    where:{email}
                })

                if(!user)
                {
                    user = await prisma.user.create({
                        data:{
                            email,
                            first_name: firstName,
                            last_name: lastName,
                            image
                        }
                    })
                }
                return done(null,user)
            } 
            catch (error) {
                return done(error,null)
            }
        }
    )
)


userRouter.get("/google",passport.authenticate("google",{scope:["profile","email"]}))
userRouter.get("/google/callback",passport.authenticate("google",{failureRedirect:"http://localhost:3000/login/jobseeker",session:false}),googleCallBack)
userRouter.get("/profile",authMiddleWare,authorizeRoles("user","company"),GetProfile)
userRouter.get("/viewprofile/:userId",authMiddleWare,authorizeRoles("user","company"),ViewUserProfile)
userRouter.get("/field",authMiddleWare,authorizeRoles("user"),GetUserField)
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
userRouter.post("/add-skill",authMiddleWare,authorizeRoles("user"),AddSkill)
userRouter.post("/upload-file",authMiddleWare,authorizeRoles("user"),upload.single("file"),UploadPortfolioFile)
userRouter.delete("/delete-file/:fileId",authMiddleWare,authorizeRoles("user"),DeletePortfolioFile)
userRouter.get("/savedjobs",authMiddleWare,authorizeRoles("user"),GetSavedJobs)
userRouter.get("/logout",Logout)

export default userRouter