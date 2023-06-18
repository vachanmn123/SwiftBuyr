import Cart, { CartItemModel } from "../../models/Cart";
import Item from "../../models/Item";

export default async function handler(req, res) {
	try {
		const cart = await Cart.findById(req.query.cartId).populate(
			"items.item"
		);
		let total = 0;
		for (let i = 0; i < cart.items.length; i++) {
			const it = await CartItemModel.findById(cart.items[i]._id).populate(
				"item"
			);
			total += it.item.price * it.quantity;
		}
		res.status(200).json({ success: true, data: total });
	} catch (err) {
		console.log(err);
		res.status(400).json({ success: false, data: err });
	}
}
