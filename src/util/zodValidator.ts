import { z } from "zod";
import { HttpException } from "../exception/httpException";

export const zodValidatior = async <T>(dto: T, schema: z.ZodType) => {
	try {
		const result = await schema.parseAsync(dto);

		return result;
	} catch (e) {
		if (e instanceof z.ZodError) {
			const { message } = e.issues[0];
			throw new HttpException(400, message);
		}
	}
};
