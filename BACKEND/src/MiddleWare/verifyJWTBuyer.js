import jwt from "jsonwebtoken"
import { ApiError } from "../Utils/ApiError";
import { AsyncHandler } from "../Utils/AsyncHandler";

const verifyJWTBuyer=AsyncHandler(async(req ,res ,next)=>{
   try{
    const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

   if(!token) throw new ApiError(401,"unauthorized request");

   const decodedtoken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

   const buyer=await User.findById(decodedtoken?._id).select("-Password -refreshToken");

    if(!user){
        throw new ApiError(401,"invalid access token");
    }
    req.user=user;
    next();
   }
   catch(error){
    throw new ApiError(401,error?.message || "token verification failed")
   }
})
export {verifyJWTBuyer}