import express from "express";
import {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

router
  .post("/register", register)
  .post("/login", login)
  .post("/verify-otp", verifyOtp)
  .post("/forgot-password", forgotPassword)
  .post("/reset-password", resetPassword);

export default router;
