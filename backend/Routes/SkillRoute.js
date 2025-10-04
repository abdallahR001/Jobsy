import { Router } from "express";
import { authMiddleWare} from "../MiddleWares/AuthMiddleWare.js"
import { authorizeRoles} from "../MiddleWares/AuthorizationMiddleWare.js"
import { getSkills , addSkill, updateSkill, deleteSkill, defaultSkills, searchSkills, getUserSkills, deleteUserSkill, addSkillsToUser} from "../Controllers/skillController.js"
const skillRouter = Router()

skillRouter.get("/default",authMiddleWare,authorizeRoles("company","user"),defaultSkills)
skillRouter.get("/search",authMiddleWare,authorizeRoles("company","user"),searchSkills)
skillRouter.get("/userskills",authMiddleWare,authorizeRoles("user"),getUserSkills)
skillRouter.get("/:id",authMiddleWare,authorizeRoles("company","admin","user"),getSkills)
skillRouter.post("/",authMiddleWare,authorizeRoles("admin"),addSkill)
skillRouter.put("/add-user-skills",authMiddleWare,authorizeRoles("user"),addSkillsToUser)
skillRouter.put("/",authMiddleWare,authorizeRoles("roles"),updateSkill)
skillRouter.put("/delete-user-skill",authMiddleWare,authorizeRoles("user"),deleteUserSkill)
skillRouter.delete("/",authMiddleWare,authorizeRoles("admin"),deleteSkill)

export default skillRouter