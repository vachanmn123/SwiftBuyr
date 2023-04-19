import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ItemCaraseoul from "../../components/ItemCaraseoul";
import ItemSchema from "../../models/Item";

export default function ItemListing({ item }) {
	return (
		<div className="m-3">
			<ItemCaraseoul item={item} />
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
