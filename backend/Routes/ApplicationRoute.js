import { Router } from "express";
import { authMiddleWare } from "../MiddleWares/AuthMiddleWare.js";
import { authorizeRoles } from "../MiddleWares/AuthorizationMiddleWare.js"
import { AcceptApplication, CreateApplication, GetApplicationsByJob, GetUserApplications, RejectApplication, ToggleApplicationSeen } from "../Controllers/applicationController.js";

const applicationRoute = Router()

applicationRoute.post("/:jobId",authMiddleWare,authorizeRoles("user"), CreateApplication)
applicationRoute.get("/:jobId",authMiddleWare, authorizeRoles("company"), GetApplicationsByJob)
applicationRoute.get("/my-applications",authMiddleWare,authorizeRoles("user"), GetUserApplications)
applicationRoute.put("/see/:applicationId",authMiddleWare,authorizeRoles("company"), ToggleApplicationSeen)
applicationRoute.put("/accept/applicationId",authMiddleWare,authorizeRoles, AcceptApplication)
applicationRoute.put("/reject/applicationId",authMiddleWare,authorizeRoles("company"), RejectApplication)

export default applicationRoute