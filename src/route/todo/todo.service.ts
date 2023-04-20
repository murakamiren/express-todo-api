import { PrismaClient } from "@prisma/client";
import { NextFunction, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { prismaErrorException } from "../../exception/prismaErrorException";
import { createTodoValidator, updateTodoValidator } from "./validator";

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

const updateTodo = async (res: Response, dto: UpdateTodoDto, userId: number, next: NextFunction) => {
	try {
		await updateTodoValidator(dto);

		const updatedTodo = await prisma.todo.update({
			where: {
				id: dto.id,
			},
			data: {
				title: dto.title,
				desc: dto.desc,
			},
		});

		res.json({ updatedTodo });
	} catch (e) {
		next(e);
	}
};

export const todoService = {
	getTodoList,
	createTodo,
	updateTodo,
};
