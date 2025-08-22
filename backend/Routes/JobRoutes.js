import { Router } from "express";
import {authMiddleWare} from "../MiddleWares/AuthMiddleWare.js"
import { CreateJob } from "../Controllers/jobController.js";
const jobRouter = Router()

jobRouter.post("/",authMiddleWare,CreateJob)

export default jobRouter