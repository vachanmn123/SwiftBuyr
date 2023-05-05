import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide a name"],
	},
	email: {
		type: String,
		required: [true, "Please provide an email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
	}, // Hashed password 14 rounds of salting.
	// Add cart and others here
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
