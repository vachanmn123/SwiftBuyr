import { Schema } from "mongoose";
import mongoose from "mongoose";
import Item from "./Item";

const CartItem = new Schema({
	item: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Item",
	},
	quantity: {
		type: Number,
		default: 1,
	},
});

const CartSchema = new Schema({
	items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "CartItem",
		},
	],
	lastUpdated: {
		type: Date,
		default: Date.now,
	},
	registeredCart: {
		type: Boolean,
		default: false,
	},
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export const CartItemModel =
	mongoose.models.CartItem || mongoose.model("CartItem", CartItem);
