import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exception/httpException";

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
	const status = error.status || 500;
	const message = error.message || "something went wrong";

	console.log({ status, message });

	return res.status(error.status).send({ status, message });
};
