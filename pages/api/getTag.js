import Tag from "../../models/Tag";

export default async function handler(req, res) {
	const tagID = req.query.id;
	const tagInfo = await Tag.findById(tagID);
	res.status(200).json(tagInfo);
}
