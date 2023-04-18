import { Response } from "express";
import { SigninDto, SignupDto } from "./dto";
import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";
import jwt, { SignOptions } from "jsonwebtoken";

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

const signin = async (res: Response, dto: SigninDto) => {
	try {
		const user = await prisma.user.findUnique({
			where: { email: dto.email },
		});

		if (user == null) throw new Error("ユーザーが登録されていません");

		const verifyPassword = await argon2.verify(user.password, dto.password);

		if (!verifyPassword) throw new Error("パスワードが違います");

		res.json({ user });
	} catch (e) {
		if (e instanceof Error) {
			console.log(e.message);
			res.status(403).json({ message: e.message });
		}
	}
};

export const authService = {
	signup,
	signin,
};
