import { Request, Response, Router } from "express";
import { todoService } from "./todo.service";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	//get todo list
	todoService.getTodoList(res, req.payload.id);
});

router.post("/", (req: Request, res: Response) => {
	//create todo list
	todoService.createTodo(req, res, req.payload.id);
});

export default router;
