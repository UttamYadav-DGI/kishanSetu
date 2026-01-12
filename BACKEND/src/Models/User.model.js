import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const UserSchema=new mongoose.Schema({
    
        Name:{
            type:String,
            trim:true,
            lowercase:true,
            required:true
        },
        PhoneNo:{
            type:Number,
            required:true,
        },
        EmailId:{
            type:String,
            lowercase:true,
            required:true
        },
        Password:{
            type:String,
            required :true
        },
        Avatar:{
            type:String,
        },
        AccessToken:{
            type:String,
        },
        RefreshToken:{
            type:String,
        },
        Role:{
            type:String,
            enum:["farmer" | "buyer"],
            required:true,
            default:"farmer",

        }
}, {timestamps:true})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next;

    this.Password = await bcrypt.hash(this.Password, 10);
    next;
});


UserSchema.methods.isPasswordCorrect=async function(Password){
    return await bcrypt.compare(Password,this.Password);
}

UserSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id:this._id,
            EmailId:this.EmailId,
            PhoneNo:this.PhoneNo,
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

UserSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id:this._id,
            PhoneNo:this.PhoneNo
        },
        process.env.REFRESH_TOKEN,
        {
         expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User=mongoose.model("User",UserSchema);