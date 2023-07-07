import express from "express";
import bodyParser from "body-parser";
import { refreshToken, userLogin, userLogout, userRegister } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register', bodyParser.json(), userRegister);
userRouter.post('/refresh_token', refreshToken);
userRouter.get('/logout', userLogout );
userRouter.post('/login', userLogin );

export default userRouter;
