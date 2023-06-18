import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ItemCaraseoul from "../../components/ItemCaraseoul";
import ItemSchema from "../../models/Item";
import Link from "next/link";
import Cookies from "js-cookie";

export default function ItemListing({ item }) {
	const handleCartAdd = async () => {
		const cart = Cookies.get("cart");
		const res = await fetch(`/api/addToCart?cartId=${cart}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ itemId: item._id }),
		});
	};

	return (
		<div className="m-3 lg:grid lg:grid-cols-2">
			<div className="">
				<ItemCaraseoul item={item} />
			</div>
			<div className="">
				<h1 className="text-3xl font-bold">{item.name}</h1>
				<div>
					{item.tags.map((tag, index) => (
						<Link href={`/tag/${tag._id}`}>
							<div className="badge badge-outline m-1">
								{tag.name}
							</div>
						</Link>
					))}
				</div>
				<small className="text-gray-500">{item.description}</small>
				<div>
					<span className="text-1xl font-semibold">Price: {"	"}</span>
					<span className="text-2xl font-bold mt-3">
						$ {item.price}
					</span>
				</div>
				<div className="mt-3">
					<button className="btn btn-primary mr-3">Buy Now</button>
					<button className="btn btn-outline" onClick={handleCartAdd}>
						Add to Cart
					</button>
				</div>
			</div>
			<div className="mt-3">
				<h1 className="text-2xl font-bold">
					Additional Specifications
				</h1>
				<div className="mt-3">
					<table className="table table-zebra w-full">
						<thead>
							<tr>
								<th>Property</th>
								<th>Value</th>
							</tr>
						</thead>
						<tbody>
							{item.additionalFields.map((field, index) => (
								<tr>
									<td>{field.name}</td>
									<td>{field.value}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const { id } = context.query;
	const item = await ItemSchema.findById(id).populate("tags");
	const retItem = JSON.parse(JSON.stringify(item));
	return {
		props: {
			item: retItem,
		},
	};
}
