import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env";
import { jwtOption } from "../config/jwt";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exception/httpException";

export type TokenPayload = {
	id: number;
	email: string;
};

export const signJwt = (payload: TokenPayload) => {
	const token = jwt.sign(payload, JWT_SECRET_KEY, jwtOption);

	return token;
};

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
	const bearerToken = req.headers["authorization"]?.split(" ")[1];

	if (bearerToken == undefined) throw new HttpException(401, "no authorization");

	jwt.verify(bearerToken, JWT_SECRET_KEY, (err, data) => {
		if (err) {
			throw new HttpException(403, err.message);
		}

		if (!data) throw new HttpException(403, "payload not found");

		const castData = data as TokenPayload;
		const payload: TokenPayload = { id: castData.id, email: castData.email };

		req.payload = payload;
		next();
	});
};
