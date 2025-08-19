import { Router } from "express";
import { UpdateProfile, createAccount, DeleteProfile, GetProfile, logIn } from "../Controllers/userController.js";
import { authMiddleWare } from "../MiddleWares/AuthMiddleWare.js";

const userRouter = Router()

userRouter.get("/profile",authMiddleWare,GetProfile)
userRouter.post("/signUp", createAccount)
userRouter.post("/signIn",logIn)
userRouter.put("/update-profile",authMiddleWare,UpdateProfile)
userRouter.delete("/delete",authMiddleWare,DeleteProfile)



export default userRouter