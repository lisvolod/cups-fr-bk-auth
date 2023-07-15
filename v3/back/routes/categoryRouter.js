import express from "express";
import cookieParser from "cookie-parser";
import { auth } from "../middleware/auth.js";
import { authAdmin } from "../middleware/authAdmin.js";
import { createAndEditCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();
const jsonParser = express.json();

categoryRouter.post('/', cookieParser(), auth, authAdmin, jsonParser, createAndEditCategory);

export default categoryRouter;