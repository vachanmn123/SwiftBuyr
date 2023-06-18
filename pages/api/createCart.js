import Cart from "../../models/Cart";

export default async function handler(req, res) {
	const cart = await Cart.create({ items: [] });
	res.status(200).json({ success: true, data: cart._id });
}
