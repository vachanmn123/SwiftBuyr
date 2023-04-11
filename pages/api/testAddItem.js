import dbConnect from "../../lib/dbConnect";
import ItemSchema from "../../models/Item";
import TagSchema from "../../models/Tag";

export default async function handler(req, res) {
	await dbConnect();
	let tag1 = await TagSchema.create({
		name: "Test Tag 1",
		description: "This is a test tag.",
	});
	let tag2 = await TagSchema.create({
		name: "Test Tag 2",
		description: "This is a test tag.",
	});
	// tag1.save();
	let item = await ItemSchema.create({
		name: "Test Item",
		description: "This is a test item.",
		price: 100,
		imageUrls: ["https://i.imgur.com/aBa1u0r.jpeg"],
		additionalFields: [
			{
				name: "Test Field",
				value: "This is a test field.",
			},
		],
		tags: [tag1, tag2],
	});
	// item.save();
	return res.status(200).json(item);
}
