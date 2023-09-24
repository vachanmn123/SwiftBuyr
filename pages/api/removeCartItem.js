import Cart, { CartItemModel } from "../../models/Cart";

export default async (req, res) => {
	if (req.method !== "POST") {
		res.status(400).json({ error: "Invalid method" });
		return;
	}

	const { cartId } = req.query;
	if (!cartId) {
		res.status(400).json({ error: "Missing cartId" });
		return;
	}

	const cart = await Cart.findById(cartId);
	if (!cart) {
		res.status(400).json({ error: "Invalid cartId" });
		return;
	}

	const body = JSON.parse(req.body);

	const { itemToRemove, quantityToRemove } = body;
	if (!itemToRemove) {
		res.status(400).json({ error: "Missing itemId" });
		return;
	}
	if (!quantityToRemove) {
		res.status(400).json({ error: "Missing quantity" });
		return;
	}

	const itemIndex = cart.items.findIndex((item) => item == itemToRemove);
	if (itemIndex === -1) {
		res.status(400).json({ error: "Item not in cart" });
		return;
	}

	const item = await CartItemModel.findById(cart.items[itemIndex]);
	if (item.quantity < quantityToRemove) {
		res.status(400).json({ error: "Invalid quantity" });
		return;
	}

	if (item.quantity === quantityToRemove) {
		CartItemModel.findByIdAndDelete(item._id);
		cart.items.splice(itemIndex, 1);
	} else {
		item.quantity -= quantityToRemove;
		item.save();
	}

	cart.lastUpdated = Date.now();
	cart.save();
	const updatedCart = await Cart.findById(cartId).populate("items");
	res.status(200).json({ data: updatedCart });
};
