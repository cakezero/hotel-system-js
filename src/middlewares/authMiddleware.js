import httpStatus from "http-status";
import logger from "../config/logger";
import User from "../models/userSchema";
import JWT from "../utils/jwt";

const getUser = async (token) => {
  try {
    const { email } = await JWT.verify(token);

    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    logger.error(`Error getting user: ${error}`);
    throw new Error("Invalid or expired token");
  }
};

const isAdmin = (req, res, next) => {
  try {
    const user = req.user;
    if (user?.role === "user")
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ error: "You are not authorized to perform this action!" });
    next();
  } catch (error) {
    logger.error(`Error checking for admin status: ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

const checkUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: "Unauthorized. Authentication Header not set" });
    
    const token = authHeader.split(" ")[1];
    if (!token)
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: "Unauthorized. Authentication Token not set" });

    const decodedToken = await JWT.verify(token);
    const { user } = decodedToken;

    req.user = user;
    next();
  } catch (error) {
    logger.error(`Error in Authentication middleware: ${error}`);

    if (error.name === "TokenExpiredError") {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Token has expired" });
    }
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Invalid token" });
  }
};

export { isAdmin, getUser, checkUser };
