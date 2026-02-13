import jwt from "jsonwebtoken";
import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { User } from "../Models/User.model.js";
import { ApiError } from "../Utils/ApiError.js";

export const verifyJWT = AsyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request: token missing");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }

  const user = await User.findById(decodedToken?._id).select(
    "-Password -RefreshToken"
  );

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  if (user.isBlocked) {
    throw new ApiError(403, "Your account has been blocked by admin");
  }

  req.user = user;
  next();
});

