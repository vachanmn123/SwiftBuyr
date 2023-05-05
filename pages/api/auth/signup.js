import dbConnect from "../../../lib/dbConnect";
import { hashPassword } from "../../../lib/auth";
import User from "../../../models/User";

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
	const { method } = req;
	if (method !== "POST") {
		return res.status(400).json({ success: false });
	}

	const { email, password, name } = JSON.parse(req.body);
	if (!email || !password || !name) {
		return res
			.status(400)
			.json({ success: false, message: "Missing fields" });
	}
	if (password.length < 8) {
		// TODO: add more password requirements
		return res.status(400).json({
			success: false,
			message: "Password must be at least 8 characters long",
		});
	}
	await dbConnect();
	try {
		const user = new User({
			email: email,
			password: hashPassword(password),
			name: name,
		});
		await user.save();
		return res.status(200).json({ success: true, data: user });
	} catch (error) {
		if (error.code === 11000) {
			return res
				.status(400)
				.json({ success: false, message: "User already exists" });
		}
		return res.status(400).json({ success: false, message: error.message });
	}
}
