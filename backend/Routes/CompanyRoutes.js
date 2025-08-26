import { Router } from "express";
import { createCompany, deleteCompany, getCompany, getCompanyFollowers, logIn, updateCompany } from "../Controllers/companyController.js";
import { authMiddleWare } from "../MiddleWares/AuthMiddleWare.js";
import { authorizeRoles } from "../MiddleWares/AuthorizationMiddleWare.js";

const companyRouter = Router()

companyRouter.get("/",authMiddleWare,getCompany)
companyRouter.post("/",createCompany)
companyRouter.post("/login",logIn)
companyRouter.put("/",authMiddleWare,updateCompany)
companyRouter.delete("/",authMiddleWare,deleteCompany)
companyRouter.get("/followers",authMiddleWare,authorizeRoles("company"),getCompanyFollowers)

export default companyRouter