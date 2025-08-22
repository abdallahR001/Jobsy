import { Router } from "express";
import { createAdmin } from "../Controllers/adminController.js";

const adminRouter = Router()

adminRouter.post("/",createAdmin)

export default adminRouter