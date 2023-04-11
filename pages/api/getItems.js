import ItemSchema from "../../models/Item";
import Tag from "../../models/Tag";

export default async function handler(req, res) {
	const items = await ItemSchema.find();
	res.status(200).json(items);
}
