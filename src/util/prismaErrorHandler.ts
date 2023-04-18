import { HttpException } from "../exception/httpException";

export const prismaErrorHandler = (code: string) => {
	switch (code) {
		case "P2002":
			return new HttpException(400, "this email is already registered");
		default:
			return new HttpException(500, "something went wrong with server");
	}
};
