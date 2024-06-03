import express from "express";
import {
  add_hotel,
  delete_hotel,
  make_admin,
  remove_admin,
  delete_user,
} from "../controllers/adminController.js";

const router = express.Router();

router
  .post('/add-hotel', add_hotel)
  .post('/make-admin', make_admin)
  .delete('/delete-hotel/:hotel', delete_hotel)
  .post('/remove-admin/:admin', remove_admin)
  .delete('/delete-user/:user', delete_user)

export default router;
