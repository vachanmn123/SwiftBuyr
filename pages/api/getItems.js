import ItemSchema from "../../models/Item";
import dbConnect from "../../lib/dbConnect";
import Tag from "../../models/Tag";

export default async function handler(req, res) {
	await dbConnect();
	const items = await ItemSchema.find().populate("tags");
	res.status(200).json(items);
}
