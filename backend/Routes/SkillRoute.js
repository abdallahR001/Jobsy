import { Router } from "express";
import { authMiddleWare} from "../MiddleWares/AuthMiddleWare.js"
import { authorizeRoles} from "../MiddleWares/AuthorizationMiddleWare.js"
import { getSkills , addSkill, updateSkill, deleteSkill} from "../Controllers/skillController.js"
const skillRouter = Router()

skillRouter.get("/:id",authMiddleWare,authorizeRoles("company","admin"),getSkills)
skillRouter.post("/",authMiddleWare,authorizeRoles("admin"),addSkill)
skillRouter.put("/",authMiddleWare,authorizeRoles("roles"),updateSkill)
skillRouter.delete("/",authMiddleWare,authorizeRoles("admin"),deleteSkill)

export default skillRouter