import express from "express";
import connectDB from "./DB/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use(
  cors({
    origin:[ process.env.CORS_ORIGIN,
      process.env.CORS_LOCAL_ORIGIN,
    ],
    credentials: true
  })
);

import userRouter from "./Routers/User.routes.js";
import farmerRouter from "./Routers/farmer.routes.js";
import cropRouter from "./Routers/crop.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/farmers", farmerRouter);
app.use("/api/v1/crops", cropRouter);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
  });
