import { Router } from "express";
import { buyCrop } from "../Controllers/Order.controller.js";
import { getReceipt } from "../Controllers/Reciept.controller.js";
import { verifyJWT } from "../MiddleWare/Auth.middleware.js";
import { requireRole } from "../MiddleWare/Role.middleware.js";
import { getMyOrders } from "../Controllers/Order.controller.js";
const router = Router();

// router.post("/buy", verifyJWT, AllowRoles("buyer"), buyCrop);
// router.get("/receipt/:orderId", verifyJWT, AllowRoles("buyer"), getReceipt);
// router.get("/my-orders", verifyJWT, AllowRoles("buyer"), getMyOrders);


export default router;
