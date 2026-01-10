import express from 'express'
import connectDB from './DB/db.js';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
dotenv.config({ path: './env' });
  

const app=express();

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);






import userRouter from './Routers/User.routes.js';

app.use("/api/v1/users",userRouter)







// server connection after db connected successfully
connectDB()
.then(()=>{
    app.listen((process.env.PORT || 3000),()=>{
        console.log(`server is running at port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("something went wrong while server is connected",error);
})

