import { Router } from "express";
import { authMiddleWare } from "../MiddleWares/AuthMiddleWare.js"
import { authorizeRoles} from "../MiddleWares/AuthorizationMiddleWare.js"
import { CreateJob, DeleteAllJobs, DeleteJob, GetCompanyJobs, GetJob, GetJobsByCategory, GetSkillsJobs, SearchJobs } from "../Controllers/jobController.js";
import { searchMiddleWare } from "../MiddleWares/JobsMiddleWares/searchMiddleWare.js";

const jobRouter = Router()

jobRouter.get("/",authMiddleWare,authorizeRoles("user","admin"),GetSkillsJobs)
jobRouter.get("/search",searchMiddleWare,SearchJobs)
jobRouter.get("/category/:categoryId",authMiddleWare,authorizeRoles("user","admin"),GetJobsByCategory)
jobRouter.get("/companyjobs",authMiddleWare,authorizeRoles("company","user","admin"),GetCompanyJobs)
jobRouter.get("/:jobId",authMiddleWare,authorizeRoles("user","admin"),GetJob)
jobRouter.post("/",authMiddleWare,authorizeRoles("company"),CreateJob)
jobRouter.delete("/:jobId",authMiddleWare,authorizeRoles("company"),DeleteJob)
jobRouter.delete("/",authMiddleWare,authorizeRoles("company"),DeleteAllJobs)

export default jobRouter