import express from "express";
import { hotels, hotel } from "../controllers/hotelController.js";

const router = express.Router();

router
  .get("/hotels", hotels)
  .get("/hotel/:hotel/", hotel);
// .get('/hotel/:hotel/:room_number')

export default router;
