import { Request, Response, Router } from "express";
import { authService } from "./auth.service";
import { SigninDto, SignupDto } from "./dto";

const router = Router();

router.post("/signup", (req: Request<SignupDto>, res: Response) => {
	authService.signup(res, req.body);
});

router.post("/signin", (req: Request<SigninDto>, res: Response) => {
	authService.signin(res, req.body);
});

export default router;
