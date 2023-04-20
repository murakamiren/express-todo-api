import { PrismaClient, User } from "@prisma/client";
import { NextFunction, Response } from "express";
import { exclude } from "../../util/exclude";

const prisma = new PrismaClient();

const getUser = async (res: Response, userId: number, next: NextFunction) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (user) {
			const formatUser = exclude<User, keyof User>(user, ["password"]);
			res.json({ formatUser });
		}
	} catch (e) {
		next(e);
	}
};

const getUserWithTodo = async (res: Response, userId: number, next: NextFunction) => {
	try {
		const userWithTodo = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				todos: true,
			},
		});

		res.json({ userWithTodo });
	} catch (e) {
		next(e);
	}
};

export const userService = {
	getUser,
	getUserWithTodo,
};
