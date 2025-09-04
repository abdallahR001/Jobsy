import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./Routes/UserRoutes.js"
import { errorHandler } from "./MiddleWares/ErrorHandling/ErrorHandlerMiddleWare.js"
import companyRouter from "./Routes/CompanyRoutes.js"
import jobRouter from "./Routes/JobRoutes.js"
import categoryRouter from "./Routes/CategoryRoute.js"
import path from "path"
import skillRouter from "./Routes/SkillRoute.js"
import adminRouter from "./Routes/AdminRoute.js"
import applicationRoute from "./Routes/ApplicationRoute.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 4000
//middlewares
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(cookieParser())

//routes
app.use("/api/users",userRouter)
app.use("/api/companies",companyRouter)
app.use("/api/jobs",jobRouter)
app.use("/api/categories",categoryRouter)
app.use("/api/skills",skillRouter)
app.use("/api/admins",adminRouter)
app.use("/api/applications",applicationRoute)

//error handling
app.use(errorHandler)

app.listen(PORT,async () =>
{
    console.log(`server is up and running on port http://localhost:${PORT}`)
})