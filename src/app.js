import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({                                // app.use is used when we have to configure the middlewares
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))    //extended ka mtlb hota h hum objects ke ander bhi objects de paate h mtlb hum aur level pe nested objects bna skte h
app.use(express.static("public"))
app.use(cookieParser())

//routes import

import userRouter from "./routes/user.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter)

//http://localhost:8000/api/v1/users/register

export {app}