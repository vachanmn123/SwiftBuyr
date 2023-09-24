import { useState } from "react";
import Cookies from "js-cookie";

export default function Cart() {
	const [cart, setCart] = useState({});
	const [cartTotal, setCartTotal] = useState(0);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	const clearCart = () => {
		// TODO: Fix this.
		cart.items.forEach((item) => {
			removeFromCart(item._id, item.quantity);
		});
	};

	const removeFromCart = async (itemID, quantity) => {
		setLoading(true);
		const resJson = await (
			await fetch(`/api/removeCartItem?cartId=${cart._id}`, {
				method: "POST",
				body: JSON.stringify({
					itemToRemove: itemID,
					quantityToRemove: quantity,
				}),
			})
		).json();
		if (!resJson.status === 200) {
			console.log(resJson);
			return;
		}
		for (let i = 0; i < resJson?.data?.items?.length; i++) {
			resJson.data.items[i].item = await fetchItemInfo(
				resJson.data.items[i].item
			);
		}
		setCart(resJson.data);
		const res1 = await (
			await fetch(`/api/getCartTotal?cartId=${cart._id}`)
		).json();
		setCartTotal(res1.data);
		setLoading(false);
	};

	const fetchItemInfo = async (itemID) => {
		const res = await fetch(`/api/getItem?id=${itemID}`);
		if (!res.ok) {
			console.log("Error fetching item");
			return;
		}
		const resJson = await res.json();
		return resJson.data;
	};

	useState(() => {
		(async () => {
			const cart = Cookies.get("cart");
			const res = await fetch(`/api/getCart?cartId=${cart}`);
			if (res.status !== 200) {
				return;
			}
			let resJson = await res.json();
			for (let i = 0; i < resJson.data.items.length; i++) {
				resJson.data.items[i].item = await fetchItemInfo(
					resJson.data.items[i].item
				);
			}
			setCart(resJson.data);
			const res1 = await (
				await fetch(`/api/getCartTotal?cartId=${cart}`)
			).json();
			setCartTotal(res1.data);
			setLoading(false);
		})();
	}, []);

	if (error !== "") return <div>{error}</div>;
	if (loading) return <div>Loading...</div>;
	return (
		<div className="m-3">
			<h1 className="text-3xl font-bold m-3">Cart</h1>
			<table className="table table-zebra w-full">
				<thead>
					<tr>
						<th>Item</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total Price</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{cart?.items?.map((item) => (
						<tr key={item.item._id}>
							<td>{item.item.name}</td>
							<td>{item.item.price}</td>
							<td>{item.quantity}</td>
							<td>{item.item.price * item.quantity}</td>
							<td>
								<button
									className="btn btn-outline mr-2"
									onClick={() => removeFromCart(item._id, 1)}
								>
									Remove 1
								</button>
								<button
									className="btn btn-outline ml-2"
									onClick={() =>
										removeFromCart(item._id, item.quantity)
									}
								>
									Remove All
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="mt-3">
				<h1 className="text-2xl font-bold">
					Total Price: $ {cartTotal}
				</h1>
			</div>
			<div className="mt-3">
				<button className="btn btn-primary mr-3">Buy Now</button>
				<button className="btn btn-outline" onClick={clearCart}>
					Clear Cart
				</button>
			</div>
		</div>
	);
}
