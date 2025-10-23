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
import passport from "passport"
import notificationRouter from "./Routes/NotificationRoute.js"
import { Server } from "socket.io"
import { createServer } from "http"
import geminiRouter from "./Routes/GeminiRoute.js"

const app = express()

const server = createServer(app)

export const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000"
    }
})

const userSockets = new Map();

io.on("connection", (socket) => {

  socket.on("register-user", (userId) => {
    userSockets.set(userId, socket.id);
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of userSockets.entries()) {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        break;
      }
    }
  });
});
dotenv.config()

const PORT = process.env.PORT || 4000
//middlewares
app.use(express.json())
app.use(passport.initialize())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(express.urlencoded());
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
app.use("/api/notifications",notificationRouter)
app.use("/api/gemini",geminiRouter)
//error handling
app.use(errorHandler)

server.listen(PORT,async () =>
{
    console.log(`server is up and running on port http://localhost:${PORT}`)
})