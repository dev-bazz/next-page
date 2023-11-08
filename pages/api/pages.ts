import { NextApiRequest, NextApiResponse } from "next";

interface reqData {
	message: string;
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<reqData>,
) {
	if (req.method === "POST") {
		console.log(req.body);
		res.status(200).json(req.body);
	}
	if (req.method === "GET") {
		res.status(200).json({ message: "hello" });
	} else {
		res
			.status(200)
			.json({ message: "Carlee is a brillant girl" });
	}
}
