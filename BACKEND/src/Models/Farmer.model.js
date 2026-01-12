
import mongoose from "mongoose";

const farmerSchema=new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    LandSize:{
        type:Number,
        required:true
    },
    CropGrown:{
        type:[String],
        default:[]
    },
    Experience:{
        type:Number,
        required:true
    },
    Location:{
        type:String
    },
    verified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
export const Farmer=mongoose.model("farmer",farmerSchema);