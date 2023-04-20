export type CreateTodoDto = {
	title: string;
	desc?: string;
};

export type UpdateTodoDto = {
	id: number;
	title: string;
	desc?: string;
};
