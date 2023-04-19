import { Router } from "express";
import authRouter from "./auth/auth.controller";
import userRouter from "./user/user.controller";

export const authorizationRouter = Router();
export const protectedRouter = Router();

// not use jwt auth middleware
authorizationRouter.use("/auth", authRouter);

// protected routes
// protected routes use jwt guard middleware
protectedRouter.use("/user", userRouter);
