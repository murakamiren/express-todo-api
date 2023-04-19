import { Request, Response, Router } from "express";
import { userService } from "./user.service";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	if (req.payload) userService.getUser(res, req.payload.id);
});

export default router;
