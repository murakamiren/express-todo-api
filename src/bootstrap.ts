import express from "express";
import authRouter from "./route/auth/auth.controller";

export const app = express();
const Port = 3000;

app.use(express.json());

app.use("/", authRouter);

export const bootstrap = () => {
	try {
		app.listen(Port, () => {
			console.log(`server running at Port:${Port}`);
		});
	} catch (e) {
		console.log(e);
	}
};
