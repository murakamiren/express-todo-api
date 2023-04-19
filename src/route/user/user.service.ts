import { PrismaClient, User } from "@prisma/client";
import { Response } from "express";
import { exclude } from "../../util/exculde";

const prisma = new PrismaClient();

const getUser = async (res: Response, userId: number) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (user) {
		const formatUser = exclude<User, keyof User>(user, ["password"]);
		res.json({ formatUser });
	}
};

export const userService = {
	getUser,
};
