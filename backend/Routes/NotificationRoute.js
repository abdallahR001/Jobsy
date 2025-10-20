import { Router } from "express";
import { authMiddleWare } from "../MiddleWares/AuthMiddleWare.js";
import { authorizeRoles } from "../MiddleWares/AuthorizationMiddleWare.js";
import { createNotification, getAllNotifications, getNotification } from "../Controllers/notificationController.js";
import { userMiddleWare } from "../MiddleWares/UserMiddleWare.js";

const notificationRouter = Router()

notificationRouter.post("/",authMiddleWare,authorizeRoles("company"),createNotification)
notificationRouter.get("/",authMiddleWare,authorizeRoles("user"),getAllNotifications)
notificationRouter.get("/:notificationId",authMiddleWare,authorizeRoles("user"),getNotification)

export default notificationRouter