import dotenv from "dotenv";

dotenv.config();

const env = {
  ENV: process.env.ENV,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
};

export default env;
