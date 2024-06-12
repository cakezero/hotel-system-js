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
    logger.error(
      `An error occured while sending forgot password mail: ${error}`
    );
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
      subject: "You Just Logged In!",
      context: {
        name: user.user_name,
      },
    });
  } catch (error) {
    logger.error(`An error occured while sending mail: ${error}`);
    throw new Error(`Error sending mail`);
  }
};

const verifyEmail = async (user = {}, otp) => {
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
      template: "verify_email",
      subject: "Confirm Your Email Address",
      context: {
        name: user.user_name,
        otp: otp,
      },
    });
  } catch (error) {
    logger.error(`An error occured while sending mail: ${error}`);
    throw new Error(`Error sending mail`);
  }
};

const deleteAdminEmail = async (user = {}, admin = {}) => {
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
      template: "delete_admin",
      subject: "You Just Deleted An Admin!",
      context: {
        name: user.user_name,
        admin: admin.user_name,
        email: admin.email,
      },
    });
  } catch (error) {
    logger.error(`An error occured while sending mail: ${error}`);
    throw new Error(`Error sending mail`);
  }
};

const confirmAdminDelete = async (user = {}, admin = {}, otp) => {
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
      template: "otp_admin",
      subject: "You Want To Delete An Admin",
      context: {
        name: user.user_name,
        admin: admin.user_name,
        email: admin.email,
        otp: otp,
      },
    });
  } catch (error) {
    logger.error(`An error occured while sending mail: ${error}`);
    throw new Error(`Error sending mail`);
  }
};

const deleteUser = async (admin = {}, user = {}) => {
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
      to: admin.email,
      template: "delete_user",
      subject: "You Deleted A User",
      context: {
        admin: admin.user_name,
        user: user.user_name,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error(`An error occured while sending mail: ${error}`);
    throw new Error(`Error sending mail`);
  }
};

const sendVerificationSuccessEmail = async (user = {}) => {
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
      template: "verification_success",
      subject: "You Have Successfully Verifed Your Email",
      context: {
        user: user.user_name,
      },
    });
  } catch (error) {
    logger.error(`An error occured while sending mail: ${error}`);
    throw new Error(`Error sending mail`);
  }
};

const adminSuccessEmail = async (user = {}, admin = {}) => {
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
      template: "admin_success",
      subject: "You Have Been Made An Admin",
      context: {
        user: user.user_name,
        admin: admin.user_name
      },
    });
  } catch (error) {
    logger.error(`An error occured while sending mail: ${error}`);
    throw new Error(`Error sending mail`);
  }
}

const adminSuccessSendEmail = async (user = {}, admin = {}) => {
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
      template: "admin_success_send",
      subject: "You Have Made A User An Admin",
      context: {
        user: user.user_name,
        admin: admin.user_name,
        email: admin.email
      },
    });
  } catch (error) {
    logger.error(`An error occured while sending mail: ${error}`);
    throw new Error(`Error sending mail`);
  }
};

const sendHotelRequest = async (user = {}, hotel = {}, admins = {}) => {
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

    admins.forEach(async (admin) => {
      
      await transporter.sendMail({
        from: env.EMAIL_USER,
        to: user.email,
        template: "hotel_request",
        subject: "Add Hotel Request",
        context: {
          user: user.user_name,
          hotel: hotel.user_name,
          email: user.email,
          hotel: hotel.rooms,
          admin: admin.user_name
        },
      });
    })
    
  } catch (error) {
    logger.error(`An error occured while sending mail: ${error}`);
    throw new Error(`Error sending mail`);
  }
}

export {
  forgotEmail,
  registerEmail,
  loginEmail,
  resetEmail,
  deleteUser,
  verifyEmail,
  deleteAdminEmail,
  confirmAdminDelete,
  sendVerificationSuccessEmail,
  adminSuccessSendEmail,
  adminSuccessEmail,
  sendHotelRequest
};
