import { ApiResponse } from "../Utils/ApiResponse.js";
import { AsyncHandler } from "../Utils/AsyncHandler.js";

export const getCurrentUser = AsyncHandler(async (req, res) => {
  // ✅ verifyJWT already attached user on req.user
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: req.user._id,
        role: req.user.role,
        Name: req.user.Name,
        EmailId: req.user.EmailId,
        PhoneNo: req.user.PhoneNo,
        Address: req.user.Address,
      },
      "Current user fetched successfully ✅"
    )
  );
});
