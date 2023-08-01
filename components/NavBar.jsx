import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function NavBar() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [loggedIn, setLoggedIn] = useState(status === "authenticated");
	const [cart, setCart] = useState(null);
	const [cartTotal, setCartTotal] = useState(0);
	const [cartNumItems, setCartNumItems] = useState(0);

	const fetchItemInfo = async (itemID) => {
		const res = await fetch(`/api/getItem?id=${itemID}`);
		if (!res.ok) {
			console.log("Error fetching item");
			return;
		}
		const resJson = await res.json();
		return resJson.data;
	};

	const updateCart = async () => {
		const res = await fetch(`/api/getCart?cartId=${cart._id}`);
		if (!res.ok) {
			console.log("Error fetching cart");
			return;
		}
		const resJson = await res.json();
		for (let i = 0; i < resJson.data.items.length; i++) {
			resJson.data.items[i].item = await fetchItemInfo(
				resJson.data.items[i].item
			);
		}
		setCart(resJson.data);
	};

	useEffect(() => {
		setLoggedIn(status === "authenticated");
	}, [status]);

	useEffect(() => {
		(async () => {
			const cartID = Cookies.get("cart");
			if (cartID) {
				const res = await fetch(`/api/getCart?cartId=${cartID}`);
				if (!res.ok) {
					console.log("Error fetching cart");
					return;
				}
				let resJson = await res.json();
				for (let i = 0; i < resJson.data.items.length; i++) {
					resJson.data.items[i].item = await fetchItemInfo(
						resJson.data.items[i].item
					);
				}
				setCart(resJson.data);
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const res = await (
					await fetch(`/api/getCartTotal?cartId=${cart._id}`)
				).json();
				setCartTotal(res.data);
				let sum = 0;
				for (let i = 0; i < cart.items.length; i++) {
					sum += cart.items[i].quantity;
				}
				setCartNumItems(sum);
			} catch (err) {
				console.log(err);
			}
		})();
	}, [cart]);

	/**
	 *
	 * @param {MouseEvent} event
	 */
	const handleSignout = async (event) => {
		event.preventDefault();
		let res = await signOut({
			redirect: false,
		});
	};

	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<Link className="btn btn-ghost normal-case text-xl" href="/">
					SwiftBuyr
				</Link>
			</div>
			<div className="flex-none">
				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="btn btn-ghost btn-circle">
						<div className="indicator">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
							<span className="badge badge-sm indicator-item">
								{cartNumItems}
							</span>
						</div>
					</label>
					<div
						tabIndex={0}
						className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
					>
						<div className="card-body">
							<span className="font-bold text-lg">
								{cartNumItems} Items
							</span>
							{cart?.items?.map((item, index) => (
								<div
									className="flex justify-between"
									key={index}
								>
									<span className="text-info">
										{item.item.name}
									</span>
									<span className="text-info">
										{item.quantity}x
									</span>
									<span className="text-info">
										${item.item.price}
									</span>
								</div>
							))}
							<span className="text-info">
								Subtotal: ${cartTotal}{" "}
								{/* TODO: Replace with actual content */}
							</span>
							<div className="card-actions">
								<Link href="/cart">
									<button className="btn btn-primary btn-block">
										View cart
									</button>
								</Link>
								<button
									hidden={true}
									style={{ display: "none" }}
									className="btn btn-ghost"
									id="cartUpdate"
									onClick={updateCart}
								></button>
							</div>
						</div>
					</div>
				</div>
				{loggedIn ? (
					<div className="dropdown dropdown-end">
						<label
							tabIndex={0}
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="w-10 rounded-full">
								<img src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg" />
							</div>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<Link
									className="justify-between"
									href="/profile"
								>
									<strong className="font-bold">
										{session?.user?.name}
									</strong>
								</Link>
							</li>
							<li>
								<Link href="/settings">Settings</Link>
							</li>
							<li>
								<a onClick={handleSignout}>Logout</a>
							</li>
						</ul>
					</div>
				) : (
					<Link href={`/auth/login?next=${router.asPath}`}>
						<button className="btn ml-2 mr-2">Login</button>
					</Link>
				)}
			</div>
		</div>
	);
}
