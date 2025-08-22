import { Router } from "express";
import {CreateCategory, deleteCategory, updateCategory, getCategories, getCategory } from "../Controllers/CategoryController.js";
import { authMiddleWare } from "../MiddleWares/AuthMiddleWare.js" 
import { authorizeRoles } from "../MiddleWares/AuthorizationMiddleWare.js" 

const categoryRouter = Router()

categoryRouter.get("/",authMiddleWare,authorizeRoles("company","admin"),getCategories)
categoryRouter.get("/:id",authMiddleWare,authorizeRoles("company","admin"),getCategory)
categoryRouter.post("/",authMiddleWare,authMiddleWare,authorizeRoles("admin"),CreateCategory)
categoryRouter.put("/:id",authMiddleWare,authMiddleWare,authorizeRoles("admin"),updateCategory)
categoryRouter.delete("/:id",authMiddleWare,authMiddleWare,authorizeRoles("admin"),deleteCategory)

export default categoryRouter