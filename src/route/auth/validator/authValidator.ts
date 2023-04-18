import { z } from "zod";
import { SigninDto, SignupDto } from "../dto";
import { zodValidatior } from "../../../util/zodValidator";

const signupRequestSchema = z.object({
	name: z
		.string({ required_error: "name is required" })
		.min(4, { message: "name must be at least 4 characters" })
		.max(16, { message: "name must be at most 16 characters" }),
	email: z.string({ required_error: "email is required" }).email("this is not email"),
	password: z
		.string({ required_error: "password is required" })
		.min(8, { message: "password must be at least 8 characters" }),
}) satisfies z.ZodType<SignupDto>;

const signinRequestSchema = z
	.object({
		email: z.string({ required_error: "email is required" }).email("this is not email"),
		password: z.string({ required_error: "password is required" }),
	})
	.strict() satisfies z.ZodType<SigninDto>;

export const signupValidator = async (dto: SignupDto) => {
	const result = await zodValidatior<SignupDto>(dto, signupRequestSchema);

	return result;
};

export const signinValidator = async (dto: SigninDto) => {
	const result = await zodValidatior<SigninDto>(dto, signinRequestSchema);

	return result;
};
