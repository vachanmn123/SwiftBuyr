import { useEffect, useState } from "react";

export default function Catalogue() {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch("/api/getItems").then((r) => {
			r.json().then((response) => {
				console.log(response);
				setItems(response);
				setIsLoading(false);
			});
		});
	}, []);

	useEffect(() => {
		items.map((item) => {
			item.tags.map((tag) => {
				tagInfo(tag);
			});
		});
	}, [items]);

	async function tagInfo(id) {
		let tag = await fetch(`/api/getTag?id=${id}`);
		let retTag = await tag.json();
		document.getElementById(`tag=${id}`).innerHTML = retTag.name;
		console.log(retTag.name);
	}

	if (isLoading) return <div>Loading</div>;
	return (
		<div className="items-justify">
			{items.map((item) => (
				<div className="card lg:w-96 md:w-full bg-base-100 shadow-xl inline-block m-2">
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
							{item.tags.map((tag) => (
								<div
									className="badge badge-outline"
									id={`tag=${tag}`}
								></div>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
