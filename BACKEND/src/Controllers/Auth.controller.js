import crypto from "crypto";
import nodemailer from "nodemailer";
import { User } from "../Models/User.model.js";
import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

/* =========================================================
   FORGOT PASSWORD
========================================================= */
const forgotPassword = AsyncHandler(async (req, res) => {
  const { EmailId } = req.body;

  if (!EmailId) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({
    EmailId: EmailId.toLowerCase().trim(),
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // 🔐 Generate reset token (raw)
  const resetToken = user.generatePasswordResetToken();

  // Save hashed token + expiry
  await user.save({ validateBeforeSave: false });

  // 🔗 Frontend reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  // 📩 Email body
  const message = `
Hello ${user.Name},

You requested to reset your KishanSetu account password.

Click the link below to reset your password:
${resetUrl}

This link will expire in 10 minutes.

If you did not request this, please ignore this email.

Thanks,
KishanSetu Support Team
`;

  // 📬 Nodemailer (Gmail SMTP)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // app password (NO SPACES)
    },
  });

  try {
    await transporter.sendMail({
      from: `"KishanSetu Support" <${process.env.EMAIL_USER}>`,
      to: user.EmailId,
      subject: "Reset Your Password - KishanSetu",
      text: message,
    });

    return res.status(200).json(
      new ApiResponse(200, {}, "Reset password link sent to email ✅")
    );
  } catch (error) {
    // ❌ Cleanup if email fails
    user.ResetPasswordToken = undefined;
    user.ResetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    console.error("EMAIL ERROR:", error);

    throw new ApiError(500, "Email sending failed");
  }
});

/* =========================================================
   RESET PASSWORD
========================================================= */
const resetPassword = AsyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    throw new ApiError(400, "Both password fields are required");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  // 🔐 Hash incoming token
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    ResetPasswordToken: hashedToken,
    ResetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired reset token");
  }

  // 🔑 Update password
  user.Password = newPassword;

  // 🧹 Clear reset fields
  user.ResetPasswordToken = undefined;
  user.ResetPasswordExpire = undefined;

  await user.save();

  return res.status(200).json(
    new ApiResponse(200, {}, "Password reset successful ✅")
  );
});

/* =========================================================
   GET CURRENT USER (OPTIONAL)
========================================================= */
const getCurrentUser = AsyncHandler(async (req, res) => {
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

export { forgotPassword, resetPassword, getCurrentUser };
