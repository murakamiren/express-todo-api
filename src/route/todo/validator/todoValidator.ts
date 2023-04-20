import { z } from "zod";
import { CreateTodoDto } from "../dto";
import { zodValidatior } from "../../../util/zodValidator";

const createTodoSchema = z
	.object({
		title: z
			.string({ required_error: "title is required" })
			.nonempty("title is required")
			.max(16, { message: "title must be at most 16 characters" }),
		desc: z.string().optional(),
	})
	.strict() satisfies z.ZodType<CreateTodoDto>;

export const createTodoValidator = async (dto: CreateTodoDto) => {
	const result = await zodValidatior<CreateTodoDto>(dto, createTodoSchema);

	return result;
};
