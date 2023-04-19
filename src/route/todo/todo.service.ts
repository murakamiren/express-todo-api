import { Request, Response } from "express";

const getTodoList = async (res: Response, userId: number) => {
	//TODO: get TodoList from prisma to use userId
};

const createTodo = async (req: Request, res: Response, userID: number) => {
	//TODO: create Todo
};

export const todoService = {
	getTodoList,
	createTodo,
};
