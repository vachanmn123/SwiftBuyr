import { useEffect, useState } from "react";
import Link from "next/link";

export default function Catalogue({ items }) {
	return (
		<div className="items-justify m-3">
			{items.map((item, index) => (
				<Link href={`/item/${item._id}`}>
					<div className="card lg:w-96 md:w-full bg-base-100 shadow-xl inline-block m-3 transition ease-in-out delay-150 hover:scale-110 hover:bg-indigo-500 duration-300">
						<figure>
							<img
								src={item.imageUrls[0]}
								alt="Product Image"
								className="h-48 w-full object-cover"
							/>
						</figure>
						<div className="card-body">
							<h2 className="card-title">
								{item.name}
								{/* <div className="badge badge-secondary">NEW</div> */}
							</h2>
							<p>{item.description.slice(0, 100)}</p>
							<div className="card-actions justify-end">
								{item.tags.map((tag, index) => (
									<div className="badge badge-outline">
										{tag.name}
									</div>
								))}
							</div>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}
