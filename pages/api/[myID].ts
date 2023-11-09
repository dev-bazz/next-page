import { NextApiRequest, NextApiResponse } from "next";

const handler = (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	const id = req.query.myID;

	res.status(200).json({
		myID: id,
		message: "this is a test api for my app development",
	});
};

export default handler;
