import { Router } from "express";
import { createAdmin, loginAsAdmin } from "../Controllers/adminController.js";

const adminRouter = Router()

adminRouter.post("/",createAdmin)
adminRouter.post("/login",loginAsAdmin)
export default adminRouter