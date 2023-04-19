import dbConnect from "../../lib/dbConnect";
import ItemSchema from "../../models/Item";

export default async function handler(req, res) {
	dbConnect();
	const { id } = req.query;
	const item = await ItemSchema.findById(id).populate("tags");
	return res.status(200).json(item);
}
