import mongoose from "mongoose";
import Tag from "./Tag";

class AdditionalField {
	/**
	 *
	 * @param {String} name name of the field
	 * @param {String} value value of the field
	 */
	constructor(name, value) {
		this.name = name;
		this.value = value;
	}
}

const ItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide a name for this item."],
		maxlength: [60, "Name cannot be more than 60 characters"],
	},
	description: {
		type: String,
		required: [true, "Please provide a description for this item."],
		maxlength: [60, "Description cannot be more than 60 characters"],
	},
	price: {
		// Assume currency is USD
		type: Number,
		required: [true, "Please provide a price for this item."],
		maxlength: [60, "Price cannot be more than 60 characters"],
	},
	imageUrls: {
		type: Array(String),
		required: [true, "Please provide an image url for this item."],
	},
	additionalFields: {
		type: Array({
			name: String,
			value: String,
		}),
		required: [false],
	},
	tags: [{ type: mongoose.Schema.Types.ObjectId, ref: Tag }],
});

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);
