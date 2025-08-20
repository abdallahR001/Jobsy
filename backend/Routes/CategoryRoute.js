import { Router } from "express";
import { CreateCategory, deleteCategory, updateCategory } from "../Controllers/CategoryController.js";
import { authMiddleWare } from "../MiddleWares/AuthMiddleWare.js" 
import { authorizeRoles } from "../MiddleWares/AuthorizationMiddleWare.js" 
const categoryRouter = Router()

categoryRouter.get("/", /*i will make a GET function for all categories later because i forgot to ;p*/ )
categoryRouter.get("/:id", /*i will make a GET function for categories later because i forgot to ;p*/ )
categoryRouter.post("/",authMiddleWare,authorizeRoles("admin"),CreateCategory)
categoryRouter.put("/:id",authMiddleWare,authorizeRoles("admin"),updateCategory)
categoryRouter.delete("/:id",authMiddleWare,authorizeRoles("admin"),deleteCategory)