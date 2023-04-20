import { NextFunction, Request, Response, Router } from "express";
import { todoService } from "./todo.service";
import { CreateTodoDto } from "./dto";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
	//get todo list
	todoService.getTodoList(res, req.payload.id, next);
});

router.post("/", (req: Request<CreateTodoDto>, res: Response, next: NextFunction) => {
	//create todo list
	todoService.createTodo(res, req.body, req.payload.id, next);
});

export default router;
