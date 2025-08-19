import { Router } from "express";
import { createCompany, deleteCompany, getCompany, logIn, updateCompany } from "../Controllers/companyController.js";
import { authMiddleWare } from "../MiddleWares/AuthMiddleWare.js";

const companyRouter = Router()

companyRouter.get("/",authMiddleWare,getCompany)
companyRouter.post("/",createCompany)
companyRouter.post("/login",logIn)
companyRouter.put("/",authMiddleWare,updateCompany)
companyRouter.delete("/",authMiddleWare,deleteCompany)

export default companyRouter