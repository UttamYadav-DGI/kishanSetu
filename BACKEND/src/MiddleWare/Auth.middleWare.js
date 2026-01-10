import jwt from "jsonwebtoken";
import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { User } from "../Models/User.model.js";
import { ApiError } from "../Utils/ApiError.js";

export const verifyJWT = AsyncHandler(async (req, res, next) => {
    const token = req?.cookies?.AccessToken || req.header("Authorization")?.split(" ")[1];
//     console.log("COOKIES 👉", req.cookies);
// console.log("AUTH HEADER 👉", req.headers.authorization);
// console.log("ALL HEADERS 👉", req.headers);

    // console.log("token",token);
    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN
        );
    } catch (err) {
        throw new ApiError(401, "Invalid or expired token");
    }

    const user = await User.findById(decodedToken?._id)
        .select("-password -refreshToken");

    if (!user) {
        throw new ApiError(401, "User not found");
    }

    req.user = user;
    next();
});
