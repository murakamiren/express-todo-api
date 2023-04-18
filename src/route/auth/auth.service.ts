import { NextFunction, Response } from "express";
import { SigninDto, SignupDto } from "./dto";
import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";
import jwt, { SignOptions } from "jsonwebtoken";
import { HttpException } from "../../exception/httpException";
import { signinValidator } from "./validator";

const prisma = new PrismaClient();

const signup = async (res: Response, dto: SignupDto) => {
	try {
		const hashedPassword = await argon2.hash(dto.password);

		const user = await prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password: hashedPassword,
			},
		});

		const payload = {
			id: user.id,
			name: user.name,
			email: user.email,
		};

		const option: SignOptions = {
			algorithm: "HS256",
			expiresIn: "1h",
		};

		const token = jwt.sign(payload, "super-secret", option);
		res.json({ user, token: token });
	} catch (e) {
		if (e instanceof Error) {
			console.log(e.message);
			res.status(403).json({ message: e.message });
		}
	}
};

const signin = async (res: Response, next: NextFunction, dto: SigninDto) => {
	try {
		const validatedDto = await signinValidator(dto);

		const user = await prisma.user.findUnique({
			where: { email: validatedDto?.email },
		});

		if (user == null) throw new HttpException(400, "invalid email");

		const verifyPassword = await argon2.verify(user.password, dto.password);

		if (!verifyPassword) throw new HttpException(400, "invalid password");

		res.json({ user });
	} catch (e) {
		next(e);
	}
};

export const authService = {
	signup,
	signin,
};
