import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller";
import verifyJwt from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", verifyJwt, logoutUser);

export default userRouter;