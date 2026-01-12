import express from 'express'
import { verifyJWT } from '../MiddleWare/Auth.middleWare.js'
import { AddCrop } from '../Controllers/Crop.controller.js'

const router=express.Router()

router.use(verifyJWT)

router.route("/crops").post(AddCrop)
router.route("/crops").get(AddCrop)

export default router;