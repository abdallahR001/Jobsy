import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./Routes/UserRoutes.js"
import { errorHandler } from "./MiddleWares/ErrorHandling/ErrorHandlerMiddleWare.js"
import companyRouter from "./Routes/CompanyRoutes.js"
import JobRouter from "./Routes/JobRoutes.js"
const app = express()
dotenv.config()

const PORT = process.env.PORT || 4000
//middlewares
app.use(express.json())
app.use(cors())


//routes
app.use("/api/users",userRouter)
app.use("/api/company",companyRouter)
app.use("/api/jobs",JobRouter)
//error handling
app.use(errorHandler)


app.listen(PORT,async () =>
{
    console.log(`server is up and running on port http://localhost:${PORT}`)
})