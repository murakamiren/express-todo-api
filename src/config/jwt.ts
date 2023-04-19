import { SignOptions } from "jsonwebtoken";

export const jwtOption: SignOptions = {
	algorithm: "HS256",
	expiresIn: "1d",
} as const;
