import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
	await dbConnect();
	let u = new User({
		name: "John Doe",
		email: "john@doe.com",
		password: await bcrypt.hash("password", 14),
	});
	await u.save();
	return res.status(200).json({ success: true });
}
