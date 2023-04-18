import express from "express";
import authRouter from "./route/auth/auth.controller";
import userRouter from "./route/user/user.controller";
import { errorMiddleware } from "./middleware/error.middleware";
import { PORT } from "./config/env";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/user", userRouter);

app.use(errorMiddleware);

export const bootstrap = () => {
	try {
		app.listen(PORT, () => {
			console.log(`server running at Port:${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
};
