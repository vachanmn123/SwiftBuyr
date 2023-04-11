import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide a name for this tag."],
		maxlength: [60, "Name cannot be more than 60 characters"],
	},
	description: {
		type: String,
		required: [true, "Please provide a description for this tag."],
	},
});

export default mongoose.models.Tag || mongoose.model("Tag", TagSchema);
