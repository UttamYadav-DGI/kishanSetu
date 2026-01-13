import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { set } from "mongoose";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Crop } from "../Models/Crop.model.js";

const AddCrop=AsyncHandler(async(req ,res )=>{
    const farmerId=req?.user._id;

    const {cropName,quantity,pricePerKg,location,availableFrom}=req.body;

    if(!cropName || !quantity || !pricePerKg || !location || !availableFrom ){
        throw new ApiError(403,"field are empty");
    }

    const crops=await Crop.findOneAndUpdate(
        {farmerId},
        {
            $set:{
                cropName,
                quantity,
                pricePerKg,
                location,
                availableFrom
            }
        },{
            new:true,
            upsert:true,
            runValidators: true
        }
    )

    return res.status(200).json(new ApiResponse(200,crops,"crop add successfully"));

});


export {AddCrop};