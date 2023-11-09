// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Data = {
	name: string;
	data: any;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	const currentDirectory = path.join(
		process.cwd(),
		"data",
		"data.json",
	);
	const getData = fs.readFileSync(currentDirectory, "utf-8");
	res.status(200).json({
		name: "Clement Bazuaye",
		data: JSON.parse(getData),
	});
}
