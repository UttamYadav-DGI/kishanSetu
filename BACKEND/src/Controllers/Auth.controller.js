import crypto from "crypto";
import { User } from "../Models/User.model.js";
import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import nodemailer from "nodemailer";

// ✅ You can use nodemailer (or any email service)

const forgotPassword = AsyncHandler(async (req, res) => {
  const { EmailId } = req.body;

  if (!EmailId) throw new ApiError(400, "Email is required");

  const user = await User.findOne({ EmailId: EmailId.toLowerCase().trim() });

  if (!user) throw new ApiError(404, "User not found");

  // ✅ generate reset token
  const resetToken = user.generatePasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // ✅ reset password url (frontend page)
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  // ✅ email message
  const message = `
    Hello ${user.Name},

    You requested a password reset.
    Click the link to reset your password:
    ${resetUrl}

    This link is valid for 10 minutes.
  `;

  // ✅ nodemailer config (basic)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

try {
    await transporter.sendMail({
      from: `"KishanSetu Support" <${process.env.EMAIL_USER}>`,
      to: user.EmailId,
      subject: "Reset Your Password - KishanSetu",
      text: message,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Reset link sent to email ✅"));
  } catch (error) {
    user.ResetPasswordToken = undefined;
    user.ResetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    throw new ApiError(500, "Email sending failed");
  }
});






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


 const resetPassword = AsyncHandler(async (req, res) => {
  const { token } = req.params; // token from url
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    throw new ApiError(400, "Both password fields are required");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "Password and confirm password must be same");
  }

  // ✅ hash incoming token
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    ResetPasswordToken: hashedToken,
    ResetPasswordExpire: { $gt: Date.now() }, // not expired
  });

  if (!user) throw new ApiError(400, "Invalid or expired reset token");

  // ✅ update password
  user.Password = newPassword;

  // ✅ remove reset fields
  user.ResetPasswordToken = undefined;
  user.ResetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });


  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successful ✅"));
});

export {forgotPassword, resetPassword };