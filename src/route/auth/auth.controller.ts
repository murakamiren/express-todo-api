import { NextFunction, Request, Response, Router } from "express";
import { authService } from "./auth.service";
import { SigninDto, SignupDto } from "./dto";

const router = Router();

router.post("/signup", (req: Request<SignupDto>, res: Response, next: NextFunction) => {
	authService.signup(res, req.body);
});

router.post("/signin", (req: Request<SigninDto>, res: Response, next: NextFunction) => {
	authService.signin(res, next, req.body);
});

export default router;
