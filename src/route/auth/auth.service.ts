import { Response } from "express";
import { SigninDto, SignupDto } from "./dto";
import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";

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
		res.json({ user });
	} catch (e) {
		console.log(e);
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
		console.log(e);
	}
};

export const authService = {
	signup,
	signin,
};
