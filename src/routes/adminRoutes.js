import express from "express";
import { add_hotel, delete_hotel } from '../controllers/adminController.js';

const router = express.Router();

router
  .post('/add-hotel', add_hotel)
  .delete('/delete-hotel', delete_hotel)

export default router;
