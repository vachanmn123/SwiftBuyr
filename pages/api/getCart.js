import Cart from "../../models/Cart";

export default async function handler(req, res) {
	const cart = await Cart.findById(req.query.cartId).populate("items");
	res.status(200).json({ success: true, data: cart });
}
