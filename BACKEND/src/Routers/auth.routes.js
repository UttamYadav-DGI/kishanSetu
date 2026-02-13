import { Router } from "express";
import { verifyJWT } from '../MiddleWare/Auth.middleware.js'
import { getCurrentUser,forgotPassword, resetPassword } from "../Controllers/Auth.controller.js";

const router = Router();

// ✅ This route checks login session
router.get("/me", verifyJWT, getCurrentUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


export default router;
