import express from "express";

const app = express();
const Port = 3000;

export const bootstrap = () => {
	try {
		app.listen(Port, () => {
			console.log(`server running at Port:${Port}`);
		});
	} catch (e) {
		console.log(e);
	}
};
