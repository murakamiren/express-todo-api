import express from "express";
import { authorizationRouter, protectedRouter } from "./route";
import { errorMiddleware } from "./middleware/error.middleware";
import { PORT } from "./config/env";
import { logger } from "./middleware/logger.middleware";
import { verifyJwt } from "./middleware/jwt.middleware";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/", authorizationRouter);
app.use("/", verifyJwt, protectedRouter);

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
