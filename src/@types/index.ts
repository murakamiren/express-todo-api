import { TokenPayload } from "../middleware/jwt.middleware";

declare global {
	namespace Express {
		export interface Request {
			payload?: TokenPayload;
		}
	}
}
