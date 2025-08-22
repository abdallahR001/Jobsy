import { Router } from "express";
import { authMiddleWare} from "../MiddleWares/AuthMiddleWare.js"
import { authorizeRoles} from "../MiddleWares/AuthorizationMiddleWare.js"
import { getSkills , addSkill, updateSkill, deleteSkill} from "../Controllers/skillController";
const skillRouter = Router()

skillRouter.get("/:categoryId",authMiddleWare,authorizeRoles("company","admin"),getSkills)
skillRouter.post("/",authMiddleWare,authorizeRoles("admin"),addSkill)
skillRouter.put("/",authMiddleWare,authorizeRoles("roles"),updateSkill)
skillRouter.delete("/",authMiddleWare,authorizeRoles("admin"),deleteSkill)
