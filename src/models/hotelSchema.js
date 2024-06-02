import mongoose from "mongoose";


const HotelSchema = new mongoose.Schema({
  hotel_name: {
    type: String,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  filled: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

const Hotel = mongoose.model("Hotels", HotelSchema);

export default Hotel;
