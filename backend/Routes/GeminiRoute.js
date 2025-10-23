import { Router } from "express";
import { authMiddleWare } from "../MiddleWares/AuthMiddleWare.js";
import { authorizeRoles } from "../MiddleWares/AuthorizationMiddleWare.js";
import { GenerateResume } from "../Controllers/geminiController.js";

const geminiRouter = Router()

geminiRouter.post("/",authMiddleWare,authorizeRoles("user"),GenerateResume)

export default geminiRouter