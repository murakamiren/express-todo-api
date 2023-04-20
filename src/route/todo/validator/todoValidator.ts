import { z } from "zod";
import { CreateTodoDto, UpdateTodoDto } from "../dto";
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

const updateTodoSchema = z
	.object({
		id: z.number({ required_error: "id is required" }).nonnegative("id must not be negative"),
		title: z
			.string({ required_error: "title is required" })
			.nonempty("title is required")
			.max(16, { message: "title must be at most 16 characters" }),
		desc: z.string().optional(),
	})
	.strict() satisfies z.ZodType<UpdateTodoDto>;

export const createTodoValidator = async (dto: CreateTodoDto) => {
	const result = await zodValidatior<CreateTodoDto>(dto, createTodoSchema);

	return result;
};

export const updateTodoValidator = async (dto: UpdateTodoDto) => {
	const result = await zodValidatior<UpdateTodoDto>(dto, updateTodoSchema);

	return result;
};
