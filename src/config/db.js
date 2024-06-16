import mongoose from "mongoose";
import logger from "./logger.js";
import env from "../utils/env.js";

mongoose.set('strictQuery', false);
export const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(env.DB_URI, {});
    logger.info(
      `\x1b[36m%s\x1b[0m`,
      `MongoDB Connected: ${conn.connection.host}`
    );
  } catch (error) {
    logger.error(
      `\x1b[31m%s\x1b[0m`,
      `MongoDB Connection Failure: ${error.message}`
    );
    process.exit(1);
  }
};

export default ConnectDB;
