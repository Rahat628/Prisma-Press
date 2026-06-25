import cookieParser from "cookie-parser";
import express, { type Application } from "express";
import cors from "cors";
import config from "./config"
import { UserRouter } from "./modules/users/users.route";

const app : Application = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: config.appUrl,
    credentials: true
}))


app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use("/api/users", UserRouter)

export default app