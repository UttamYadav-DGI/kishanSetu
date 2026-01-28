import { ApiError } from "../Utils/ApiError.js"

export const AllowRoles=(...roles)=>{
    return (req,res,next)=>{

        if(!req.user || !req.user.roles){
            throw new ApiError(401,"Access Denied: You are not allowed");
        }
        next();
    }
}
