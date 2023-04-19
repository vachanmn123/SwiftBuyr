import Catalogue from "../components/Catalogue";
import dbConnect from "../lib/dbConnect";
import ItemSchema from "../models/Item";
import mongoose from "mongoose";

export default function Index({ items }) {
	return (
		<div>
			<Catalogue items={items} />
		</div>
	);
}

export async function getServerSideProps() {
	await dbConnect();
	const items = await ItemSchema.find().populate("tags");
	let retItems = JSON.parse(JSON.stringify(items));
	return {
		props: { items: retItems },
	};
}
