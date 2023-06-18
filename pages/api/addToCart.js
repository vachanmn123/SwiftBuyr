import Cart from "../../models/Cart";
import Item from "../../models/Item";
import { CartItemModel } from "../../models/Cart";
import Cookies from "js-cookie";

export default async function handler(req, res) {
	try {
		const cart = await Cart.findById(req.query.cartId).populate(
			"items.item"
		);
		let item;
		for (let i = 0; i < cart.items.length; i++) {
			const it = await CartItemModel.findById(cart.items[i]._id).populate(
				"item"
			);
			if (it.item._id == req.body.itemId) {
				item = cart.items[i];
				break;
			}
		}
		if (item) {
			item = await CartItemModel.findById(item._id);
			item.quantity += 1;
			await item.save();
		} else {
			const cartItem = await CartItemModel.create({
				item: req.body.itemId,
				quantity: 1,
			});
			cart.items.push(cartItem._id);
		}
		await cart.save();
		res.status(200).json({ success: true, data: cart });
	} catch (err) {
		console.log(err);
		res.status(400).json({ success: false, data: err });
	}
}
