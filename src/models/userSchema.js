import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Minimum length must be 3"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Minimum length must be 8"],
    validate: {
      validator(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password must not contain "password"');
        }
      },
    },
  },
  otp: {
    type: String,
    expires: 3600
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
  }, { timestamps: true });

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSaltSync(14);
  const pass = await bcrypt.hash(this.password, salt);
  this.password = pass;
  next();
});

const User = mongoose.model("Users", UserSchema);

export default User;