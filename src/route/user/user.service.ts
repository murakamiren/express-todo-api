import { PrismaClient } from "@prisma/client";
import { Response } from "express";

const prisma = new PrismaClient();

const getUser = async (res: Response, userId: number) => {
	const user = prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	res.json({ user });
};

export const userService = {
	getUser,
};
