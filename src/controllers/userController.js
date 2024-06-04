import User from "../models/userSchema.js";
import logger from "../config/logger.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import {
  forgotEmail,
  registerEmail,
  loginEmail,
  resetEmail,
  verifyEmail,
  sendVerificationSuccessEmail,
} from "../utils/sendMail.js";
import { nanoid } from "nanoid";
import JWT from "../utils/jwt.js";
import {
  userValidationSchema,
  uLoginValidationSchema,
  loginValidationSchema,
  resetPasswordValidationSchema,
} from "../validation/authValidationSchema.js";
import isEmail from "validator/lib/isEmail.js";
import { getUser } from "../middlewares/authMiddleware.js";
import removedUser from "../models/removedSchema.js";

const register = async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body);

    if (error) {
      logger.error(`Register validation error: ${error.details[0].message}`);
      return res.status(httpStatus.BAD_REQUEST).json({ error });
    }

    const { user_name, email, password } = req.body;

    const emailRemoved = await removedUser.findOne({ email });
    if (emailRemoved)
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ error: "Email has been banned" });

    const userRemoved = await removedUser.findOne({ user_name });
    if (userRemoved)
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ error: "Username has been banned" });

    const registeredUser = await User.findOne(
      { $or: [{ email }, { user_name }] },
      { email: 1, user_name: 1 }
    );

    if (registeredUser) {
      if (registeredUser.email === email) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Email already exists" });
      } else {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Username has been taken" });
      }
    }

    const user = new User({ user_name, email, password });
    await user.save();

    const payload = { user };
    const token = await JWT.sign(payload);

    await registerEmail(user);

    return res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    logger.error(`Error during register: ${error}`);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: "Something went wrong!",
    });
  }
};

const login = async (req, res) => {
  const { auth, password } = req.body;

  if (isEmail(auth)) {
    const { error } = loginValidationSchema.validate(req.body);

    if (error) {
      logger.error(`Email Login validation error: ${error.details[0].message}`);
      return res.status(httpStatus.BAD_REQUEST).json({ error });
    }
  } else {
    const { error } = uLoginValidationSchema.validate(req.body);

    if (error) {
      logger.error(
        `Username Login validation error: ${error.details[0].message}`
      );
      return res.status(httpStatus.BAD_REQUEST).json({ error });
    }
  }

  try {
    const user = await User.findOne({
      $or: [{ email: auth }, { user_name: auth }],
    });

    if (!user)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Login credentials does not match or does not exist!" });

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Login credentials does not match or does not exist!" });

    const token = await JWT.sign(user);

    await loginEmail(user);

    return res.status(httpStatus.FOUND).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    logger.error(`Error during login: ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong!" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Email does not exist!" });

    const otp = nanoid(4);

    user.otp = otp;
    await user.save();

    await forgotEmail(user, otp);

    return res.status(httpStatus.OK).json({ message: "OTP has been sent!" });
  } catch (error) {
    logger.error(`Error during forgot password: ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  try {
    const user = await User.findOne({ otp });
    if (!user)
      return res.status(httpStatus.BAD_REQUEST).json({ error: "Invalid OTP!" });

    const resetToken = await JWT.sign(
      { email: user.email },
      { expiresIn: "30m" }
    );

    return res
      .status(httpStatus.OK)
      .json({ message: "OTP has been verified", resetToken });
  } catch (error) {
    logger.error(`Error during verify otp: ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong!" });
  }
};

const resetPassword = async (req, res) => {
  const { password, confirmPassword, resetToken } = req.body;

  const { error } = resetPasswordValidationSchema.validate(password);
  if (error) {
    logger.error(`Reset password error: ${error.details[0].message}`);
    return res.status(httpStatus.BAD_REQUEST).json({ error });
  }

  if (password !== confirmPassword)
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "Passwords do not match!" });

  try {
    const user = await getUser(resetToken);

    user.password = password;
    user.otp = null;

    await user.save();

    await resetEmail(user);
    return res
      .status(httpStatus.OK)
      .json({ message: "Password has been changed successfully!" });
  } catch (error) {
    logger.error(`Error resetting password: ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong!" });
  }
};

const VerifyEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "user does not exist" });
    const otp = nanoid(4);

    user.otp = otp;
    await user.save();

    await verifyEmail(user, otp);
    return res
      .status(httpStatus.OK)
      .json({ message: "Email verification otp sent" });
  } catch (error) {
    logger.error(`Error sending email verification: ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong!" });
  }
};

const validateEmail = async (req, res) => {
  const { otp } = req.body;

  try {
    const user = await User.findOne({ otp });
    if (!user)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "OTP is expired or incorrect" });

    user.confirmedEmail = true;
    user.otp = null;
    await user.save();

    await sendVerificationSuccessEmail(user);

    return res
      .status(httpStatus.OK)
      .json({ message: "email address has been verified" });
  } catch (error) {
    logger.error(`Error validating email: ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

export {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  VerifyEmail,
  validateEmail,
};
