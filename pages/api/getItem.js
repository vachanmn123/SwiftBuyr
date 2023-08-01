import Item from "../../models/Item";

export default async function handler(req, res) {
	const item = await Item.findById(req.query.id).populate("tags");
	res.status(200).json({ success: true, data: item });
}
