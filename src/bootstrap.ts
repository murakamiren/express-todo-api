import express from "express";
import authRouter from "./route/auth/auth.controller";
import userRouter from "./route/user/user.controller";

export const app = express();
const Port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/user", userRouter);

export const bootstrap = () => {
	try {
		app.listen(Port, () => {
			console.log(`server running at Port:${Port}`);
		});
	} catch (e) {
		console.log(e);
	}
};
