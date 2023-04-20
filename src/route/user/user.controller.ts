import { NextFunction, Request, Response, Router } from "express";
import { userService } from "./user.service";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
	userService.getUser(res, req.payload.id, next);
});

router.get("/withTodo", (req: Request, res: Response, next: NextFunction) => {
	userService.getUserWithTodo(res, req.payload.id, next);
});

export default router;
