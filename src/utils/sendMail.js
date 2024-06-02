import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import env from "./env.js";
import logger from "./logger.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const forgotEmail = async (user = {}, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: env.EMAIL_SERVICE,
      secure: true,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
      },
    });

    const options = {
      viewEngine: {
        partialsDir: path.resolve(__dirname, "../utils/template"),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "../utils/template"),
    };

    transporter.use("compile", hbs(options));

    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: user.email,
      template: "forgot_email",
      subject: "Password Reset Email",
      context: {
        name: user.user_name,
        otp: otp,
      },
    });
  } catch (error) {
    logger.error(`An error occured while sending forgot password mail: ${error}`);
    throw new Error(`Error sending mail`);
  }
};

const resetEmail = async (user = {}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: env.EMAIL_SERVICE,
      secure: true,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
      },
    });

    const options = {
      viewEngine: {
        partialsDir: path.resolve(__dirname, "../utils/template"),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "../utils/template"),
    };

    transporter.use("compile", hbs(options));

    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: user.email,
      template: "reset_email",
      subject: "Password Reset Successful",
      context: {
        name: user.user_name,
      },
    });
  } catch (error) {
    logger.error(`An error occured while reset success mail: ${error}`);
    throw new Error(`Error sending mail`);
  }
};

const registerEmail = async (user = {}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: env.EMAIL_SERVICE,
      secure: true,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
      },
    });

    const options = {
      viewEngine: {
        partialsDir: path.resolve(__dirname, "../utils/template"),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "../utils/template"),
    };

    transporter.use("compile", hbs(options));

    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: user.email,
      template: "register_email",
      subject: "Welcome, Aboard!",
      context: {
        name: user.userName,
      },
    });
  } catch (error) {
    logger.error(`An error occured while sending mail: ${error}`);
    throw new Error(`Error sending mail`);
  }
};

const loginEmail = async (user = {}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: env.EMAIL_SERVICE,
      secure: true,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
      },
    });

    const options = {
      viewEngine: {
        partialsDir: path.resolve(__dirname, "../utils/template"),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "../utils/template"),
    };

    transporter.use("compile", hbs(options));

    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: user.email,
      template: "login_email",
      subject: "You just logged in!",
      context: {
        name: user.user_name,
      },
    });
  } catch (error) {
    logger.error(`An error occured while sending mail: ${error}`);
    throw new Error(`Error sending mail`);
  }
};

export { forgotEmail, registerEmail, loginEmail, resetEmail };
