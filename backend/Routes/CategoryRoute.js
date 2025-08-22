import { Router } from "express";
import {CreateCategory, deleteCategory, updateCategory } from "../Controllers/CategoryController.js";
import { authMiddleWare } from "../MiddleWares/AuthMiddleWare.js" 
import { authorizeRoles } from "../MiddleWares/AuthorizationMiddleWare.js" 

const categoryRouter = Router()

categoryRouter.get("/",authMiddleWare,authorizeRoles("company","admin"),getCategories)
categoryRouter.get("/:id", /*i will make a GET function for categories later because i forgot to ;p*/ )
categoryRouter.post("/",authMiddleWare,authMiddleWare,authorizeRoles("admin"),CreateCategory)
categoryRouter.put("/:id",authMiddleWare,authMiddleWare,authorizeRoles("admin"),updateCategory)
categoryRouter.delete("/:id",authMiddleWare,authMiddleWare,authorizeRoles("admin"),deleteCategory)