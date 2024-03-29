export const exclude = <T, K extends keyof T>(object: T, keys: K[]): Omit<T, K> => {
	for (let key of keys) {
		delete object[key];
	}

	return object;
};
