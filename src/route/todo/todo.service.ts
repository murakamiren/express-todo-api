import { PrismaClient } from "@prisma/client";
import { NextFunction, Response } from "express";
import { CreateTodoDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { prismaErrorException } from "../../exception/prismaErrorException";
import { createTodoValidator } from "./validator/todoValidator";

const prisma = new PrismaClient();

const getTodoList = async (res: Response, userId: number, next: NextFunction) => {
	try {
		const todoList = await prisma.todo.findMany({
			where: {
				userId,
			},
		});

		res.json({ todoList });
	} catch (e) {
		next(e);
	}
};

const createTodo = async (res: Response, dto: CreateTodoDto, userId: number, next: NextFunction) => {
	try {
		await createTodoValidator(dto);

		const todo = await prisma.todo.create({
			data: {
				title: dto.title,
				desc: dto.desc,
				userId,
			},
		});

		res.json({ todo });
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError) {
			const prismaError = prismaErrorException(e.code);
			next(prismaError);
		} else {
			next(e);
		}
	}
};

export const todoService = {
	getTodoList,
	createTodo,
};
