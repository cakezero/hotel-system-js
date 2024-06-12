import mongoose from "mongoose";

const removedUserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true
  },
}, { timestamps: true });

const removedEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
}, { timestamps: true });

const removedHotelSchema = new mongoose.Schema({
  hotel_name: {
    type: String,
    required: true
  },
}, { timestamps: true });

const removedUser = mongoose.model("Removed Usernames", removedUserSchema);

const removedEmail = mongoose.model("Removed Emails", removedEmailSchema);

const removedHotel = mongoose.model("Removed Hotels", removedHotelSchema);

export { removedUser, removedEmail, removedHotel };
