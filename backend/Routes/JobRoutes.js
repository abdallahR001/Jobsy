import { Router } from "express";
import {authMiddleWare} from "../MiddleWares/AuthMiddleWare.js"
import { CreateJob } from "../Controllers/jobController.js";
const JobRouter = Router()

JobRouter.post("/",authMiddleWare,CreateJob)

export default JobRouter