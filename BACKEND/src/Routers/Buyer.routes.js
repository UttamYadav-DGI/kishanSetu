import express, { Router } from "express"
import { buyerDashboard } from "../Controllers/Buyer.controller.js";

const router=Router();

router.route("/dashboard").post(buyerDashboard)



export default router;