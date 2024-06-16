import express from "express";
import {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  validateEmail,
} from "../controllers/userController.js";

const router = express.Router();

router
  .post("/register", register)
  .post("/login", login)
  .post("/verify-password-otp", verifyOtp)
  .post("/verify-email-otp", validateEmail)
  .post("/forgot-password", forgotPassword)
  .post("/reset-password", resetPassword);

export default router;
