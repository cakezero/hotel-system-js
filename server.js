import express from "express";
import cors from "cors";
import helmet from "helmet";
import adminRoutes from "./src/routes/adminRoutes.js";
import hotelRoutes from "./src/routes/hotelRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import logger from "./src/config/logger.js";
import ConnectDB from "./src/config/db.js";
import env from "./src/utils/env.js";
import { isAdmin, checkUser } from "./src/middlewares/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// User Routes
app.use("/api/v1", userRoutes);

// Hotel Routes
app.use("/api/v2", checkUser, hotelRoutes);

// Admin Routes
app.use("/api/v3", isAdmin, adminRoutes);

app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
  ConnectDB();
});
