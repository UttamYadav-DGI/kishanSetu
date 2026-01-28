import { Router } from "express";
import { verifyJWT } from "../MiddleWare/Auth.middleware.js";
import { getCurrentUser } from "../Controllers/Auth.controller.js";

const router = Router();

// ✅ This route checks login session
router.get("/me", verifyJWT, getCurrentUser);

export default router;
