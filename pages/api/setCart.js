import Cart from "../../models/Cart";

export default async (req, res) => {
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

	const newCart = JSON.parse(req.body);
	cart.items = newCart.items;
	cart.lastUpdated = Date.now();
	cart.save();
	const updatedCart = await Cart.findById(cartId).populate("items");
	res.status(200).json({ data: updatedCart });
};
