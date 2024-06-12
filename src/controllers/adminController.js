import httpStatus from "http-status";
import logger from "../config/logger.js";
import Hotel from "../models/hotelSchema.js";
import User from "../models/userSchema.js";
import {
  adminSuccessSendEmail,
  confirmAdminDelete,
  deleteAdminEmail,
  deleteUser,
  adminSuccessEmail,
} from "../utils/sendMail.js";
import { nanoid } from "nanoid";
import { removedUser } from "../models/removedSchema.js";

const add_hotel = async (req, res) => {
  const { hotel_name } = req.body;

  try {
    const hotelExists = await Hotel.findOne({ hotel_name });

    if (hotelExists)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Hotel name already exists" });

    const newHotel = await new Hotel(req.body);

    await newHotel.save();

    return res
      .status(httpStatus.CREATED)
      .json({ message: "Hotel has been added" });
  } catch (error) {
    logger.error(`Error adding Hotel: ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong!" });
  }
};

const delete_hotel = async (req, res) => {
  const hotel_name = req.params.hotel;
  try {
    const hotelCheck = await Hotel.findOne({ hotel_name });
    if (!hotelCheck)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Hotel name doesn't exist" });
    
    await Hotel.findOneAndDelete({ hotel_name })

    return res
      .status(httpStatus.OK)
      .json({ message: "Hotel has been deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting Hotel: ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong!" });
  }
};

const make_admin = async (req, res) => {
  const { email } = req.body;
  const admin = req.user;

  try {
    const userExists = await User.findOne({ email });
    if (!userExists)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "User does not exist" });

    if (userExists.role === "admin")
      return res
        .status(httpStatus.NOT_MODIFIED)
        .json({ error: "User is already an admin" });

    userExists.role = "admin";

    await userExists.save();

    await adminSuccessEmail(userExists, admin);

    await adminSuccessSendEmail(admin, userExists);

    return res
      .status(httpStatus.OK)
      .json({ message: "User has been made an admin successfully" });
  } catch (error) {
    logger.error(`Error adding an admin: ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong!" });
  }
};

const remove_admin = async (req, res) => {
  const user_name = req.params.admin;

  try {
    const adminExists = await User.findOne({ user_name });
    if (!adminExists)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Admin does not exist" });

    if (adminExists.role === "user")
      return res
        .status(httpStatus.NOT_MODIFIED)
        .json({ error: "User is not an admin" });

    adminExists.role = "user";

    await adminExists.save();

    return res
      .status(httpStatus.OK)
      .json({ message: "User has been stripped of their admin status" });
  } catch (error) {
    logger.error(`Error removing user as an admin: ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong!" });
  }
};

const delete_user = async (req, res) => {
  const user = req.params.user;
  const admin = req.user;

  try {
    const userExists = await User.findOne({ user_name: user });
    if (!userExists)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "User does not exist" });

    if (userExists.role === "admin")
      return res
        .status(httpStatus.NOT_MODIFIED)
        .json({ error: "Admins cannot be deleted through this endpoint" });

    await User.findOneAndDelete({ user_name: user });

    await deleteUser(admin, userExists);

    return res
      .status(httpStatus.OK)
      .json({ message: "User has been deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting user: ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

const delete_admin = async (req, res) => {
  const user = req.params.admin;
  const admin = req.user;

  try {
    const userExists = await User.findOne({ user_name: user });
    if (!userExists)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Admin does not exist" });

    if (userExists.role === "user")
      return res
        .status(httpStatus.NOT_MODIFIED)
        .json({ error: "Only admins can be deleted through this endpoint" });

    const otp = nanoid(4);
    userExists.otp = otp;
    await userExists.save();

    await confirmAdminDelete(userExists, admin, otp);

    return res
      .status(httpStatus.OK)
      .json({ message: "Admin delete OTP has been sent" });
  } catch (error) {
    logger.error(
      `Error sending admin deletion OTP: ${error}`
    );
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

const confirmDeleteAdmin = async (req, res) => {
  const { otp } = req.body;
  const admin = req.user;

  try {
    const user = await User.findOne({ otp });
    if (!user)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Admin doesn't exist" });

    await User.findOneAndDelete({ otp });

    const R_User = new removedUser({
      email: user.email,
      user_name: user.user_name,
    });

    await R_User.save();

    await deleteAdminEmail(admin, user);

    return res
      .status(httpStatus.OK)
      .json({ message: "Admin has been successfully deleted!" });
  } catch (error) {
    logger.error(`Error deleting admin: ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong!" });
  }
};


export {
  add_hotel,
  delete_hotel,
  make_admin,
  remove_admin,
  delete_user,
  confirmDeleteAdmin,
  delete_admin,
};
