import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	const bearerToken = req.headers["authorization"]?.split(" ")[1];

	if (bearerToken == undefined) throw Error("no authorization");

	jwt.verify(bearerToken, "super-secret", (err, data) => {
		if (err) {
			return res.sendStatus(403).json({ msg: "no authorization" });
		} else {
			res.json({ msg: "success", payload: data });
		}
	});
});

export default router;
