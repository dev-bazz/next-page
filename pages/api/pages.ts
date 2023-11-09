import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

interface reqData {
	message: string;
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<reqData>,
) {
	if (req.method === "POST") {
		const currentDirectory = path.join(
			process.cwd(),
			"data",
			"array.json",
		);
		const fileData = fs.readdirSync(currentDirectory, "utf-8");
		const jsonData = JSON.parse(fileData[0]);
		jsonData.data.push(req.body);
		fs.writeFileSync(
			currentDirectory,
			JSON.stringify(jsonData),
		);
		console.log(req.body);

		res.status(200).json({ message: "success" });
	}
	if (req.method === "GET") {
		res.status(200).json({ message: "hello" });
	} else {
		res
			.status(200)
			.json({ message: "Carlee is a brillant girl" });
	}
}
